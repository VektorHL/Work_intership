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
      attrList: ['subjectRF'],
    },
  ],
  label: '',
  attrList: [
    {
      name: 'subjectRF',
      label: 'Субъект РФ',
      type: FieldDataTypes.String,
      view: FieldViewTypes.AsyncSelect,
      num: 4,
      hidden: true,
      props: {
        schema: 'NSI706',
        idField: 'SUBJCOD',
        labelField: 'NAMATE',
      },
      createReadOnly: true,
      editReadOnly: true,
      readOnly: true,
      mandatory: false,
    },
  ],
  grid: {
    subjectRF: {
      col: 12,
    },
  },
};
