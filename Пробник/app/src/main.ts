import { loadRemoteEntry, loadRemoteModule } from '@angular-architects/module-federation';
import EventBus from '@devsun/utility-event-bus';

import { microFrontends } from './micro-frontends';

// TODO может вынести декларацию топиков в файл
window.EventBus = new EventBus();
window.EventBus.addTopic('header');

console.log('window.env.MF_AUTH ', window.env.MF_AUTH);
loadRemoteModule({
  remoteEntry: window.env.MF_AUTH,
  remoteName: 'auth',
  exposedModule: `./main`,
})
  .then((authModule) => {
    console.log('OK', authModule);
    const authService = authModule.default;
    // FIXME TODO дичь которую, возможно, нужно переиграть
    window.authService = authService;
  })
  .catch((err) => {
    console.error('Ошибка загрузки микрофронта авторизации');
    console.error(err);
    throw err;
  })
  .then(() => {
    const { authService } = window;
    return authService.checkLoginUser();
  })
  .then(() => {
    const { authService } = window;
    console.log('Current user', authService.user);
  })
  .catch((err) => {
    console.error('Ошибка авторизации');
    console.error(err);
    throw err;
  })
  .then(() => {
    return Promise.all(
      microFrontends.map((mfe) => {
        return loadRemoteEntry(mfe.remoteEntry, mfe.remoteName).catch((err) =>
          console.error(`MF ${mfe.remoteEntry} failed to load`, err),
        );
      }),
    );
  })
  .then(() => import('./bootstrap'))
  .catch((err) => {
    console.error(err);
  });
