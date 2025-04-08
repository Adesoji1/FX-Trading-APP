import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

describe('WalletController', () => {
  let walletController: WalletController;
  let walletService: WalletService;

  const mockWalletService = {
    getWallet: jest.fn(),
    fundWallet: jest.fn(),
    convertCurrency: jest.fn(),
    tradeCurrency: jest.fn(),
    getUserTransactions: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        { provide: WalletService, useValue: mockWalletService },
      ],
    }).compile();

    walletController = module.get<WalletController>(WalletController);
    walletService = module.get<WalletService>(WalletService);
  });

  describe('getWallet', () => {
    it('should return wallet for given userId', async () => {
      const userId = 1;
      const walletResponse = { userId, balances: {} };
      mockWalletService.getWallet.mockResolvedValue(walletResponse);

      const result = await walletController.getWallet({ userId });
      expect(mockWalletService.getWallet).toHaveBeenCalledWith(userId);
      expect(result).toEqual(walletResponse);
    });
  });

  describe('fundWallet', () => {
    it('should call fundWallet on walletService', async () => {
      const dto = { userId: 1, currency: 'NGN', amount: 1000 };
      const walletResponse = { userId: 1, balances: { NGN: 1000 } };
      mockWalletService.fundWallet.mockResolvedValue(walletResponse);

      const result = await walletController.fundWallet(dto);
      expect(mockWalletService.fundWallet).toHaveBeenCalledWith(dto.userId, dto.currency, dto.amount);
      expect(result).toEqual(walletResponse);
    });
  });

  describe('convert', () => {
    it('should call convertCurrency on walletService', async () => {
      const dto = { userId: 1, fromCurrency: 'NGN', toCurrency: 'USD', amount: 500 };
      const walletResponse = { userId: 1, balances: { NGN: 500, USD: 1.25 } };
      mockWalletService.convertCurrency.mockResolvedValue(walletResponse);

      const result = await walletController.convert(dto);
      expect(mockWalletService.convertCurrency).toHaveBeenCalledWith(
        dto.userId,
        dto.fromCurrency,
        dto.toCurrency,
        dto.amount,
      );
      expect(result).toEqual(walletResponse);
    });
  });

  describe('getTransactions', () => {
    it('should call getUserTransactions on walletService', async () => {
      const userId = 1;
      const mockTxs = [
        { id: 1, userId, type: 'fund', currency: 'NGN', amount: 1000, status: 'success' },
        { id: 2, userId, type: 'convert', currency: 'NGN', amount: 5000, status: 'success' },
      ];
      mockWalletService.getUserTransactions = jest.fn().mockResolvedValue(mockTxs);
  
      const result = await walletController.getTransactions({ userId });
      expect(mockWalletService.getUserTransactions).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockTxs);
    });
  });
  

  describe('trade', () => {
    it('should call tradeCurrency on walletService', async () => {
      const dto = { userId: 1, fromCurrency: 'NGN', toCurrency: 'EUR', amount: 1000 };
      const walletResponse = { userId: 1, balances: { NGN: 0, EUR: 2.5 } };
      mockWalletService.tradeCurrency.mockResolvedValue(walletResponse);

      const result = await walletController.trade(dto);
      expect(mockWalletService.tradeCurrency).toHaveBeenCalledWith(
        dto.userId,
        dto.fromCurrency,
        dto.toCurrency,
        dto.amount,
      );
      expect(result).toEqual(walletResponse);
    });
  });
});
