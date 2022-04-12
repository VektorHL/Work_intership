import { Field, IBaseTableColumn } from '@cikrf/gas-components';

export const columns: Array<IBaseTableColumn> = [
  {
    name: 'name',
    title: 'Наименование участка',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'std.STDID',
    title: 'Номер СТД',
    type: Field.Type.String,
    hidden: false,
  },
  // {
  //   name: 'hiddenColumn',
  //   title: '',
  //   type: Field.Type.String,
  //   hidden: false,
  // },
];
