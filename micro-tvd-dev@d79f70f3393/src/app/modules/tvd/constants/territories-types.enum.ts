export enum ETerritoryType {
  STRING = 'string',
  BOOLEAN = 'boolean',
  INTEGER = 'integer',
  FLOAT = 'float',
  DATE = 'date',
  RANGE = 'range',
}

export const territoriesTypes: readonly { name: string; value: ETerritoryType }[] = Object.freeze([
  {
    name: 'Число',
    value: ETerritoryType.INTEGER,
  },
  {
    name: 'Строка',
    value: ETerritoryType.STRING,
  },
  {
    name: 'Булевое значение',
    value: ETerritoryType.BOOLEAN,
  },
  {
    name: 'C плавающей точкой',
    value: ETerritoryType.FLOAT,
  },
  {
    name: 'Дата',
    value: ETerritoryType.DATE,
  },
  {
    name: 'Диапазон',
    value: ETerritoryType.RANGE,
  },
]);
