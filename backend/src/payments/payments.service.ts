import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createJokerPayment(amount: number = 200) {
    // 200 cents = 2 euros
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        payment_method_types: ['card'],
        metadata: {
          product: 'joker',
          points: '50',
        },
      });

      return paymentIntent;
    } catch (error) {
      throw new BadRequestException('Payment creation failed');
    }
  }

  async confirmPayment(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(
        paymentIntentId,
      );
      return paymentIntent.status === 'succeeded';
    } catch (error) {
      throw new BadRequestException('Payment confirmation failed');
    }
  }

  async handleWebhook(event: any) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('✅ Joker payment succeeded:', event.data.object);
        return { success: true };
      case 'payment_intent.payment_failed':
        console.log('❌ Joker payment failed:', event.data.object);
        return { success: false };
      default:
        return { received: true };
    }
  }
}