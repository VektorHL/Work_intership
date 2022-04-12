import { ITabsConfig } from '@cikrf/gas-components';
import { tvdListTabsBuilder } from '@config/tabs/builders/tvd-list';

/**
 * Для общего механизма используется такой конфиг, где
 * в кач-ве ключа используется data.name соответствующего роута,
 * а в кач-ве значения ф-ия выдающая актуальные табы, пример ф-ии выше
 */
export const tabsConfig: ITabsConfig = {
  // Карточка кандидата
  personal_data: tvdListTabsBuilder,
  income: tvdListTabsBuilder,
  relatives: tvdListTabsBuilder,
};

/**
 * Для дальнейшей работы нужно просто заполнить соответсвующим образом
 * конфиг для разных роутов и все ( а еше лучше разнести билдеры по разным файлам )
 */
