const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'DEP C2 - CI/CD Pipeline' });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '0.1.0'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

if (require.main === module) {
  const port = Number.parseInt(process.env.PORT || '3000', 10);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;