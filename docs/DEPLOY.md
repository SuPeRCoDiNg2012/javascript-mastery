# Deploy

L'app è un frontend statico (Vite) + un backend gestito (Supabase). Zero server da mantenere.

## 1. Supabase

1. Crea un progetto su [supabase.com](https://supabase.com) (tier gratuito).
2. Apri **SQL Editor** ed esegui `supabase/schema.sql`.
3. In **Authentication → Providers** abilita:
   - Email (password e magic link);
   - Google, se ti serve: crea un client OAuth in Google Cloud Console e incolla client id/secret.
4. In **Authentication → URL Configuration** imposta:
   - Site URL: `https://<tuo-dominio>`
   - Redirect URLs: `https://<tuo-dominio>/**` e `http://localhost:5173/**` per lo sviluppo.
5. In **Project Settings → API** copia `Project URL` e `anon public key`.

Verifica le RLS: ogni tabella deve avere le policy su `auth.uid() = user_id`. Senza, il client riceve righe vuote (comportamento corretto: meglio nessun dato che dati altrui).

## 2. Vercel

```bash
npm i -g vercel
vercel link
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel --prod
```

Oppure importa il repository da GitHub: Vercel rileva Vite, usa `npm run build` e serve `dist/`. `vercel.json` contiene già:

- rewrite SPA verso `index.html` (React Router);
- cache immutabile per `/assets/*`;
- `no-cache` per `sw.js`;
- header `nosniff`, `Referrer-Policy`, `X-Frame-Options`.

Dopo il primo deploy aggiungi il dominio Vercel tra i Redirect URLs di Supabase, altrimenti magic link e OAuth tornano a `localhost`.

## 3. Build locale di verifica

```bash
npm ci
npm run typecheck
npm test
npm run build
npm run preview
```

Controlla:

- la home si carica senza errori in console;
- il service worker si registra (DevTools → Application → Service Workers);
- dopo il primo caricamento, in modalità offline le lezioni si aprono;
- il manifest è valido e l'app è installabile;
- il tema scuro non produce lampeggi bianchi.

## 4. PWA

`vite-plugin-pwa` genera manifest e service worker al build. In sviluppo è disattivato di proposito (`devOptions.enabled: false`): per provare l'installazione serve `npm run build && npm run preview`.

Il precache include tutti gli asset con hash, quindi il contenuto del corso è disponibile offline. Il runtime caching verso Supabase è `NetworkOnly`: i progressi non vengono mai serviti dalla cache HTTP.

## 5. Checklist di accettazione

- [ ] Nuovo utente: onboarding → Settimana 1 senza errori.
- [ ] Tre errori mostrano indizi progressivi; cinque mostrano "Mostra soluzione".
- [ ] La Settimana 2 resta bloccata finché la Settimana 1 non è completa.
- [ ] Chiudere e riaprire il browser conserva i progressi.
- [ ] Due dispositivi autenticati vedono gli stessi progressi.
- [ ] Offline: si studia; al ritorno online la coda si svuota.
- [ ] Mobile 360px: nessuno scroll orizzontale.
- [ ] Dopo tre giorni di pausa il messaggio è accogliente.
- [ ] Ciclo infinito: interruzione dopo 2 secondi con il messaggio previsto.
- [ ] Tema scuro funzionante su tutte le pagine.
- [ ] Installazione PWA su desktop e mobile.
- [ ] Export JSON → import su un altro dispositivo.
- [ ] Statistiche coerenti con i dati reali.
- [ ] Ripassi proposti a 1, 3, 7, 14, 30, 90 giorni.
- [ ] Nessun warning in console.

## 6. Costi

- Vercel Free: sufficiente per un progetto personale.
- Supabase Free: 500 MB di database, 2 GB di banda, 50k utenti attivi mensili. Le righe di progresso sono piccole; il limite realistico è molto alto.

## 7. Problemi comuni

| Sintomo | Causa probabile | Rimedio |
| --- | --- | --- |
| Magic link torna a localhost | Redirect URL mancante | Aggiungi il dominio in Supabase |
| Sync non parte | Variabili assenti o build vecchia | Ricompila dopo averle impostate |
| `new row violates row-level security` | `user_id` diverso da `auth.uid()` | Il client deve usare l'id della sessione |
| App non si aggiorna dopo il deploy | Service worker con cache vecchia | Ricarica forzata; `cleanupOutdatedCaches` è attivo |
| Realtime silenzioso | Tabella non in publication | Esegui la parte `alter publication` dello schema |
