import { TRPCLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';
import { toast } from 'sonner';
import type { AppRouter } from '@/server';

export const errorLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        error(err) {
          const message = err.message || 'An unknown error occurred';
          const status = err.data?.httpStatus;

          switch (status) {
            case 307:
              toast.error(`Redirect: ${message}`);
              break;
            case 401:
              toast.error(`Unauthorized: ${message}`);
              break;
            case 404:
              toast.error(`Not Found: ${message}`);
              break;
            case 500:
              toast.error(`Internal Server Error: ${message}`);
              break;
            default:
              // toasts for specific client/server errors only
              if (err.data?.code) {
                toast.error(message);
              }
              break;
          }
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });
      return unsubscribe;
    });
  };
};