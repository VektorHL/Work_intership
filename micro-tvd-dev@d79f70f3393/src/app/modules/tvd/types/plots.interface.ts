import { BaseNSI } from '@cikrf/gas-components';
import { EPlotType } from '@/app/modules/tvd/constants/plots-type.enum';

export interface IPlot {
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
  subjectRF: PlotsSubjRF;

  /**
   * Категория избирательного участка
   */
  plotsCategory: PlotsVNKOD;

  /**
   * Тип участка (1 -постоянный/2- временный)
   */
  plotsType: EPlotType;

  /**
   * Вышестоящая комиссия
   */
  parentCommissionOrg: BaseNSI<'id'>;

  commissionComposition: BaseNSI<'id'>;

  /**
   * СТД, которому принадлежит запись
   */
  std: PlotsStd;

  /**
   * Контингент жителей на участке
   */
  voteStructure: PlotsVNKOD;

  /**
   * Дата актуализации сведений о числе избирателей
   */
  updateDateVoterCount: string;

  /**
   * Число избирателей на момент формирования участка
   */
  initialVoterCount: number;

  /**
   * Текущее число избирателей
   */
  regVoterCount: number;

  /**
   * Документ о нумерации
   */
  numerRes: BaseNSI<'VNKOD'>;

  /**
   * Номер документа о нумерации
   */
  numerResNum: number;

  /**
   * Дата документа о нумерации
   */
  numerResDate: string;

  /**
   * Документ о нарезке
   */
  slicingRes: BaseNSI<'VNKOD'>;

  /**
   * Номер документа о нарезке
   */
  slicingResNum: number;

  /**
   * Дата документа о нарезке
   */
  slicingResDate: string;

  /**
   * On-line трансляция
   */
  onlineTranslation: boolean;

  /**
   * Web-камеры
   */
  webCamera: number;

  /**
   * QR-код
   */
  qrCode: boolean;

  /**
   * КЭГ
   */
  electronicVoting: boolean;

  /**
   * КОИБ
   */
  bulletinTreatment: boolean;

  modified?: number;

  /**
   * Признак действующего участка
   */
  isActive?: boolean;
}

export interface PlotsStd {
  STDID: string;
}

export interface PlotsSubjRF {
  SUBJCOD: string;
}

export interface PlotsVNKOD {
  VNKOD: string;
}

export interface PlotsValue {
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
