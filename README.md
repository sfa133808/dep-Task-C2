# C2 - CI/CD mit GitHub Actions

Dieses Repository enthaelt eine kleine Express-Anwendung als Basis fuer die spaetere CI/CD-Pipeline. Die App ist bewusst schlicht gehalten, damit sich Build, Test und Docker-Verpackung sauber zeigen lassen.

## Aktuelle Struktur

- [index.js](index.js) fuer die Express-App
- [test/app.test.js](test/app.test.js) fuer die Supertest-basierten Tests
- [Dockerfile](Dockerfile) fuer das Container-Image
- [.github/workflows/](.github/workflows/) fuer den spaeteren CI/CD-Workflow

## Aktueller Stand

- Route `/` liefert eine JSON-Antwort mit einer Nachricht.
- Route `/health` liefert Status, Timestamp und Version.
- Unbekannte Routen liefern `404`.
- Tests laufen mit Jest und Supertest.

## Pipeline-Uebersicht

1. Build - erstellt das Docker-Image mit Docker Buildx und aktiviert Cache-Wiederverwendung ueber GitHub Actions.
2. Test - installiert die Node-Abhaengigkeiten und fuehrt die Jest-Tests aus.
3. Push - meldet sich bei GitHub Container Registry an und veroeffentlicht das Image nur bei erfolgreichem Build und Test.

Das Image wird mit zwei Tags veroeffentlicht: `latest` fuer den aktuellen Stand auf dem Hauptbranch und `sha-<commit>` fuer eine eindeutige, nachvollziehbare Version.

Als Registry wird GitHub Container Registry verwendet, weil sie direkt mit dem Repository zusammenarbeitet und sich ueber `GITHUB_TOKEN` ohne separate Registry-Secrets aus der Pipeline heraus ansprechen laesst.

## Reproduktion

Voraussetzungen:
- GitHub-Repository mit `main` als Default-Branch
- GitHub Actions aktiviert
- Keine extra Registry-Secrets erforderlich, weil der Workflow `GITHUB_TOKEN` nutzt

Lokale Pruefung:

```bash
npm ci
npm test
docker build -t dep-task-c2 .
```

## Naechster Ausbauschritt

Im naechsten Schritt kann optional noch eine kuerzere Abgabe-Dokumentation mit Diagramm und Reflexion entstehen.
