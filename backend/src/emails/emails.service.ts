import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailsService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendCertificateEmail(
    to: string,
    artistName: string,
    projectTitle: string,
    certificationLevel: string,
  ) {
    const htmlContent = this.generateCertificateHTML(
      artistName,
      projectTitle,
      certificationLevel,
    );

    return this.transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject: `🎵 LE SCRIPT - Certificat ${certificationLevel}`,
      html: htmlContent,
    });
  }

  async sendWelcomeEmail(to: string, userName: string) {
    return this.transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject: '🎵 Bienvenue sur LE SCRIPT!',
      html: `
        <h1>Bienvenue ${userName}!</h1>
        <p>Vous êtes maintenant membre de LE SCRIPT.</p>
        <p>Commencez à créer ou certifier des projets musicaux!</p>
      `,
    });
  }

  private generateCertificateHTML(
    artistName: string,
    projectTitle: string,
    certificationLevel: string,
  ): string {
    const icons = {
      Bronze: '🥉',
      Or: '🥇',
      Platine: '💿',
      Diamant: '💎',
    };

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background: #f0f0f0; }
            .certificate { 
              max-width: 600px; 
              margin: 50px auto; 
              background: white; 
              padding: 40px; 
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              text-align: center;
              border-top: 5px solid #00BCD4;
            }
            .title { color: #00BCD4; font-size: 28px; margin: 20px 0; }
            .icon { font-size: 60px; margin: 20px 0; }
            .details { margin: 30px 0; }
            .detail-item { margin: 10px 0; font-size: 16px; }
            .date { color: #999; margin-top: 30px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="certificate">
            <h1>LE SCRIPT</h1>
            <div class="icon">${icons[certificationLevel] || '🏆'}</div>
            <h2 class="title">Certificat ${certificationLevel}</h2>
            <div class="details">
              <div class="detail-item"><strong>Artiste:</strong> ${artistName}</div>
              <div class="detail-item"><strong>Projet:</strong> ${projectTitle}</div>
              <div class="detail-item"><strong>Certification:</strong> ${certificationLevel}</div>
            </div>
            <p>Félicitations! Votre projet a reçu la certification ${certificationLevel} sur LE SCRIPT.</p>
            <div class="date">Généré le ${new Date().toLocaleDateString('fr-FR')}</div>
          </div>
        </body>
      </html>
    `;
  }
}