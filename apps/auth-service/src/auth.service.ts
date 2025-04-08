import { Injectable, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { MailerService } from '@nestjs-modules/mailer';

interface RegisterDto {
  email: string;
  password: string;
}

interface VerifyDto {
  email: string;
  otp: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}


  async register(dto: RegisterDto): Promise<{ message: string }> {
    const { email, password } = dto;
    this.logger.log(`⇢ Starting registration for ${email}`);

    
    const existing = await this.userRepository.findOne({ where: { email } });
    this.logger.debug(`Existing user lookup: ${existing ? 'FOUND' : 'NOT FOUND'}`);
    if (existing) {
      this.logger.warn(`Registration aborted – email already registered: ${email}`);
      throw new BadRequestException('Email already registered');
    }

  
    this.logger.debug('Hashing password');
    const hashedPassword = await bcrypt.hash(password, 10);
    this.logger.debug('Password hashed');
    this.logger.debug('Password hashed');

   
    this.logger.debug('Generating OTP');
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.logger.debug(`OTP generated: ${otp}`);
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    this.logger.debug(`OTP generated (${otp}) and hashed`);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      isVerified: false,
      otpHash,
      otpExpiry,
    });
    this.logger.debug('Saving user to DB');
    await this.userRepository.save(user);
    this.logger.debug('User saved');
    this.logger.log(`User saved to DB (id=${user.id})`);

   
    try {
      this.logger.debug('Sending OTP email…');
      await this.mailerService.sendMail({
        to: email,
        subject: 'Your Verification OTP',
        text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
      });
      this.logger.log(`OTP email sent to ${email}`);
    } catch (error) {
      this.logger.error('Failed to send OTP email', error as Error);
      throw new InternalServerErrorException('Failed to send OTP email');
    }

    this.logger.log(`⇠ Registration completed for ${email}`);
    return { message: 'Registration successful. Please verify your email.' };
  }


  async verify(dto: VerifyDto): Promise<{ message: string }> {
    const { email, otp } = dto;
    this.logger.log(`⇢ Starting verification for ${email}`);

   
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`Verification failed – user not found: ${email}`);
      throw new BadRequestException('User not found');
    }
    if (user.isVerified) {
      this.logger.warn(`Verification skipped – already verified: ${email}`);
      throw new BadRequestException('User already verified');
    }

    
    if (!user.otpExpiry || new Date() > user.otpExpiry) {
      this.logger.warn(`Verification failed – OTP expired for ${email}`);
      throw new BadRequestException('OTP has expired');
    }

   
    if (!user.otpHash) {
      this.logger.error(`OTP hash missing for user ${email}`);
      throw new InternalServerErrorException('OTP hash is missing');
    }
    const isMatch = await bcrypt.compare(otp, user.otpHash);
    this.logger.debug(`OTP comparison result: ${isMatch}`);
    if (!isMatch) {
      this.logger.warn(`Verification failed – invalid OTP for ${email}`);
      throw new BadRequestException('Invalid OTP');
    }

 
    user.isVerified = true;
    user.otpHash = null;
    user.otpExpiry = null;
    await this.userRepository.save(user);
    this.logger.log(`User verified successfully: ${email}`);

    this.logger.log(`⇠ Verification completed for ${email}`);
    return { message: 'Email verified successfully.' };
  }
}
