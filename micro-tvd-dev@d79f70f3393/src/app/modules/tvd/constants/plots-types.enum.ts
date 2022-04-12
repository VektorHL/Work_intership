export enum PlotsType {
  STRING = 'string',
  BOOLEAN = 'boolean',
  INTEGER = 'integer',
  FLOAT = 'float',
  DATE = 'date',
  RANGE = 'range',
}

export const plotsTypes: readonly { name: string; value: PlotsType }[] = Object.freeze([
  {
    name: 'Число',
    value: PlotsType.INTEGER,
  },
  {
    name: 'Строка',
    value: PlotsType.STRING,
  },
  {
    name: 'Булевое значение',
    value: PlotsType.BOOLEAN,
  },
  {
    name: 'C плавающей точкой',
    value: PlotsType.FLOAT,
  },
  {
    name: 'Дата',
    value: PlotsType.DATE,
  },
  {
    name: 'Диапазон',
    value: PlotsType.RANGE,
  },
]);
