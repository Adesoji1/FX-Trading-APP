import { Test, TestingModule } from '@nestjs/testing';
import { FxController } from './fx.controller';
import { FxService } from './fx.service';

describe('FxController', () => {
  let fxController: FxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxController],
      providers: [
        {
          provide: FxService,
          useValue: {
            getRate: jest.fn().mockResolvedValue(1.23), // Stubbed method
          },
        },
      ],
    }).compile();

    fxController = module.get<FxController>(FxController);
  });

  it('should be defined', () => {
    expect(fxController).toBeDefined();
  });

  describe('getFxRates', () => {
    it('should return the correct rate', async () => {
      const result = await fxController.getFxRates({ from: 'USD', to: 'EUR' });
      expect(result).toBe(1.23);
    });
  });
});
