import { Field, IBaseTableColumn } from '@cikrf/gas-components';

export const tableColumns: IBaseTableColumn[] = [
  {
    name: 'name',
    title: 'Наименование избирательной кампании',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'date',
    title: 'Дата',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'isActive',
    title: 'Статус',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
];

export const tableData = [
  {
    name: 'Выборы депутатов Государственной Думы Федерального Собрания Российской Федерации 7 созыва',
    date: '18.09.2016',
    status: 'Завершена',
  },
  {
    name: 'Выборы главы администрации Тамбовской области',
    date: '22.11.2021',
    status: 'Завершена',
  },
];
