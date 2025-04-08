import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FxService } from './fx.service';

@Controller()
export class FxController {
  private readonly logger = new Logger(FxController.name);

  constructor(private readonly fxService: FxService) {}

  @MessagePattern({ cmd: 'get_fx_rates' })
  async getFxRates(@Payload() payload: any) {
    this.logger.log(`get_fx_rates ⟶ ${JSON.stringify(payload)}`);
    const { from, to } = payload;
    return this.fxService.getRate(from, to);
  }
}
