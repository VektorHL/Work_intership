export interface ITerritory {
  /**
   * Уникальный идентификатор Условия проведения выборов (референдума)
   */
  id: string;

  /**
   * Наименование территории/участка
   */
  name: string;

  /**
   * Номер территории/участка
   */
  number: number;

  /**
   * Субъект РФ территории
   */
  subjectRF: TerritoriesSubjRF;

  /**
   * СТД, которому принадлежит запись
   */
  std: TerritoriesStd;
}

export interface TerritoriesStd {
  STDID: string;
}

export interface TerritoriesSubjRF {
  SUBJCOD: string;
}

export interface TerritoriesValue {
  /**
   * Строковое значение
   */
  string?: string;

  /**
   * Целое числовое значение
   */
  integer?: number;

  /**
   * Дробное числовое значение
   */
  float?: number;

  /**
   * Значение даты
   */
  date?: string;

  /**
   * Логическое значение
   */
  boolean?: boolean;

  /**
   * Диапазон числовых значений
   */
  range?: number[];

  /**
   * Порядок позиции в коллекции значений
   */
  order?: number;
}
