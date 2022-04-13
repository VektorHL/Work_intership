/**
    * Файл новигации для связки URL-ссылок и пунктов меню из главного (вроде единственного) меню layout
    * Логичн, что дашбордЮ который тут первый - одна из моих страниц, по дефолту там  "dashboard works!"
    *
    */

import { GasIcon } from '@cikrf/gas-ui-kit';
import { NavigatorMenu } from '@interfaces/navigator-menu';
import { ENavigationMenuItems } from './constants/navigation-menu-items.enum';

export const navigatorMenuConfig: NavigatorMenu = {
  subtitle: 'ЦИФРОВАЯ ПЛАТФОРМА',
  items: [
    {
      title: 'Рабочий стол',
      name: 'my-dashboard',  // имя из app-routing; поле name
      route: '/not-really-my-dashboard',  // URL-ссылка в в строке поиска в app-routing; поле path
      icon: GasIcon.GasNavigation.NavigationHome,
    },
    // {
    //   title: 'Календарь',
    //   route: '/main',
    //   name: 'calendar',
    //   icon: GasIcon.Common.Event,
    //   childs: [
    //     {
    //       title: 'Планы',
    //       name: 'plans',
    //       route: '/main/plans',
    //     },
    //     {
    //       title: 'Задачи',
    //       name: 'tasks',
    //       route: '/main/tasks',
    //     },
    //   ],
    // },
    {
      title: 'НСИ',
      route: '/nsi',
      icon: GasIcon.GasNavigation.NavigationNci,
      name: 'nsi',
      childs: [
        {
          title: 'Справочники',
          name: 'handbooks',
          icon: GasIcon.Common.KnowledgeBase,
          route: '/nsi/handbooks',
          childs: [
            {
              title: 'Вид состава региональных групп',
              name: 'handbooks-list',
              icon: GasIcon.Actions.Info,
              route: '/nsi/handbooks/list',
            },
          ],
        },
        {
          title: 'Заявки на изменение справочников',
          name: 'application',
          icon: GasIcon.Actions.Files,
          route: '/nsi/application',
        },
        {
          title: 'Журнал изменений справочников',
          name: 'log',
          icon: GasIcon.Common.Reminder,
          route: '/nsi/log',
        },
      ],
    },
    {
      title: 'ПАИП',
      route: '/paip',
      icon: GasIcon.GasNavigation.NavigationPaip,
      name: 'paip',
      childs: [
        {
          title: 'Право',
          name: 'law',
          icon: GasIcon.Common.Priority,
          route: '/paip/law',
        },
        {
          title: 'Избирательные кампании',
          name: 'campaigns',
          icon: GasIcon.Common.Metrics,
          route: '/paip/main/authorities',
        },
        {
          title: 'Избирательные комиссии',
          name: 'commissions',
          icon: GasIcon.Common.People,
          route: '/paip/commissions/commissions',
        },
        {
          title: 'Члены ИК',
          name: 'commissions-members',
          icon: GasIcon.Common.People,
          route: '/paip/commissions/commissions-members',
        },
        {
          title: 'Кандидаты и депутаты',
          name: 'candidates',
          icon: GasIcon.Navigation.Electors,
          route: '/paip/main/candidates',
        },
        {
          title: 'Календарные планы',
          name: 'calendar',
          icon: GasIcon.Common.Event,
          route: '/paip/calendar',
        },
        {
          title: 'Контроль избирательных фондов',
          name: 'funds',
          icon: GasIcon.Actions.InfoReverse,
          route: '/paip/funds',
        },
        {
          title: 'Картография',
          name: 'cartography',
          icon: GasIcon.Common.StandartObjects,
          route: '/paip/cartography',
        },
        {
          title: 'Территории и участки',
          name: 'tvd',
          icon: GasIcon.Menu.Checkin,
          route: '/paip/tvd/tvd/plots',
        },
        {
          title: 'Удостоверения',
          name: 'certificate',
          icon: GasIcon.Navigation.IdCard,
          route: '/paip/certificate',
        },
      ],
    },
    {
      title: 'РУИП',
      route: '/ruip',
      icon: GasIcon.GasNavigation.NavigationRuip,
      name: 'ruip',
    },
    {
      title: 'СПТК-ПЛ',
      route: '/sptk',
      icon: GasIcon.GasNavigation.NavigationSptkPl,
      name: 'sptk',
    },
    {
      title: 'ПВВ',
      route: '/pvv',
      icon: GasIcon.GasNavigation.NavigationPvv,
      name: 'pvv',
    },
    {
      title: 'ПД',
      route: '/pd',
      icon: GasIcon.GasNavigation.NavigationSed,
      name: 'pd',
    },
    {
      title: 'ПОК',
      route: '/pok',
      icon: GasIcon.GasNavigation.NavigationPok,
      name: 'pok',
    },
    {
      title: 'ИНП',
      route: '/inp',
      icon: GasIcon.GasNavigation.NavigationInp,
      name: 'pok',
    },
    // {
    //   title: 'Статистика',
    //   route: '/statistics',
    //   name: 'statistics',
    //   icon: GasIcon.Menu.Database,
    // },
    // {
    //   title: 'Роли и пользователи',
    //   route: '/people',
    //   name: 'people',
    //   icon: GasIcon.Menu.Company,
    // },
    // {
    //   title: 'Настройки',
    //   name: 'settings',
    //   route: '/settings',
    //   icon: GasIcon.Menu.Settings,
    // },
  ],
  bottomItems: [
    {
      name: ENavigationMenuItems.USER_INFO,
      title: JSON.parse(localStorage['arm_auth_user'] ?? '{}')?.profile?.name ?? '',
      icon: GasIcon.Common.User,
      callback: () => {
        console.log('in user-info bottom item');
      },
    },
  ],
};
