# Pubblicare su GitHub

Questa guida copre la creazione di un **nuovo repository** e il primo push. Il progetto è già pronto: `.gitignore` esclude dipendenze, build, log e file di ambiente.

## Prerequisiti

- Git installato (`git --version`).
- Un account GitHub.
- Un nome per il repository: `javascript-mastery` è quello suggerito.

## 1. Identità dei commit

Prima del primo commit, imposta nome ed email **in locale** (valgono solo per questo repository):

```bash
git config user.name "Il Tuo Nome"
git config user.email "la-tua-email@example.com"
```

Se usi l'email privata di GitHub, trovi l'indirizzo `ID+username@users.noreply.github.com` in **GitHub → Settings → Emails**. Serve per collegare i commit al profilo.

## 2. Creare il repository

### Opzione A — dal sito

1. Vai su <https://github.com/new>.
2. Nome: `javascript-mastery`.
3. Visibilità: **privato** se è un progetto personale ancora in lavorazione, **pubblico** se vuoi condividerlo.
4. Non aggiungere README, licenza o `.gitignore`: esistono già nel progetto.
5. Crea il repository.

### Opzione B — con GitHub CLI

```bash
# Installazione (Windows)
winget install --id GitHub.cli

# Autenticazione interattiva (una volta sola)
gh auth login

# Creazione + push in un solo comando
gh repo create javascript-mastery --private --source=. --remote=origin --push
```

Con `--public` al posto di `--private` il repository nasce pubblico.

## 3. Primo commit e push

Se il repository è stato creato dal sito:

```bash
git init -b main
git add .
git commit -m "feat: corso JavaScript Mastery completo, UI monocroma e documentazione"
git remote add origin https://github.com/<utente>/javascript-mastery.git
git push -u origin main
```

Con SSH, sostituisci il remote:

```bash
git remote add origin git@github.com:<utente>/javascript-mastery.git
```

Verifica:

```bash
git status
git log --oneline -1
git remote -v
```

## 4. Cosa non deve finire nel repository

`.gitignore` esclude già:

- `node_modules/`, `dist/`, `dev-dist/`, `coverage/`, `playwright-report/`;
- `.env`, `.env.*` (tranne `.env.example`);
- `*.log`, `.freebuff/`, file di sistema.

Controlla prima del push:

```bash
git status --short
git ls-files | grep -E "\.env$|service_role|\.log$"
```

Il comando non deve stampare nulla. Se stampa un file `.env`, rimuovilo dallo staging con `git rm --cached <file>`.

> **Regola:** nel client Vite va solo la chiave **anon/public**. Una `service_role` finisce nel bundle pubblico: non va mai committata né inserita in variabili `VITE_`.

## 5. Dopo il push

- **Descrizione**: “Corso interattivo di JavaScript in 12 settimane: 96 lezioni, esercizi in sandbox, ripasso a intervalli, PWA offline, sync Supabase.”
- **Topics**: `javascript`, `education`, `react`, `vite`, `typescript`, `pwa`, `spaced-repetition`, `supabase`.
- **Branch protection** su `main`: richiedi che `npm run typecheck`, `npm test` e `npm run build` passino prima del merge.
- **Vercel**: collega il repository e imposta `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nelle Environment Variables. Vedi [`DEPLOY.md`](DEPLOY.md).

## 6. Se il push viene rifiutato

| Messaggio | Causa | Rimedio |
| --- | --- | --- |
| `remote: Repository not found` | URL errato o nessun accesso | Controlla `git remote -v` e i permessi |
| `Authentication failed` | Credenziali scadute | `gh auth login` oppure PAT con scope `repo` |
| `Updates were rejected` | Il remoto ha commit che non hai | `git pull --rebase origin main` |
| `Author identity unknown` | Manca `user.name` / `user.email` | Esegui il passo 1 |

Per un token manuale, crea un **Personal Access Token** con scope `repo` e usalo come password quando Git la chiede. Non salvarlo in chiaro nel remote: se lo hai fatto, ruotalo subito.
