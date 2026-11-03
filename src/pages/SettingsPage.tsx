import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Download, LogIn, Upload, UserRound } from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore } from '@/app/store';
import { exportProgress, importProgress, saveSettings } from '@/app/settings';
import { clearLocalData } from '@/lib/db';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { applyFontSize, applyTheme } from '@/lib/theme';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Switch,
} from '@/components/ui';
import { PageHeader } from '@/components/layout/PageHeader';
import { cn } from '@/lib/utils';

const themes = [
  { value: 'light', label: 'Chiaro' },
  { value: 'dark', label: 'Scuro' },
] as const;

const fontSizes = [
  { value: 'sm', label: 'Piccolo' },
  { value: 'md', label: 'Medio' },
  { value: 'lg', label: 'Grande' },
] as const;

export default function SettingsPage() {
  const userId = useAppStore((state) => state.userId);
  const email = useAppStore((state) => state.email);
  const settings = useAppStore((state) => state.settings);
  const setSettings = useAppStore((state) => state.setSettings);
  const [name, setName] = useState(settings?.displayName ?? '');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const fileInput = useRef<HTMLInputElement | null>(null);

  const update = async (patch: Parameters<typeof saveSettings>[1]) => {
    const next = await saveSettings(userId, patch);
    setSettings(next);
  };

  return (
    <div className="mx-auto max-w-2xl animate-rise">
      <PageHeader
        eyebrow="Impostazioni"
        title="Come vuoi studiare"
        description="Tutte le preferenze valgono solo per questo dispositivo finché non accedi. Nulla è definitivo."
      />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Aspetto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium">Tema</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Tema">
              {themes.map((theme) => (
                <Button
                  key={theme.value}
                  variant={settings?.theme === theme.value ? 'default' : 'outline'}
                  size="sm"
                  aria-pressed={settings?.theme === theme.value}
                  onClick={() => {
                    applyTheme(theme.value);
                    void update({ theme: theme.value });
                  }}
                >
                  {theme.label}
                </Button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Il corso è pensato su fondo bianco. Il tema scuro è disponibile, ma non è quello predefinito.
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Dimensione del testo</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Dimensione del testo">
              {fontSizes.map((size) => (
                <Button
                  key={size.value}
                  variant={settings?.fontSize === size.value ? 'default' : 'outline'}
                  size="sm"
                  aria-pressed={settings?.fontSize === size.value}
                  onClick={() => {
                    applyFontSize(size.value);
                    void update({ fontSize: size.value });
                  }}
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>

          <ToggleRow
            label="Suoni"
            description="Disattivati per default: nessun suono durante gli esercizi."
            checked={settings?.sound ?? false}
            onChange={(checked) => void update({ sound: checked })}
          />
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Ritmo e promemoria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="display-name">Come ti chiami (facoltativo)</Label>
            <div className="mt-1.5 flex gap-2">
              <Input
                id="display-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Il tuo nome"
                autoComplete="given-name"
              />
              <Button
                variant="outline"
                onClick={() => {
                  void update({ displayName: name.trim() || null });
                  toast.success('Nome aggiornato.');
                }}
              >
                Salva
              </Button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Quando studi di solito?</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Momento di studio preferito">
              {([
                ['morning', 'Mattina'],
                ['afternoon', 'Pomeriggio'],
                ['evening', 'Sera'],
              ] as const).map(([value, label]) => (
                <Button
                  key={value}
                  size="sm"
                  variant={settings?.studyTime === value ? 'default' : 'outline'}
                  aria-pressed={settings?.studyTime === value}
                  onClick={() => void update({ studyTime: value })}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <ToggleRow
            label="Promemoria discreto"
            description="Un solo promemoria all’orario che scegli. Mai notifiche push invadenti. Puoi disattivarlo qui."
            checked={settings?.reminders ?? false}
            onChange={(checked) => void update({ reminders: checked })}
          />
          <p className="rounded-md bg-muted/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            I promemoria richiedono il permesso del browser e funzionano solo con l’app installata. Se non
            li vuoi, non cambia nulla nel corso.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Account e sincronizzazione</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <UserRound className="h-4 w-4 text-muted-foreground" aria-hidden />
            {email ? (
              <span>{email}</span>
            ) : (
              <span className="text-muted-foreground">Stai studiando come ospite, solo su questo dispositivo.</span>
            )}
            {email ? <Badge variant="success">Sincronizzato</Badge> : <Badge variant="outline">Locale</Badge>}
          </div>

          {!isSupabaseConfigured && (
            <p className="rounded-md border border-warning/30 bg-warning-soft px-3 py-2 text-xs leading-relaxed">
              Supabase non è configurato in questa build: l’app funziona al 100% in locale. Aggiungi
              <code className="mx-1 font-mono">VITE_SUPABASE_URL</code> e
              <code className="mx-1 font-mono">VITE_SUPABASE_ANON_KEY</code> per attivare account e sync.
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {email ? (
              <Button
                variant="outline"
                onClick={async () => {
                  await supabase?.auth.signOut();
                  toast.success('Sessione chiusa. I progressi restano su questo dispositivo.');
                }}
              >
                Esci
              </Button>
            ) : (
              <Button asChild>
                <Link to="/auth">
                  <LogIn className="h-4 w-4" aria-hidden />
                  Accedi o crea un account
                </Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link to="/stats">Statistiche</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">I tuoi dati</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Esporta un file JSON con tutti i progressi e importalo su un altro dispositivo. Funziona anche
            senza account.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={async () => {
                await exportProgress(userId);
                toast.success('Backup esportato.');
              }}
            >
              <Download className="h-4 w-4" aria-hidden />
              Esporta progressi
            </Button>
            <Button variant="outline" onClick={() => fileInput.current?.click()}>
              <Upload className="h-4 w-4" aria-hidden />
              Importa progressi
            </Button>
            <input
              ref={fileInput}
              type="file"
              accept="application/json"
              className="sr-only"
              aria-label="File di backup"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                try {
                  const count = await importProgress(userId, await file.text());
                  toast.success('Import completato.', { description: `${count} record uniti ai tuoi.` });
                } catch (error) {
                  toast.error('Import non riuscito.', {
                    description: error instanceof Error ? error.message : 'File non valido.',
                  });
                } finally {
                  event.target.value = '';
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 border-destructive/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-destructive">
            <AlertTriangle className="h-4 w-4" aria-hidden />
            Zona delicata
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Cancellare i dati locali elimina progressi, streak, note e achievement da questo dispositivo.
            Se hai un account, i dati sincronizzati restano sul server.
          </p>
          <Button variant="destructive" className="mt-3" onClick={() => setDeleteOpen(true)}>
            Cancella i dati locali
          </Button>
        </CardContent>
      </Card>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancellare tutti i dati locali?</DialogTitle>
            <DialogDescription>
              L’operazione non si può annullare. Scrivi <strong>CANCELLA</strong> per confermare.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={confirmText}
            onChange={(event) => setConfirmText(event.target.value)}
            placeholder="CANCELLA"
            aria-label="Conferma cancellazione"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteOpen(false)}>
              Annulla
            </Button>
            <Button
              variant="destructive"
              disabled={confirmText !== 'CANCELLA'}
              onClick={async () => {
                await clearLocalData();
                toast.success('Dati locali cancellati.');
                setDeleteOpen(false);
                window.location.href = '/';
              }}
            >
              Cancella definitivamente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 rounded-md border border-border p-3')}>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </div>
  );
}
