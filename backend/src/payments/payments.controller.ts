import { Controller, Post, Body, UseGuards, RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('joker')
  @UseGuards(AuthGuard('jwt'))
  async createJokerPayment(@GetUser() user: any) {
    return this.paymentsService.createJokerPayment(200); // 2 euros
  }

  @Post('confirm')
  @UseGuards(AuthGuard('jwt'))
  async confirmPayment(
    @Body('paymentIntentId') paymentIntentId: string,
    @GetUser() user: any,
  ) {
    const isSucceeded = await this.paymentsService.confirmPayment(
      paymentIntentId,
    );
    return { success: isSucceeded };
  }

  @Post('webhook')
  async handleWebhook(@RawBodyRequest() req: Request) {
    const sig = req.headers['stripe-signature'];
    const body = req.rawBody;

    // Vérifier la signature Stripe
    // En production, implémenter la vérification correcte
    const event = JSON.parse(body.toString());
    return this.paymentsService.handleWebhook(event);
  }
}