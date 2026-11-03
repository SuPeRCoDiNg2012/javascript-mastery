import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

export default function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);

  const redirectTo = `${window.location.origin}/`;

  const signIn = async () => {
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error('Accesso non riuscito.', { description: error.message });
      return;
    }
    toast.success('Bentornato.');
    navigate('/');
  };

  const signUp = async () => {
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } });
    setLoading(false);
    if (error) {
      toast.error('Registrazione non riuscita.', { description: error.message });
      return;
    }
    toast.success('Controlla la posta.', { description: 'Ti abbiamo inviato un link per confermare l’indirizzo.' });
  };

  const magicLink = async () => {
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    setLoading(false);
    if (error) {
      toast.error('Invio non riuscito.', { description: error.message });
      return;
    }
    setMagicSent(true);
  };

  const google = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) toast.error('Google non disponibile.', { description: error.message });
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-md py-8">
        <Link to="/" className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Torna al corso
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Account non configurato in questa build</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              L’app funziona interamente in locale: puoi studiare, completare esercizi e mantenere i
              progressi su questo dispositivo senza alcun account.
            </p>
            <p>
              Per attivare accesso e sincronizzazione tra dispositivi, imposta
              <code className="mx-1 font-mono">VITE_SUPABASE_URL</code> e
              <code className="mx-1 font-mono">VITE_SUPABASE_ANON_KEY</code>, applica lo schema
              <code className="mx-1 font-mono">supabase/schema.sql</code> e riavvia la build.
            </p>
            <div className="flex gap-2">
              <Button asChild>
                <Link to="/">Continua come ospite</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/settings">Esporta i progressi</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md py-8">
      <Link to="/" className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Torna al corso
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight">I tuoi progressi, ovunque</h1>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        L’account serve solo a sincronizzare. Puoi continuare come ospite e registrarti quando vuoi: i
        progressi locali vengono uniti, non sovrascritti.
      </p>

      <Card className="mt-5">
        <CardContent className="p-5">
          <Tabs defaultValue="magic">
            <TabsList className="w-full">
              <TabsTrigger value="magic" className="flex-1">
                Magic link
              </TabsTrigger>
              <TabsTrigger value="password" className="flex-1">
                Password
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">
                Registrati
              </TabsTrigger>
            </TabsList>

            <TabsContent value="magic" className="space-y-3">
              <div>
                <Label htmlFor="magic-email">Email</Label>
                <Input
                  id="magic-email"
                  type="email"
                  className="mt-1.5"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu@esempio.it"
                  autoComplete="email"
                />
              </div>
              <Button className="w-full" disabled={loading || !email} onClick={() => void magicLink()}>
                <Mail className="h-4 w-4" aria-hidden />
                Invia il link di accesso
              </Button>
              {magicSent && (
                <p className="flex items-start gap-2 rounded-md bg-success-soft px-3 py-2 text-xs text-success">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  Link inviato. Apri la mail sullo stesso dispositivo o su un altro: la sessione si sincronizza.
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Niente password da ricordare. Il link scade dopo un’ora.
              </p>
            </TabsContent>

            <TabsContent value="password" className="space-y-3">
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  className="mt-1.5"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  className="mt-1.5"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <Button className="w-full" disabled={loading || !email || !password} onClick={() => void signIn()}>
                <KeyRound className="h-4 w-4" aria-hidden />
                Accedi
              </Button>
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={async () => {
                  if (!supabase || !email) return;
                  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
                  toast[error ? 'error' : 'success'](
                    error ? 'Invio non riuscito.' : 'Email di reset inviata.',
                    { description: error?.message },
                  );
                }}
              >
                Password dimenticata?
              </button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-3">
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  className="mt-1.5"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  className="mt-1.5"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <Button className="w-full" disabled={loading || !email || password.length < 8} onClick={() => void signUp()}>
                Crea account
              </Button>
              <p className="text-xs text-muted-foreground">Almeno 8 caratteri. Nessuna newsletter.</p>
            </TabsContent>
          </Tabs>

          <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            oppure
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full" onClick={() => void google()}>
            Continua con Google
          </Button>
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        <Link to="/settings" className="hover:underline">
          Preferisci restare ospite? Esporta i progressi in JSON.
        </Link>
      </p>
    </div>
  );
}
