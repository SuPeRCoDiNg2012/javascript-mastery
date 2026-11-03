import { RouterProvider } from 'react-router-dom';
import { Providers } from './providers';
import { ErrorBoundary } from './ErrorBoundary';
import { router } from './router';

export default function App() {
  return (
    <ErrorBoundary>
      <Providers>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Providers>
    </ErrorBoundary>
  );
}
