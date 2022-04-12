/*
 * Тип участка (permanent -постоянный/temporary- временный)
 * */
export enum EPlotType {
  PERMANENT = 'permanent',
  TEMPORARY = 'temporary',
}

export const plotTypeMap = Object.freeze({
  [EPlotType.PERMANENT]: 'Постоянный',
  [EPlotType.TEMPORARY]: 'Временный',
} as const);
