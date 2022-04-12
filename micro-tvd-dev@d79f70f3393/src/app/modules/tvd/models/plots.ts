import { BaseNSI } from '@cikrf/gas-components';
import { IPlot, PlotsStd, PlotsSubjRF, PlotsVNKOD } from '@/app/modules/tvd/types/plots.interface';
import { EPlotType } from '@/app/modules/tvd/constants/plots-type.enum';

export class Plot implements IPlot {
  public id: string;

  public name: string;

  public number: number;

  public subjectRF: PlotsSubjRF;

  public territoryType: number;

  public plotsCategory: PlotsVNKOD;

  public plotsType: EPlotType;

  public parentCommissionOrg: BaseNSI<'id'>;

  public commissionComposition: BaseNSI<'id'>;

  public std: PlotsStd;

  public voteStructure: PlotsVNKOD;

  public updateDateVoterCount: string;

  public initialVoterCount: number;

  public regVoterCount: number;

  public numerRes: BaseNSI<'VNKOD'>;

  public numerResNum: number;

  public numerResDate: string;

  public slicingRes: BaseNSI<'VNKOD'>;

  public slicingResNum: number;

  public slicingResDate: string;

  public webCamera: number;

  public onlineTranslation: boolean;

  public qrCode: boolean;

  public electronicVoting: boolean;

  public bulletinTreatment: boolean;

  public isActive: boolean;

  public constructor(payload: Plot) {
    this.id = payload.id;
    this.name = payload.name;
    this.number = payload.number;
    this.subjectRF = payload.subjectRF;
    this.territoryType = payload.territoryType;
    this.plotsCategory = payload.plotsCategory;
    this.plotsType = payload.plotsType;
    this.parentCommissionOrg = payload.parentCommissionOrg;
    this.std = payload.std;
    this.voteStructure = payload.voteStructure;
    this.updateDateVoterCount = payload.updateDateVoterCount;
    this.initialVoterCount = payload.initialVoterCount;
    this.regVoterCount = payload.regVoterCount;
    this.numerRes = payload.numerRes;
    this.numerResNum = payload.numerResNum;
    this.numerResDate = payload.numerResDate;
    this.slicingRes = payload.slicingRes;
    this.slicingResNum = payload.slicingResNum;
    this.slicingResDate = payload.slicingResDate;
    this.webCamera = payload.webCamera;
    this.onlineTranslation = payload.onlineTranslation;
    this.qrCode = payload.qrCode;
    this.electronicVoting = payload.electronicVoting;
    this.bulletinTreatment = payload.bulletinTreatment;
    this.isActive = payload.isActive;
    this.commissionComposition = payload.commissionComposition;
  }
}
