import('./bootstrap').catch((err) => console.error(err));

// @ts-ignore TODO: declare import
import('auth/main')
  .then((Auth) => {
    const auth = Auth.default;
    auth.checkLoginUser();
  })
  .catch((e) => {
    console.warn(`[candidates/App] - can't import Auth from 'auth/main'`, e);
  });
