import { Field, IBaseTableColumn } from '@cikrf/gas-components';

export const territoriesTableColumns: IBaseTableColumn[] = [
  {
    name: 'name',
    title: 'Территории и участки',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'number',
    title: 'Номер',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'std',
    title: 'Номер СТД',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
];
