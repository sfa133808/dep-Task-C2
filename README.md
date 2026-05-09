# C2 - CI/CD mit GitHub Actions

Dieses Repository enthaelt eine kleine Express-Anwendung als Basis fuer den Auftrag C2. Ziel ist eine reproduzierbare CI/CD-Pipeline mit den Stages Build, Test und Push.

## Umgesetzt Und Begruendung

Die Pipeline ist in drei Stages aufgebaut und stoppt bei Fehlern automatisch durch Job-Abhaengigkeiten (`needs`):

1. Build
Erstellt ein Docker-Image mit Buildx. Dabei wird Docker-Layer-Caching ueber GitHub Actions verwendet (`cache-from`/`cache-to` mit `type=gha`).

2. Test
Installiert Abhaengigkeiten mit `npm ci` und fuehrt automatische Tests mit Jest/Supertest aus.

3. Push
Publiziert das Image in GitHub Container Registry erst nach erfolgreichem Build und Test.

Warum diese Loesung:
- Registry: GHCR ist direkt mit GitHub integriert und laesst sich ueber das eingebaute `GITHUB_TOKEN` nutzen.
- Tagging: `latest` fuer den aktuellen Hauptbranch-Stand und `sha-<commit>` fuer eindeutige Rueckverfolgbarkeit.
- Trigger: Push auf `main` fuer automatische Auslieferung; `workflow_dispatch` fuer manuelle Demos und Wiederholungen.
- Caching: Docker-Layer-Cache und npm-Cache reduzieren Laufzeiten bei wiederholten Runs.

## Projektstruktur

- [index.js](index.js) fuer die Express-App
- [test/app.test.js](test/app.test.js) fuer die Supertest-basierten Tests
- [Dockerfile](Dockerfile) fuer das Container-Image
- [.github/workflows/](.github/workflows/) fuer den spaeteren CI/CD-Workflow

## Aktueller Applikationsstand

- Route `/` liefert eine JSON-Antwort mit einer Nachricht.
- Route `/health` liefert Status, Timestamp und Version.
- Unbekannte Routen liefern `404`.
- Tests laufen mit Jest und Supertest.

## Workflow-Datei

Die Pipeline steht in [.github/workflows/cicd.yml](.github/workflows/cicd.yml). Relevanter Auszug:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    ...
  test:
    needs: build
    ...
  push:
    needs: test
    ...
```

Interpretation:
- Bei jedem Push auf `main` wird die Pipeline automatisch gestartet.
- Ueber `workflow_dispatch` ist ein manueller Start moeglich.
- `needs` erzwingt die Reihenfolge Build -> Test -> Push.

## Setup Und Reproduktion

Voraussetzungen:
- GitHub-Repository mit `main` als Default-Branch
- GitHub Actions aktiviert
- Paketrechte fuer Workflow aktiviert (Repository-Settings -> Actions/Workflow permissions: Read and write permissions), damit Push auf GHCR erlaubt ist

Secrets:
- Es werden keine zusaetzlichen Repository-Secrets benoetigt.
- Die Pipeline nutzt `secrets.GITHUB_TOKEN` zur Laufzeit.

Lokale Pruefung:

```bash
npm ci
npm test
docker build -t dep-task-c2 .
```

Pipeline ausloesen:

1. Commit nach `main` pushen.
2. In GitHub unter Actions den Workflow `CI/CD Pipeline` beobachten.
3. In GitHub Packages pruefen, ob das Image mit `latest` und `sha-...` verfuegbar ist.

## Learnings Und Reflexion

- Das wichtigste operative Thema war ein korrekter, lowercase Image-Name fuer GHCR.
- Die Trennung in Build/Test/Push plus `needs` ist einfach und robust.
- Fuer kleine Projekte reicht `GITHUB_TOKEN`; bei externen Registries waeren eigene Secrets noetig.

Was ich rueckblickend anders machen wuerde:
- zusaetzlich Pull-Request-Trigger ergaenzen, um Fehler vor dem Merge zu sehen
- optional Linting als separaten Test-Schritt einfuehren
- ein Release-Tagging (Semver-Tags) fuer produktionsnaehere Versionierung aufsetzen

## KI-Unterstuetzung

Bei der Umsetzung wurden KI-Tools als Unterstuetzung fuer Struktur, Workflow-Entwurf und Review verwendet. Alle Inhalte wurden lokal getestet und nachvollzogen.
