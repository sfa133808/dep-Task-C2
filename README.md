# C2 - CI/CD mit GitHub Actions

Dieses Repository enthaelt eine kleine Express-Anwendung fuer den Auftrag C2. Die ausfuehrliche technische Dokumentation zur CI/CD-Pipeline, zu Entscheidungen und zur Reproduzierbarkeit steht in der separaten Doku.

## Kurzueberblick

- Express-App mit Node.js 22
- Tests mit Jest und Supertest
- Containerisierung ueber Docker
- vorbereitet fuer CI/CD mit GitHub Actions

## Projektstruktur

- [index.js](index.js) - Applikation
- [test/app.test.js](test/app.test.js) - Tests
- [Dockerfile](Dockerfile) - Container-Image
- [.github/workflows/](.github/workflows/) - Workflow-Verzeichnis

## Schnellstart

```bash
npm install
npm test
docker build -t dep-task-c2 .
docker run -p 3000:3000 dep-task-c2
```

## Hinweise

- Die Pipeline-Beschreibung steht in der Doku.
- Fuer GHCR sind die passenden Repository-Berechtigungen erforderlich.
- Lokale und CI-Ausfuehrung sollen moeglichst dieselbe Docker-Umgebung nutzen.
