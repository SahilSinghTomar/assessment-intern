import { resend } from '@/lib/resend';
import ThankyouEmail from '../../emails/ThankyouEmail';

export async function sendThankyouEmail({ email, username }) {
  try {
    // I am only able to send mail to my email
    /*
     Mail response: {
     data: null,
     error: {
      statusCode: 403,
       message: 'You can only send testing emails to your own email address (sahilsinghtomar14435@gmail.com).',
       name: 'validation_error'
      }
   }
  */

    const mailResponse = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // I don't have a custom domain
      to: 'sahilsinghtomar14435@gmail.com', // I am only able to send mail to this email
      subject: 'Thank you for registering...',
      react: <ThankyouEmail username={username} />,
    });

    console.log('Mail response:', mailResponse);

    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
}
