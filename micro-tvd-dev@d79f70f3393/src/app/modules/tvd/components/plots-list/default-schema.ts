export const Schema = {
  schema: 'Form',
  name: 'PlotsSchema',
  groupList: [],
  label: '',
  attrList: [
    {
      name: 'name',
      label: 'Наименование территории/участка',
    },
    {
      name: 'regVoterCount',
      label: 'Текущее число избирателей',
    },
    {
      name: 'updateDateVoterCount',
      label: 'Дата актуализации числа избирателей',
    },
    {
      name: 'slicingResDate',
      label: 'Дата актуализации границ',
    },
    {
      name: 'plotsType',
      label: 'Тип участка',
    },
    {
      name: 'technical',
      label: 'Техническое оснащение',
    },
    {
      name: 'isActive',
      label: 'Статус',
    },
  ],
};
