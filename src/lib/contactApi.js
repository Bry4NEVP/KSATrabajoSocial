export async function submitContactForm(form, source) {
  const formData = new FormData(form);
  const payload = {
    source,
    name: String(formData.get('name') || ''),
    email: String(formData.get('email') || ''),
    inquiryType: String(formData.get('inquiryType') || ''),
    message: String(formData.get('message') || ''),
    privacyAccepted: formData.get('privacyAccepted') === 'on',
  };

  const response = await fetch('/api/contacto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.message || Object.values(data.errors || {})[0] || 'No se pudo enviar el formulario.';
    throw new Error(message);
  }

  return data;
}
