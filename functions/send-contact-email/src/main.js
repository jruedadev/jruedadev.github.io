import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'me@jrueda.dev';

const sanitize = (str = '') =>
  String(str)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .slice(0, 2000);

const verifyRecaptcha = async (token) => {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
  });
  const data = await res.json();
  return data.success && data.score >= 0.5;
};

export default async ({ req, res, log, error }) => {

  // CORS headers — siempre primero
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.json({}, 200, headers);
  }

  // Solo POST
  if (req.method !== 'POST') {
    return res.json({ success: false, message: 'Method not allowed' }, 405, headers);
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, subject, message, recaptchaToken } = body;

    if (!name || !email || !message || !recaptchaToken) {
      return res.json({ success: false, message: 'Campos requeridos faltantes' }, 400, headers);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ success: false, message: 'Email inválido' }, 400, headers);
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return res.json({ success: false, message: 'Verificación reCAPTCHA fallida' }, 403, headers);
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeSubject = sanitize(subject || 'Nuevo mensaje de contacto');
    const safeMessage = sanitize(message);

    const { error: resendError } = await resend.emails.send({
      from: 'Portfolio Contact <no-reply@jrueda.dev>',
      to: CONTACT_EMAIL,
      replyTo: safeEmail,
      subject: `[Portfolio] ${safeSubject}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #534AB7;">{ nuevo mensaje }</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 100px;">Nombre</td>
              <td style="padding: 8px 0; font-weight: bold;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Asunto</td>
              <td style="padding: 8px 0;">${safeSubject}</td>
            </tr>
          </table>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px;">Enviado desde jrueda.dev/contact</p>
        </div>
      `,
    });

    if (resendError) {
      error('Resend error: ' + JSON.stringify(resendError));
      return res.json({ success: false, message: 'Error al enviar el email' }, 500, headers);
    }

    log(`Email enviado de ${safeEmail}`);
    return res.json({ success: true, message: 'Mensaje enviado correctamente' }, 200, headers);

  } catch (err) {
    error('Error: ' + err.message);
    return res.json({ success: false, message: 'Error interno del servidor' }, 500, headers);
  }
};