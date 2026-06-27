import PDFDocument from 'pdfkit';
import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const brand = {
  primary: '#575f4a',
  secondary: '#848c75',
  terracotta: '#D89B5C',
  background: '#f9faf0',
  surface: '#ffffff',
  text: '#1a1d16',
  muted: '#464840',
  line: '#c6c7bd',
  danger: '#ba1a1a',
};

const inquiryAdvice = {
  'Orientacion familiar': 'Explorar dinamicas familiares, necesidades inmediatas y redes de apoyo disponibles.',
  'Apoyo psicosocial': 'Identificar factores emocionales, contexto social y nivel de acompanamiento requerido.',
  'Desarrollo comunitario': 'Revisar actores clave, alcance territorial y objetivos de participacion comunitaria.',
  Capacitacion: 'Precisar publico objetivo, contenidos esperados y formato de la formacion.',
  'Consulta profesional': 'Solicitar contexto institucional, alcance tecnico y documentos relacionados si aplica.',
  Otro: 'Ampliar informacion para clasificar la necesidad y definir el primer paso de orientacion.',
};

function ensureText(value, fallback = 'No registrado') {
  const text = String(value || '').trim();
  return text || fallback;
}

function formatDate(isoDate) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Bogota',
  }).format(new Date(isoDate));
}

function drawRoundedRect(doc, x, y, width, height, color, radius = 16) {
  doc.save().roundedRect(x, y, width, height, radius).fill(color).restore();
}

function drawSectionTitle(doc, title, x, y) {
  doc
    .fillColor(brand.primary)
    .font('Helvetica-Bold')
    .fontSize(13)
    .text(title.toUpperCase(), x, y, { characterSpacing: 0.3 });

  doc
    .moveTo(x, y + 22)
    .lineTo(x + 460, y + 22)
    .strokeColor(brand.line)
    .lineWidth(1)
    .stroke();
}

function drawLabelValue(doc, label, value, x, y, width) {
  doc
    .fillColor(brand.muted)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text(label.toUpperCase(), x, y);

  doc
    .fillColor(brand.text)
    .font('Helvetica')
    .fontSize(11)
    .text(ensureText(value), x, y + 13, { width, lineGap: 2 });
}

function drawPill(doc, text, x, y, color) {
  const label = ensureText(text);
  const width = doc.widthOfString(label) + 22;
  drawRoundedRect(doc, x, y, width, 24, color, 12);
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(9).text(label, x + 11, y + 7);
  return width;
}

function drawKeywordList(doc, keywords, x, y) {
  if (!keywords.length) {
    doc.fillColor(brand.muted).font('Helvetica').fontSize(10).text('No se detectaron palabras clave especificas.', x, y);
    return y + 18;
  }

  let currentX = x;
  let currentY = y;
  keywords.forEach((keyword) => {
    const width = Math.min(Math.max(doc.widthOfString(keyword) + 32, 86), 160);
    if (currentX + width > 540) {
      currentX = x;
      currentY += 32;
    }
    drawRoundedRect(doc, currentX, currentY, width, 24, '#e4e2dd', 12);
    doc.fillColor(brand.primary).font('Helvetica-Bold').fontSize(8.5).text(keyword, currentX + 10, currentY + 7, {
      width: width - 20,
      align: 'center',
      ellipsis: true,
      lineBreak: false,
    });
    currentX += width + 8;
  });

  return currentY + 34;
}

export async function generateContactReport(submission, { reportsDir, logoPath }) {
  await mkdir(reportsDir, { recursive: true });

  const filename = `reporte-${submission.id}.pdf`;
  const filePath = path.join(reportsDir, filename);

  const doc = new PDFDocument({
    size: 'A4',
    margin: 42,
    info: {
      Title: `Reporte de solicitud ${submission.id}`,
      Author: 'KSA Trabajo Social',
      Subject: 'Analisis automatico de formulario',
    },
  });

  const stream = createWriteStream(filePath);
  doc.pipe(stream);

  doc.rect(0, 0, doc.page.width, doc.page.height).fill(brand.background);

  drawRoundedRect(doc, 34, 34, 527, 120, brand.primary, 22);
  drawRoundedRect(doc, 402, 34, 159, 120, brand.secondary, 22);

  try {
    doc.image(logoPath, 456, 54, { width: 62, height: 62, fit: [62, 62] });
  } catch {
    drawRoundedRect(doc, 456, 54, 62, 62, brand.background, 31);
    doc.fillColor(brand.primary).font('Helvetica-Bold').fontSize(16).text('KSA', 471, 77);
  }

  doc
    .fillColor('#ffffff')
    .font('Helvetica-Bold')
    .fontSize(24)
    .text('Reporte de solicitud', 60, 58, { width: 320 });

  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor('#f0f2e7')
    .text('Analisis automatico del formulario de contacto', 60, 91, { width: 320 });

  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor('#f0f2e7')
    .text(`ID: ${submission.id}`, 60, 119, { width: 320 });

  drawRoundedRect(doc, 42, 178, 511, 86, brand.surface, 18);
  drawLabelValue(doc, 'Fecha de recepcion', formatDate(submission.createdAt), 64, 199, 210);
  drawLabelValue(doc, 'Origen', submission.source === 'home' ? 'Pagina Home' : 'Recursos y Contacto', 304, 199, 190);

  const priorityColor = submission.analysis.priority === 'alta' ? brand.danger : brand.primary;
  drawPill(doc, `Prioridad ${submission.analysis.priority}`, 64, 232, priorityColor);

  const contentX = 58;
  let y = 294;

  drawSectionTitle(doc, 'Datos de contacto', contentX, y);
  y += 42;
  drawRoundedRect(doc, 42, y - 14, 511, 96, brand.surface, 18);
  drawLabelValue(doc, 'Nombre', submission.name, 64, y + 4, 210);
  drawLabelValue(doc, 'Correo electronico', submission.email, 304, y + 4, 190);
  drawLabelValue(doc, 'Tipo de orientacion solicitado', submission.analysis.selectedService, 64, y + 49, 430);
  y += 122;

  drawSectionTitle(doc, 'Analisis automatico', contentX, y);
  y += 42;
  drawRoundedRect(doc, 42, y - 14, 511, 138, brand.surface, 18);
  drawLabelValue(doc, 'Servicio recomendado', submission.analysis.recommendedService, 64, y + 4, 210);
  drawLabelValue(doc, 'Resumen', submission.analysis.summary, 304, y + 4, 190);

  doc.fillColor(brand.muted).font('Helvetica-Bold').fontSize(8).text('PALABRAS CLAVE DETECTADAS', 64, y + 70);
  drawKeywordList(doc, submission.analysis.detectedKeywords, 64, y + 86);
  y += 164;

  drawSectionTitle(doc, 'Cierre del analisis', contentX, y);
  y += 42;

  drawRoundedRect(doc, 42, y - 14, 246, 112, '#edefe5', 18);
  doc.fillColor(brand.primary).font('Helvetica-Bold').fontSize(8).text('RECOMENDACION INICIAL', 64, y + 2);
  doc
    .fillColor(brand.text)
    .font('Helvetica')
    .fontSize(10)
    .text(inquiryAdvice[submission.analysis.recommendedService] || inquiryAdvice.Otro, 64, y + 20, {
      width: 198,
      lineGap: 3,
    });

  drawRoundedRect(doc, 307, y - 14, 246, 112, brand.surface, 18);
  doc.fillColor(brand.primary).font('Helvetica-Bold').fontSize(8).text('MENSAJE RECIBIDO', 329, y + 2);
  doc
    .fillColor(brand.text)
    .font('Helvetica')
    .fontSize(10)
    .text(submission.message, 329, y + 20, {
      width: 198,
      height: 70,
      lineGap: 3,
      ellipsis: true,
    });

  doc.end();

  await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  return {
    filename,
    path: filePath,
  };
}
