// scripts/daily.js
document.addEventListener('DOMContentLoaded', loadDailyPosts);

async function loadDailyPosts() {
  const container = document.getElementById('posts');
  if (!container) return;

  try {
    // daily.html lives in /pages, so go up one level to /data
    const res = await fetch('../data/daily_posts.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const posts = Array.isArray(data) ? data : [data];

    // newest first
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = posts.map(renderPost).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p>Couldn’t load posts.</p>`;
  }
}

function renderPost(p) {
  const title = escapeHtml(p.title || 'Untitled');
  const iso = p.date ? new Date(p.date).toISOString().slice(0,10) : '';
  const pretty = p.date ? new Date(p.date).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' }) : '';
  const body = formatContent(p.content || '');
  const tags = (p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join(' ');
  const image = p.image ? `
    <figure class="post-image">
      <img src="${p.image}" alt="${escapeHtml(p.imageAlt || '')}">
    </figure>` : '';

  return `
    <article class="post">
      <h3>${title}</h3>
      ${iso ? `<p class="meta">Publié le <time datetime="${iso}">${pretty}</time></p>` : ''}
      ${image}
      <div class="post-body">${body}</div>
      ${tags ? `<p class="tags">${tags}</p>` : ''}
    </article>
  `;
}

function formatContent(text) {
  // split on blank lines into paragraphs; keep single newlines as <br>
  return text
    .split(/\n{2,}/)
    .map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, s => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[s]));
}
