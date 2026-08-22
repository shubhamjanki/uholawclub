import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  const result = await resend.emails.send({
    from: 'Appointments <noreply@uholawclub.in>',
    to: 'totally_random_test_12345@gmail.com',
    subject: 'Test Email',
    html: '<p>Test</p>'
  });
  console.log(JSON.stringify(result, null, 2));
}

test();
