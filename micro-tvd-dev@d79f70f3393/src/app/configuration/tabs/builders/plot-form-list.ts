import { IBaseNavigationTabs } from '@cikrf/gas-components';

export const plotFormListTabsBuilder = (): Array<IBaseNavigationTabs> => {
  return [
    {
      title: 'Основные сведения',
      route: `basic`,
      name: 'basic',
    },
    {
      title: 'Границы участка',
      route: `boundaries`,
      name: 'boundaries',
    },
    {
      title: 'Участие в выборах',
      route: `participation`,
      name: 'participation',
    },
  ];
};
