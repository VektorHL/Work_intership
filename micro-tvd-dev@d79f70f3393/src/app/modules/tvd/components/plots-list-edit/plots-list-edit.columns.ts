import { Field, IBaseTableColumn } from '@cikrf/gas-components';

export const columns: IBaseTableColumn[] = [
  {
    name: 'name',
    title: 'Номер участка',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'bulletinTreatment',
    title: 'КОИБ',
    type: Field.Type.Boolean,
    hidden: false,
  },
  {
    name: 'electronicVoting',
    title: 'КЭГ',
    type: Field.Type.Boolean,
    hidden: false,
  },
  {
    name: 'qrCode',
    title: 'Использование QR-кода',
    type: Field.Type.Boolean,
    hidden: false,
  },
  {
    name: 'onlineTranslation',
    title: 'On-line трансляции',
    type: Field.Type.Boolean,
    hidden: false,
  },
];
