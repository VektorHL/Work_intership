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
    routePath: 'paip',
  },
  {
    remoteEntry: window.env.MF_COMMISSIONS,
    remoteName: 'commissions',
    routePath: 'paip',
  },
  {
    remoteEntry: window.env.MF_PAIP_LAW,
    remoteName: 'law',
    routePath: 'paip',
  },
  {
    remoteEntry: window.env.MF_CANDIDATES,
    remoteName: 'candidates',
    routePath: 'paip',
  },
  {
    remoteEntry: window.env.MF_TVD,
    remoteName: 'tvd',
    routePath: 'paip',
  },
];
