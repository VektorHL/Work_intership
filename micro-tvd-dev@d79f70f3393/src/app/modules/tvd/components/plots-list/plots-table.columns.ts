import { Field, IBaseTableColumn } from '@cikrf/gas-components';

export const plotsTableColumns: IBaseTableColumn[] = [
  {
    name: 'name',
    title: 'Территории и участки',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'isAllowedStd',
    title: '',
    hidden: false,
    type: Field.Type.String,
  },
  {
    name: 'std',
    title: 'Номер СТД',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'regVoterCount',
    title: 'Текущее число избирателей',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'updateDateVoterCount',
    title: 'Дата актуализации числа избирателей',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'slicingResDate',
    title: 'Дата актуализации границ',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'plotsType',
    title: 'Тип участка',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'technical',
    title: 'Техническое оснащение',
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
