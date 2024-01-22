import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io', //sesuaikan konfigurasi 
        port: 2525,
        auth: {
          user: '025c51bc380433',  //sesuaikan user
          pass: '9b5bb7e5546bba', //sesuaikan password 
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),  // template akan di ambil dari handlebar yang ada pada folder templates
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export  mailService agar bisa digunakan di luar module mail
})
export class MailModule {}

