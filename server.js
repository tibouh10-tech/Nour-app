const express = require('express');
const path    = require('path');
const app     = express();
const PORT    = process.env.PORT || 3000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route principale → app HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route santé (pour Render/Railway)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'Nour - نور', version: '1.0.0' });
});

// Route pour envoyer une notification FCM via le backend
// (nécessite firebase-admin — à activer plus tard)
app.post('/api/notify', async (req, res) => {
  const { token, title, body } = req.body;
  if (!token || !title) {
    return res.status(400).json({ error: 'token et title requis' });
  }
  // TODO: intégrer firebase-admin pour les vraies notifications
  // Pour l'instant on retourne un succès simulé
  console.log(`[FCM] Notification → ${title} : ${body}`);
  res.json({ success: true, message: 'Notification envoyée (simulation)' });
});

// Route pour le rendu FFmpeg (backend)
// (à activer quand FFmpeg est installé sur le serveur)
app.post('/api/render', async (req, res) => {
  const { surah, qari, format, bgUrl, audioUrl } = req.body;
  console.log(`[Render] Sourate: ${surah}, Qari: ${qari}, Format: ${format}`);
  // TODO: lancer FFmpeg ici
  // ffmpeg -i bgUrl -i audioUrl -vf "drawtext=..." output.mp4
  res.json({
    success: true,
    message: 'Rendu en cours (intègre FFmpeg ici)',
    jobId: 'job_' + Date.now()
  });
});

app.listen(PORT, () => {
  console.log(`✅ Nour app lancée sur http://localhost:${PORT}`);
});
