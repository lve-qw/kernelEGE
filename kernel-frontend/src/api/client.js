const BASE_URL = import.meta.env.DEV ? '/api/v1' : 'http://localhost:8000/api/v1';

function getHeaders() {
  const userId = localStorage.getItem('userId') || '1';
  return { 'Content-Type': 'application/json', 'X-User-ID': userId };
}

/* Аутентификация */
export async function register(email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json(); localStorage.setItem('userId', data.id); return data;
}

export async function login(email, password) {
  // В MVP используем тот же эндпоинт или добавляем /auth/login
  // Для простоты возвращаем mock, в продакшене заменить на реальный вызов
  localStorage.setItem('userId', '1'); return { id: '1', email };
}

/* Профиль и предпочтения */
export async function savePreferences(prefs) {
  localStorage.setItem('userPrefs', JSON.stringify(prefs));
  return { status: 'ok' };
}

/* Материалы */
export async function uploadMaterial(file) {
  const formData = new FormData(); formData.append('file', file);
  const res = await fetch(`${BASE_URL}/materials/upload`, { method: 'POST', headers: { 'X-User-ID': localStorage.getItem('userId') }, body: formData });
  if (!res.ok) throw new Error(await res.text()); return res.json();
}

export function getUploadedMaterials() {
  return JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
}
export function saveUploadedFile(fileInfo) {
  const list = getUploadedMaterials(); list.push(fileInfo); localStorage.setItem('uploadedFiles', JSON.stringify(list));
}

/* Теория и практика */
export async function generateTheory(topic, filePath) {
  const formData = new FormData(); formData.append('topic', topic); if(filePath) formData.append('file_path', filePath);
  const res = await fetch(`${BASE_URL}/materials/generate-theory`, { method: 'POST', headers: getHeaders(), body: formData });
  if (!res.ok) throw new Error(await res.text()); return res.json();
}

export async function generatePractice(topic, filePath) {
  // Эндпоинт /materials/generate-practice (добавляется по аналогии с theory)
  const formData = new FormData(); formData.append('topic', topic); if(filePath) formData.append('file_path', filePath);
  const res = await fetch(`${BASE_URL}/materials/generate-practice`, { method: 'POST', headers: getHeaders(), body: formData });
  if (!res.ok) throw new Error(await res.text()); return res.json();
}

/* Планы */
export async function generatePlan(payload) {
  const res = await fetch(`${BASE_URL}/plans/generate`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(await res.text()); return res.json();
}

/* SSE Чат */
export function streamChat(message, topic, onChunk, onDone, onError) {
  fetch(`${BASE_URL}/chat/stream`, {
    method: 'POST', headers: { ...getHeaders(), Accept: 'text/event-stream' },
    body: JSON.stringify({ text: message, topic })
  }).then(async (res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const reader = res.body.getReader(); const decoder = new TextDecoder(); let buffer = '';
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n'); buffer = lines.pop();
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.type === 'content') onChunk(parsed.data);
            else if (parsed.type === 'done') onDone();
            else if (parsed.type === 'error') onError(parsed.data);
          } catch (e) { console.warn('SSE parse err:', e); }
        }
      }
    }
  }).catch(onError);
}
