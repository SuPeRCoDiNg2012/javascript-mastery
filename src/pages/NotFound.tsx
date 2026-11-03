import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-5xl font-semibold tracking-tight text-primary">404</p>
      <h1 className="mt-3 text-xl font-semibold">Questa pagina non esiste</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Forse il link è vecchio o la lezione è stata spostata. Il percorso è qui sotto.
      </p>
      <Button className="mt-5" asChild>
        <Link to="/">
          <Home className="h-4 w-4" aria-hidden />
          Torna alla home
        </Link>
      </Button>
    </div>
  );
}
