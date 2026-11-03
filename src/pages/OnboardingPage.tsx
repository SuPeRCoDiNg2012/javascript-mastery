import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Sunrise, Sunset } from 'lucide-react';
import { useAppStore } from '@/app/store';
import { saveSettings } from '@/app/settings';
import { Button, Card, CardContent, Input, Label } from '@/components/ui';
import { applyTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

const slots = [
  { value: 'morning', label: 'Mattina', icon: Sunrise, hint: 'Prima di tutto: 10 minuti bastano.' },
  { value: 'afternoon', label: 'Pomeriggio', icon: Clock, hint: 'Pausa pranzo o dopo il lavoro.' },
  { value: 'evening', label: 'Sera', icon: Sunset, hint: 'Dopo cena, con calma.' },
] as const;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const userId = useAppStore((state) => state.userId);
  const setSettings = useAppStore((state) => state.setSettings);
  const [name, setName] = useState('');
  const [slot, setSlot] = useState<'morning' | 'afternoon' | 'evening'>('evening');
  const [saving, setSaving] = useState(false);

  const finish = async () => {
    setSaving(true);
    const next = await saveSettings(userId, {
      displayName: name.trim() || null,
      studyTime: slot,
      onboarded: true,
      reminders: false,
    });
    setSettings(next);
    applyTheme(next.theme);
    setSaving(false);
    navigate('/', { replace: true });
  };

  return (
    <div className="mx-auto max-w-lg py-6">
      <div className="mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          JS
        </div>
        <h1 className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Prima di iniziare, due cose
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Non c’è fretta e non ci sono scadenze. Queste risposte servono solo a proporti il momento giusto
          per studiare, e puoi cambiarle quando vuoi.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-5 p-5">
          <div>
            <Label htmlFor="onboarding-name">Come ti chiami? (facoltativo)</Label>
            <Input
              id="onboarding-name"
              className="mt-1.5"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Il tuo nome"
              autoComplete="given-name"
            />
          </div>

          <div>
            <p className="text-sm font-medium">Quando vuoi studiare di solito?</p>
            <div className="mt-2 grid gap-2" role="group" aria-label="Momento di studio">
              {slots.map(({ value, label, icon: Icon, hint }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSlot(value)}
                  aria-pressed={slot === value}
                  className={cn(
                    'flex items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors',
                    slot === value
                      ? 'border-primary bg-primary-soft/60'
                      : 'border-border hover:border-primary/40 hover:bg-accent/30',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="block text-sm font-medium">{label}</span>
                    <span className="block text-xs text-muted-foreground">{hint}</span>
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Nessuna notifica push: al massimo un promemoria discreto, se lo attiverai.
            </p>
          </div>

          <Button className="w-full" onClick={() => void finish()} disabled={saving}>
            Inizia dalla Settimana 1
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>

          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            Puoi studiare come ospite. Al primo completamento ti proporremo un account per non perdere i
            progressi, ma non è obbligatorio.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
