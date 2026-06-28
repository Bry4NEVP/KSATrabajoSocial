import nodemailer from "nodemailer";
import path from "node:path";

/**
 * Sends the generated contact report PDF to the configured recipient.
 * @param {object} submission - The contact form submission object.
 * @param {string} pdfPath    - Absolute path to the generated PDF file.
 */
export async function sendReportByEmail(submission, pdfPath) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const recipient = process.env.REPORT_RECIPIENT;

  if (!user || !pass || !recipient) {
    console.warn("[email] Variables de entorno no configuradas. El correo no fue enviado.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    auth: { user, pass },
    tls: {
      // Permite conexion aunque haya un proxy/firewall con certificado propio
      rejectUnauthorized: false,
    },
  });

  const priorityLabel =
    submission.analysis.priority === "alta" ? "ALTA PRIORIDAD" : "Normal";

  const filename = path.basename(pdfPath);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1d16;">
      <div style="background: #575f4a; padding: 28px 32px; border-radius: 16px 16px 0 0;">
        <h1 style="margin: 0; color: #ffffff; font-size: 22px;">Nueva solicitud recibida</h1>
        <p style="margin: 6px 0 0; color: #c6c7bd; font-size: 14px;">KSA Trabajo Social &middot; Analisis automatico</p>
      </div>
      <div style="background: #f9faf0; padding: 28px 32px; border: 1px solid #e4e2dd; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e4e2dd; color: #464840; font-size: 12px; font-weight: bold; text-transform: uppercase; width: 160px;">ID</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e4e2dd; font-size: 14px;">${submission.id}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e4e2dd; color: #464840; font-size: 12px; font-weight: bold; text-transform: uppercase;">Nombre</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e4e2dd; font-size: 14px;">${submission.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e4e2dd; color: #464840; font-size: 12px; font-weight: bold; text-transform: uppercase;">Correo</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e4e2dd; font-size: 14px;">${submission.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e4e2dd; color: #464840; font-size: 12px; font-weight: bold; text-transform: uppercase;">Tipo de consulta</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e4e2dd; font-size: 14px;">${submission.analysis.selectedService}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e4e2dd; color: #464840; font-size: 12px; font-weight: bold; text-transform: uppercase;">Servicio sugerido</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e4e2dd; font-size: 14px;">${submission.analysis.recommendedService}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #464840; font-size: 12px; font-weight: bold; text-transform: uppercase;">Prioridad</td>
            <td style="padding: 10px 0; font-size: 14px; font-weight: bold;">${priorityLabel}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; background: #ffffff; border: 1px solid #e4e2dd; border-radius: 10px; padding: 16px 20px;">
          <p style="margin: 0 0 6px; color: #464840; font-size: 12px; font-weight: bold; text-transform: uppercase;">Mensaje</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1a1d16;">${submission.message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 13px; color: #848c75;">
          El reporte detallado en PDF se adjunta a este correo como <strong>${filename}</strong>.
        </p>
      </div>
      <div style="background: #848c75; padding: 16px 32px; border-radius: 0 0 16px 16px; text-align: center;">
        <p style="margin: 0; color: #f0f2e7; font-size: 12px;">KSA Trabajo Social &middot; Notificacion automatica</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"KSA Trabajo Social" <${user}>`,
    to: recipient,
    subject: `[KSA] Nueva solicitud de ${submission.name} - ${priorityLabel}`,
    html,
    attachments: [
      {
        filename,
        path: pdfPath,
        contentType: "application/pdf",
      },
    ],
  });

  console.log(`[email] Reporte enviado a ${recipient} - ID: ${submission.id}`);
}
