import { Middleware } from '@reduxjs/toolkit';

export const errorMiddleware: Middleware = () => (next) => (action: any) => {
  if (action.type.endsWith('/rejected')) {
    const payload = action.payload;

    if (payload) {
      console.error(
        `[ERROR] Status: ${payload.status} | Code: ${payload.code} | Message: ${payload.message}`
      );
    }
  }

  return next(action);
};
