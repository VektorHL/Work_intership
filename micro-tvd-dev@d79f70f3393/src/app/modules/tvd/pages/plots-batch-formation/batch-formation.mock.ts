import { convertObjSchemaResponse } from '@cikrf/gas-components';
import { EUserCommissionType } from '@shared/utils/auth.utils';
import { Schema } from '@cikrf/gas-components/lib/modules/form-generator/models/base';
import { EPlotType } from '@/app/modules/tvd/constants/plots-type.enum';
import TIK from '../../schemas/plots-batch-formation.schema.tik.json';
import IKSRF from '../../schemas/plots-batch-formation.schema.iksrf.json';
import { IPlot } from '@/app/modules/tvd/types/plots.interface';

export interface IPlotParams {
  start: string;
  end: string;
  number: string;
  numerRes: IPlot['numerRes'];
  numerResNum: string;
  numerResDate: string;
  parentCommissionOrg: IPlot['parentCommissionOrg'];
  plotsType: EPlotType;
}

export const schemaByType = {
  [EUserCommissionType.IKSRF]: IKSRF,
  [EUserCommissionType.TIK]: TIK,
};

export function getPlotBatchSchemaByUserCommissionType(type: EUserCommissionType) {
  let schema: Schema.MetaClassSchemaRaw = schemaByType[EUserCommissionType.TIK];

  if (EUserCommissionType.IKSRF === type || EUserCommissionType.TIK === type) {
    schema = schemaByType[type];
  }

  return convertObjSchemaResponse(schema);
}
