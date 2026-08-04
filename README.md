# Rockhubfestival

## Descrizione

`Rockhubfestival` è un frontend statico per la landing page del festival musicale Rockhub Festival 2026. Il sito è sviluppato con Vite e TypeScript e offre:

- pagina informativa sul festival
- sezione line-up con band e date
- sezione sponsor
- modulo di registrazione per utenti e band
- invio dati verso un backend API configurabile tramite variabile d'ambiente

## Struttura del progetto

- `index.html` — pagina principale dell'applicazione.
- `src/main.ts` — script TypeScript che gestisce l'invio dei form di registrazione.
- `resources/style.css` — foglio di stile principale del sito.
- `public/` — risorse pubbliche che vengono servite staticamente.
- `external_pages/` — pagine esterne di riferimento (es. convertitore MIDI).
- `package.json` — configurazione del progetto, script e dipendenze.
- `tsconfig.json` — configurazione TypeScript.
- `vite.config.ts` — configurazione Vite.

## Funzionalità principali

- gestione dei form `data-registration="users"` e `data-registration="bands"`
- validazione base via HTML per campi richiesti, email e checkbox privacy
- invio POST JSON a un endpoint API configurabile
- feedback all'utente tramite elemento `role="status"`
- responsive menu mobile con hamburger menu

## Ambiente e configurazione

Il codice legge l'URL dell'API da `import.meta.env.VITE_API_BASE_URL`. Se non impostato, usa il valore di default:

```ts
const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'https://api.rockhubfestival.it';
```

Per far funzionare correttamente la registrazione, occorre configurare l'endpoint backend su:

- `/v1/registrations/users`
- `/v1/registrations/bands`

## Come eseguire il progetto

1. Installare le dipendenze:

```bash
npm install
```

2. Avviare il server di sviluppo:

```bash
npm run dev
```

3. Creare la build di produzione:

```bash
npm run build
```

4. Eseguire i test:

```bash
npm run test
```

5. Verificare il tipo con TypeScript:

```bash
npm run typecheck
```

## Tecnologia utilizzata

- Vite
- TypeScript
- Vitest
- HTML/CSS
- JavaScript del browser

## Note

Questo progetto è pensato per una landing page promozionale, con invio dei dati di registrazione verso un backend esterno. L'interfaccia è ottimizzata per uno stile rock con colori scuri e un layout responsive.