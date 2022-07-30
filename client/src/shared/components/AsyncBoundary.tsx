import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ComponentProps, Suspense, useCallback } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

interface AsyncBoundaryProps extends Omit<ErrorBoundaryProps, 'fallbackRender'> {
  pendingFallback: ComponentProps<typeof Suspense>['fallback'];
  rejectedFallback?: ErrorBoundaryProps['fallbackRender'];
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function AsyncBoundary({ pendingFallback, rejectedFallback, children }: AsyncBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  const resetHandler = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <ErrorBoundary fallbackRender={rejectedFallback || ErrorFallback} onReset={resetHandler}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
