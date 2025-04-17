// libs/common/mailer.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class Mailer {
  async sendVerificationEmail(to: string, code: string) {
    // Replace this with real integration: Nodemailer, Twilio, etc.
    console.log(`Sending verification code ${code} to ${to}`);
  }

  async sendCINRequest(to: string) {
    console.log(`CIN validation request sent to ${to}`);
  }
}
