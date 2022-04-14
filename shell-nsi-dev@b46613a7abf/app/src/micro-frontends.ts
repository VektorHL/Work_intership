import { MicroFrontend } from 'ng-module-federation';

export const microFrontends: MicroFrontend[] = [
  {
    remoteEntry: window.env.MF_NSI_HANDBOOKS,
    remoteName: 'handbooks',
    routePath: 'nsi',
  },
  {
    remoteEntry: window.env.MF_CAMPAIGNS,
    remoteName: 'campaigns',
    routePath: 'paip/main',
  },
  {
    remoteEntry: window.env.MF_COMMISSIONS,
    remoteName: 'commissions',
    routePath: 'paip/commissions',
  },
  {
    remoteEntry: window.env.MF_PAIP_LAW,
    remoteName: 'law',
    routePath: 'paip/law',
  },
  {
    remoteEntry: window.env.MF_PAIP_CALENDAR,
    remoteName: 'calendar',
    routePath: 'paip/calendar',
  },
  {
    remoteEntry: window.env.MF_PAIP_CERTIFICATE,
    remoteName: 'certificate',
    routePath: 'paip/certificate',
  },
  {
    remoteEntry: window.env.MF_CANDIDATES,
    remoteName: 'candidates',
    routePath: 'paip/main',
  },
  {
    remoteEntry: window.env.MF_TVD,
    remoteName: 'tvd',
    routePath: 'paip/tvd',
  },
];
