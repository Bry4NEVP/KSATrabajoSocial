import http from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { generateContactReport } from './reportGenerator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const reportsDir = path.join(dataDir, 'reports');
const submissionsFile = path.join(dataDir, 'contact-submissions.json');
const logoPath = path.join(rootDir, 'public', 'LogoR.png');
const port = Number(process.env.PORT || 3001);

const inquiryLabels = {
  'orientacion-familiar': 'Orientacion familiar',
  'apoyo-psicosocial': 'Apoyo psicosocial',
  'desarrollo-comunitario': 'Desarrollo comunitario',
  capacitacion: 'Capacitacion',
  'consulta-profesional': 'Consulta profesional',
  otro: 'Otro',
};

const keywordGroups = [
  {
    service: 'Orientacion familiar',
    keywords: ['familia', 'familiar', 'convivencia', 'custodia', 'hijos', 'padres', 'pareja', 'conflicto', 'mediacion'],
  },
  {
    service: 'Apoyo psicosocial',
    keywords: ['ansiedad', 'depresion', 'duelo', 'crisis', 'emocional', 'acompanamiento', 'vulnerabilidad', 'salud mental'],
  },
  {
    service: 'Desarrollo comunitario',
    keywords: ['comunidad', 'barrio', 'colectivo', 'territorio', 'participacion', 'redes', 'proyecto social'],
  },
  {
    service: 'Capacitacion',
    keywords: ['capacitacion', 'taller', 'formacion', 'curso', 'equipo', 'charla', 'entrenamiento'],
  },
  {
    service: 'Consulta profesional',
    keywords: ['ong', 'fundacion', 'informe', 'peritaje', 'judicial', 'asesoria', 'organizacion', 'institucion'],
  },
];

const priorityKeywords = ['urgente', 'riesgo', 'violencia', 'amenaza', 'menor', 'maltrato', 'emergencia', 'crisis'];

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(body));
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function validateSubmission(body) {
  const errors = {};
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const inquiryType = String(body.inquiryType || '').trim();
  const message = String(body.message || '').trim();
  const privacyAccepted = body.privacyAccepted === true;

  if (!name) errors.name = 'El nombre es obligatorio.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'El correo no es valido.';
  if (!inquiryLabels[inquiryType]) errors.inquiryType = 'El tipo de consulta no es valido.';
  if (message.length < 10) errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  if (!privacyAccepted) errors.privacyAccepted = 'Debes aceptar la politica de privacidad.';

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: { name, email, inquiryType, message, privacyAccepted },
  };
}

function analyzeSubmission(data) {
  const text = normalizeText(`${data.inquiryType} ${data.message}`);
  const matches = keywordGroups
    .map((group) => ({
      service: group.service,
      keywords: group.keywords.filter((keyword) => text.includes(normalizeText(keyword))),
    }))
    .filter((group) => group.keywords.length > 0);

  const detectedPriorityKeywords = priorityKeywords.filter((keyword) => text.includes(normalizeText(keyword)));
  const selectedService = inquiryLabels[data.inquiryType];
  const recommendedService = matches[0]?.service || selectedService;

  return {
    selectedService,
    recommendedService,
    priority: detectedPriorityKeywords.length > 0 ? 'alta' : 'normal',
    detectedKeywords: [...new Set(matches.flatMap((group) => group.keywords))],
    priorityKeywords: detectedPriorityKeywords,
    summary: `Consulta sobre ${selectedService}. Servicio sugerido: ${recommendedService}.`,
  };
}

async function readSubmissions() {
  try {
    return JSON.parse(await readFile(submissionsFile, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function saveSubmission(submission) {
  await mkdir(dataDir, { recursive: true });
  const submissions = await readSubmissions();
  submissions.push(submission);
  await writeFile(submissionsFile, JSON.stringify(submissions, null, 2));
}

async function readJsonBody(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1_000_000) {
      throw new Error('Payload too large');
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'OPTIONS') {
      return sendJson(res, 204, {});
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
      return sendJson(res, 200, { ok: true, service: 'contact-backend' });
    }

    if (req.method === 'POST' && url.pathname === '/api/contacto') {
      const body = await readJsonBody(req);
      const validation = validateSubmission(body);

      if (!validation.isValid) {
        return sendJson(res, 400, { ok: false, errors: validation.errors });
      }

      const analysis = analyzeSubmission(validation.data);
      const submission = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        source: String(body.source || 'web'),
        ...validation.data,
        analysis,
      };

      const report = await generateContactReport(submission, { reportsDir, logoPath });
      submission.report = report;

      await saveSubmission(submission);

      return sendJson(res, 201, {
        ok: true,
        id: submission.id,
        analysis,
        report: {
          filename: report.filename,
          path: report.path,
        },
        message: 'Solicitud recibida correctamente.',
      });
    }

    return sendJson(res, 404, { ok: false, message: 'Ruta no encontrada.' });
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { ok: false, message: 'No se pudo procesar la solicitud.' });
  }
});

server.listen(port, () => {
  console.log(`Contact backend listening on http://localhost:${port}`);
});
