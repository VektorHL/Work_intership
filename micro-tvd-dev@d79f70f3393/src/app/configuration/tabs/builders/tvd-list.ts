import { IBaseNavigationTabs } from '@cikrf/gas-components';

export const tvdListTabsBuilder = (): Array<IBaseNavigationTabs> => {
  return [
    {
      title: 'Участки',
      route: `./plots`,
      name: 'candidate_card_personal_data',
    },
    {
      title: 'Территории',
      route: `./tvd-territories`,
      name: 'candidate_card_income',
    },
  ];
};
