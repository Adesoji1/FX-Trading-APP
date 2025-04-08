import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthServiceController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn().mockResolvedValue('Registration Success'),
            verify: jest.fn().mockResolvedValue('Verification Success'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should return "Registration Success" when register is called', async () => {
      const dto = { email: 'test@example.com', password: 'Secret123' };
      const result = await controller.register(dto);
      expect(service.register).toHaveBeenCalledWith(dto);
      expect(result).toBe('Registration Success');
    });
  });

  describe('verify', () => {
    it('should return "Verification Success" when verify is called', async () => {
      const dto = { email: 'test@example.com', otp: '123456' };
      const result = await controller.verify(dto);
      expect(service.verify).toHaveBeenCalledWith(dto);
      expect(result).toBe('Verification Success');
    });
  });
});
