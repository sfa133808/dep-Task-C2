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

## Naechster Ausbauschritt

Im naechsten Schritt kann daraus der eigentliche GitHub-Actions-Workflow mit Build, Test, Push, Registry-Tagging und Caching entstehen.
