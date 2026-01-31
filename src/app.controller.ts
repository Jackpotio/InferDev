import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      server: 'backend',
      time: new Date().toISOString(),
    };
  }
}
