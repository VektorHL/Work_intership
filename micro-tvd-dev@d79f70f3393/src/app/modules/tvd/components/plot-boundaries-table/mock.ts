import { Field, IBaseTableColumn } from '@cikrf/gas-components';

export const tableColumns: IBaseTableColumn[] = [
  {
    name: 'subjectRF',
    title: 'Субъект РФ',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'street',
    title: 'Населенный пункт, улица',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
  {
    name: 'house',
    title: 'Дом,корп.кв',
    hidden: false,
    type: Field.Type.String,
    sortable: true,
  },
];

export const tableData = [
  {
    subjectRF: 'Тамбовская область',
    address: 'Ленинский район города Тамбова',
    street: 'ул. М.Горького',
    house: 'д. 53-91',
  },
  {
    subjectRF: 'Тамбовская область',
    address: 'Ленинский район города Тамбова',
    street: 'ул. М.Горького',
    house: 'д. 68-110',
  },
  {
    subjectRF: 'Тамбовская область',
    address: 'Ленинский район города Тамбова',
    street: 'улица: ул. Интернациональная',
    house: 'д. 17-47/3',
  },
  {
    subjectRF: 'Тамбовская область',
    address: 'Ленинский район города Тамбова',
    street: 'улица: ул. Интернациональная',
    house: 'д. 50-60',
  },
];
