import { Injectable, HttpServer } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OtpService {
    private readonly apiUrl = process.env.BREVO_API_URL;
    private readonly apiKey = process.env.BREVO_API_KEY;
  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const data = {
      sender: { email: process.env.EMAIL_OF_COMPANY }, 
      to: [{ email: to }],
      subject: 'Your OTP Code',
      htmlContent: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
    };
    try {
      await axios.post(this.apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
      });
      console.log('OTP email sent successfully');
    } catch (error) {
      console.error('Error sending OTP email:', error.response ? error.response.data : error.message);
      throw new Error('Failed to send OTP email');
    }
  }
}
