enum FieldViewTypes {
  String = 'string',
  Int = 'int',
  Boolean = 'boolean',
  Date = 'date',
  Switcher = 'switcher',
  AsyncSelect = 'async-select',
  Select = 'select',
}
enum FieldDataTypes {
  String = 'string',
  Int = 'int',
  Boolean = 'boolean',
  Date = 'date',
}

export const Schema = {
  schema: 'Form',
  name: 'TerritoriesCreation',
  groupList: [
    {
      view: 'cardgroup',
      name: 'base-info',
      label: '',
      attrList: ['name', 'number', 'std'],
    },
  ],
  label: '',
  attrList: [
    {
      name: 'name',
      label: 'Наименование территории/участка',
      num: 1,
      type: FieldDataTypes.String,
      view: FieldViewTypes.String,
      createReadOnly: false,
      editReadOnly: true,
      hidden: true,
      readOnly: false,
      mandatory: true,
    },
    {
      name: 'number',
      label: 'Номер территории/участка',
      num: 2,
      type: FieldDataTypes.Int,
      view: FieldViewTypes.Int,
      createReadOnly: false,
      editReadOnly: true,
      hidden: false,
      readOnly: false,
      mandatory: true,
    },
    {
      name: 'std',
      label: 'Номер СТД',
      num: 3,
      type: FieldDataTypes.String,
      view: 'async-select',
      props: {
        schema: 'NSI940',
        idField: 'STDID',
        labelField: 'NAME',
      },
      mandatory: true,
    },
  ],
  grid: {
    name: {
      col: 6,
    },
    number: {
      col: 6,
    },
    std: {
      col: 12,
    },
  },
};
