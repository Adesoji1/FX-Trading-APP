
import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';

describe('GatewayController', () => {
  let controller: GatewayController;

  const authClientMock = { send: jest.fn() };
  const walletClientMock = { send: jest.fn() };
  const fxClientMock = { send: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [
        { provide: 'AUTH_SERVICE', useValue: authClientMock },
        { provide: 'WALLET_SERVICE', useValue: walletClientMock },
        { provide: 'FX_SERVICE', useValue: fxClientMock },
      ],
    }).compile();

    controller = module.get<GatewayController>(GatewayController);
  });

  it('should call authClient.send when register is called', async () => {
    const dto = { email: 'test@example.com', password: 'StrongPass123' };
    authClientMock.send.mockResolvedValue('Registration Success');
    
    const result = await controller.register(dto);
    
    expect(authClientMock.send).toHaveBeenCalledWith({ cmd: 'register' }, dto);
    expect(result).toBe('Registration Success');
  });

  it('should call walletClient.send when fundWallet is called', async () => {
    const dto = { userId: 1, currency: 'NGN', amount: 10000 };
    walletClientMock.send.mockResolvedValue('Wallet Funded');
    
    const result = await controller.fundWallet(dto);
    
    expect(walletClientMock.send).toHaveBeenCalledWith({ cmd: 'fund_wallet' }, dto);
    expect(result).toBe('Wallet Funded');
  });
});
