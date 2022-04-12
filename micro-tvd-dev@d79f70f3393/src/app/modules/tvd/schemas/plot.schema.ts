import { ISchemaRaw } from '@shared/types/raw-schema.type';
import { convertObjSchemaResponse, Field } from '@cikrf/gas-components';
import { keyBy } from 'lodash';
import { EUserCommissionType, getUser, getUserCommissionType } from '@shared/utils/auth.utils';
import { IPlot } from '@/app/modules/tvd/types/plots.interface';
import { EPlotType } from '@/app/modules/tvd/constants/plots-type.enum';

type AttrsMap = {
  [K in keyof IPlot]?: Partial<Omit<Field.Raw, 'name'>>;
};

type PRecord<K extends PropertyKey, T> = {
  [P in K]?: T;
};

export const attrsByType: PRecord<EUserCommissionType, AttrsMap> = {
  [EUserCommissionType.IKSRF]: keyBy(
    [
      {
        name: 'name',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'number',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'plotsType',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'parentCommissionOrg',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'plotsCategory',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'voteStructure',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'initialVoterCount',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'regVoterCount',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'updateDateVoterCount',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'slicingRes',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'slicingResNum',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'slicingResDate',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'numerRes',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'numerResNum',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'numerResDate',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'electronicVoting',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'bulletinTreatment',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'qrCode',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'webCamera',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'onlineTranslation',
        createReadOnly: true,
        createHidden: true,
      },
    ],
    'name',
  ),
  [EUserCommissionType.TIK]: keyBy(
    [
      {
        name: 'name',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'number',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'plotsType',
        createReadOnly: true,
        createHidden: false,
      },
      {
        name: 'parentCommissionOrg',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'plotsCategory',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'voteStructure',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'initialVoterCount',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'regVoterCount',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'updateDateVoterCount',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'slicingRes',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'slicingResNum',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'slicingResDate',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'numerRes',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'numerResNum',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'numerResDate',
        createReadOnly: true,
        createHidden: true,
      },
      {
        name: 'electronicVoting',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'bulletinTreatment',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'qrCode',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'webCamera',
        createReadOnly: false,
        createHidden: false,
      },
      {
        name: 'onlineTranslation',
        createReadOnly: false,
        createHidden: false,
      },
    ],
    'name',
  ),
};

export const attrsByPlotType: PRecord<EPlotType, AttrsMap> = {
  [EPlotType.TEMPORARY]: {
    numerRes: {
      previewHidden: true,
      editHidden: true,
      createHidden: true,
      createReadOnly: true,
      previewReadOnly: true,
      editReadOnly: true,
    },
    numerResNum: {
      previewHidden: true,
      editHidden: true,
      createHidden: true,
      createReadOnly: true,
      previewReadOnly: true,
      editReadOnly: true,
    },
    numerResDate: {
      previewHidden: true,
      editHidden: true,
      createHidden: true,
      createReadOnly: true,
      previewReadOnly: true,
      editReadOnly: true,
    },
    commissionComposition: {
      previewHidden: true,
      editHidden: true,
      createHidden: true,
      createReadOnly: true,
      previewReadOnly: true,
      editReadOnly: true,
    },
  },
  [EPlotType.PERMANENT]: {
    numerRes: {
      mandatory: true,
    },
    numerResNum: {
      mandatory: true,
    },
    numerResDate: {
      mandatory: true,
    },
    commissionComposition: {
      previewHidden: false,
      editHidden: false,
      createHidden: true,
      createReadOnly: true,
      previewReadOnly: true,
      editReadOnly: true,
    },
  },
};

export const attrsByTypeAndPlotType: PRecord<EUserCommissionType, PRecord<EPlotType, AttrsMap>> = {
  [EUserCommissionType.IKSRF]: {
    [EPlotType.PERMANENT]: {
      parentCommissionOrg: {
        mandatory: true,
        editReadOnly: false,
      },
      numerRes: {
        mandatory: true,
        editReadOnly: false,
      },
      numerResNum: {
        mandatory: true,
        editReadOnly: false,
      },
      numerResDate: {
        mandatory: true,
        editReadOnly: false,
      },
      name: {
        mandatory: true,
        editReadOnly: false,
      },
    },
  },
  [EUserCommissionType.TIK]: {
    [EPlotType.TEMPORARY]: {
      parentCommissionOrg: {
        mandatory: true,
        editReadOnly: false,
      },
      plotsCategory: {
        mandatory: true,
        editReadOnly: false,
      },
      voteStructure: {
        mandatory: true,
        editReadOnly: false,
      },
      initialVoterCount: {
        mandatory: true,
        editReadOnly: false,
      },
      regVoterCount: {
        mandatory: true,
        editReadOnly: false,
      },
      slicingRes: {
        mandatory: true,
        editReadOnly: false,
      },
      slicingResNum: {
        mandatory: true,
        editReadOnly: false,
      },
      slicingResDate: {
        mandatory: true,
        editReadOnly: false,
      },
      name: {
        mandatory: true,
        editReadOnly: false,
      },
      electronicVoting: {
        mandatory: false,
        editReadOnly: false,
      },
      bulletinTreatment: {
        mandatory: false,
        editReadOnly: false,
      },
      qrCode: {
        mandatory: false,
        editReadOnly: false,
      },
      webCamera: {
        mandatory: false,
        editReadOnly: false,
      },
      onlineTranslation: {
        mandatory: false,
        editReadOnly: false,
      },
    },
    [EPlotType.PERMANENT]: {
      plotsCategory: {
        mandatory: true,
        editReadOnly: false,
      },
      voteStructure: {
        mandatory: true,
        editReadOnly: false,
      },
      initialVoterCount: {
        mandatory: true,
        editReadOnly: false,
      },
      regVoterCount: {
        mandatory: true,
        editReadOnly: false,
      },
      slicingRes: {
        mandatory: true,
        editReadOnly: false,
      },
      slicingResNum: {
        mandatory: true,
        editReadOnly: false,
      },
      slicingResDate: {
        mandatory: true,
        editReadOnly: false,
      },
      name: {
        mandatory: true,
        editReadOnly: true,
      },
      electronicVoting: {
        mandatory: false,
        editReadOnly: false,
      },
      bulletinTreatment: {
        mandatory: false,
        editReadOnly: false,
      },
      qrCode: {
        mandatory: false,
        editReadOnly: false,
      },
      webCamera: {
        mandatory: false,
        editReadOnly: false,
      },
      onlineTranslation: {
        mandatory: false,
        editReadOnly: false,
      },
    },
  },
};

const SCHEMA: ISchemaRaw<IPlot> = {
  groupList: [
    {
      view: 'cardgroup',
      name: 'base-info',
      label: 'Основные сведения',
      attrList: [
        'name',
        'number',
        'plotsType',
        'parentCommissionOrg',
        'voteStructure',
        'plotsCategory',
        'initialVoterCount',
        'regVoterCount',
        'updateDateVoterCount',
        'commissionComposition',
      ],
    },
    {
      view: 'cardgroup',
      name: 'numberingDocument',
      label: 'Документ о нумерации',
      attrList: ['numerRes', 'numerResNum', 'numerResDate'],
    },
    {
      view: 'cardgroup',
      name: 'slicingDoc',
      label: 'Документ о нарезке',
      attrList: ['slicingRes', 'slicingResNum', 'slicingResDate'],
    },
    {
      view: 'cardgroup',
      name: 'equipment',
      label: 'Оснащение участка',
      attrList: ['webCamera', 'onlineTranslation', 'qrCode', 'electronicVoting', 'bulletinTreatment'],
    },
  ],
  attrList: [
    {
      name: 'name',
      view: Field.View.string,
      type: Field.Type.String,
      label: 'Наименование участка',
      mandatory: true,
      editReadOnly: true,
    },
    {
      name: 'number',
      view: Field.View.int,
      type: Field.Type.Int,
      label: 'Номер участка',
      mandatory: true,
      editReadOnly: true,
    },
    {
      name: 'plotsType',
      type: Field.Type.String,
      view: Field.View.select,
      label: 'Тип избирательного участка',
      mandatory: true,
      editReadOnly: true,
      enum: [
        {
          value: 'Постоянный',
          key: 'permanent',
        },
        {
          value: 'Временный',
          key: 'temporary',
        },
      ],
    },
    {
      name: 'parentCommissionOrg',
      type: Field.Type.String,
      view: Field.View.asyncSelect,
      label: 'Вышестоящая избирательная комиссия',
      props: {
        url: window.env.COMMISSIONS_REGISTRY_HOST,
        filter: 'commissionType.VNKOD==4 and status==ACTIVE',
        schema: 'CommissionComposition',
        idField: 'commissionOrg.id',
        labelField: 'commissionOrg.commissionName',
        outgoingLink: true,
      },
      mandatory: true,
      editReadOnly: true,
    },
    {
      name: 'commissionComposition',
      type: Field.Type.String,
      view: Field.View.asyncSelect,
      label: 'Состав комиссии',
      props: {
        url: window.env.COMMISSIONS_REGISTRY_HOST,
        schema: 'CommissionComposition',
        idField: 'id',
        labelField: 'commissionName',
        outgoingLink: true,
      },
      mandatory: false,
      editReadOnly: true,
    },
    {
      name: 'voteStructure',
      type: Field.Type.String,
      view: Field.View.asyncSelect,
      label: 'Контингент жителей на участке',
      props: {
        schema: 'NSI97',
        idField: 'VNKOD',
        labelField: 'ZNACHATR',
        outgoingLink: true,
      },
      mandatory: true,
      editReadOnly: true,
    },
    {
      name: 'plotsCategory',
      type: Field.Type.String,
      view: Field.View.asyncSelect,
      label: 'Категория избирательного участка',
      props: {
        schema: 'NSI116',
        idField: 'VNKOD',
        labelField: 'ZNACHATR',
        outgoingLink: true,
      },
      mandatory: true,
      editReadOnly: true,
    },
    {
      name: 'initialVoterCount',
      view: Field.View.int,
      type: Field.Type.Int,
      label: 'Число избирателей на момент формирования',
      mandatory: true,
      editReadOnly: true,
    },
    {
      name: 'regVoterCount',
      view: Field.View.int,
      type: Field.Type.Int,
      label: 'Число избирателей текущее',
      mandatory: true,
      editReadOnly: true,
    },
    {
      name: 'updateDateVoterCount',
      view: Field.View.date,
      type: Field.Type.Date,
      label: 'Дата актуализации в РУИП',
      mandatory: true,
      editReadOnly: true,
      createReadOnly: true,
      previewReadOnly: true,
    },
    {
      name: 'numerRes',
      label: 'Наименование документа',
      type: Field.Type.String,
      view: Field.View.asyncSelect,
      props: {
        schema: 'NSI945',
        idField: 'VNKOD',
        labelField: 'ZNACHATR',
        outgoingLink: true,
      },
      editReadOnly: true,
    },
    {
      name: 'numerResNum',
      view: Field.View.int,
      type: Field.Type.Int,
      label: 'Номер документа',
      editReadOnly: true,
    },
    {
      name: 'numerResDate',
      view: Field.View.date,
      type: Field.Type.Date,
      label: 'Дата',
      editReadOnly: true,
    },
    {
      name: 'slicingRes',
      label: 'Наименование документа',
      mandatory: false,
      type: Field.Type.String,
      view: Field.View.asyncSelect,
      props: {
        schema: 'NSI945',
        idField: 'VNKOD',
        labelField: 'ZNACHATR',
        outgoingLink: true,
      },
      editReadOnly: true,
    },
    {
      name: 'slicingResNum',
      view: Field.View.int,
      type: Field.Type.Int,
      label: 'Номер документа',
      mandatory: false,
      editReadOnly: true,
    },
    {
      name: 'slicingResDate',
      view: Field.View.date,
      type: Field.Type.Date,
      label: 'Дата',
      mandatory: false,
      editReadOnly: true,
    },
    {
      name: 'webCamera',
      view: Field.View.int,
      type: Field.Type.Int,
      label: 'Количество web-камер',
      editReadOnly: true,
    },
    {
      name: 'onlineTranslation',
      type: Field.Type.Boolean,
      view: Field.View.select,
      enum: [
        {
          value: 'Да',
          key: true,
        },
        {
          value: 'Нет',
          key: false,
        },
      ],
      label: 'On-line трансляции',
      editReadOnly: true,
    },
    {
      name: 'qrCode',
      type: Field.Type.Boolean,
      view: Field.View.select,
      enum: [
        {
          value: 'Да',
          key: true,
        },
        {
          value: 'Нет',
          key: false,
        },
      ],
      label: 'Использование QR-кода',
      editReadOnly: true,
    },
    {
      name: 'electronicVoting',
      view: Field.View.boolean,
      type: Field.Type.Boolean,
      label: 'КЭГ',
      editReadOnly: true,
    },
    {
      name: 'bulletinTreatment',
      view: Field.View.boolean,
      type: Field.Type.Boolean,
      label: 'КОИБ',
      editReadOnly: true,
    },
  ],
  grid: {
    name: {
      col: 12,
    },
    number: {
      col: 6,
    },
    plotsType: {
      col: 6,
    },
    parentCommissionOrg: {
      col: 12,
    },
    voteStructure: {
      col: 6,
    },
    plotsCategory: {
      col: 6,
    },
    initialVoterCount: {
      col: 4,
    },
    regVoterCount: {
      col: 4,
    },
    updateDateVoterCount: {
      col: 4,
    },
    numerRes: {
      col: 4,
    },
    numerResNum: {
      col: 4,
    },
    numerResDate: {
      col: 4,
    },
    slicingRes: {
      col: 4,
    },
    slicingResNum: {
      col: 4,
    },
    slicingResDate: {
      col: 4,
    },
    webCamera: {
      col: 4,
    },
    onlineTranslation: {
      col: 4,
    },
    qrCode: {
      col: 4,
    },
    electronicVoting: {
      col: 2,
    },
    bulletinTreatment: {
      col: 1,
    },
  },
};

export const stdEditSchema: ISchemaRaw<any> = {
  groupList: [
    {
      view: 'cardgroup',
      name: 'base-info',
      label: 'Выбор СТД для работы',
      attrList: ['stdIdIn', 'stdIdOut'],
    },
  ],
  attrList: [
    {
      name: 'stdIdIn',
      label: 'Выбор основного СТД',
      type: Field.Type.String,
      view: Field.View.asyncSelect,
      props: {
        schema: 'NSI940',
        idField: 'STDID',
        labelField: 'NAME',
        filter: 'isRetro==false',
      },
    },
    {
      name: 'stdIdOut',
      label: 'Выбор принимающего СТД',
      type: Field.Type.String,
      view: Field.View.asyncSelect,
      props: {
        schema: 'NSI940',
        idField: 'STDID',
        labelField: 'NAME',
        filter: 'isRetro==false',
      },
    },
  ],
  grid: {
    stdIdIn: {
      col: 6,
    },
    stdIdOut: {
      col: 6,
    },
  },
};

export function getPlotSchemaByPlotsType(plotType: EPlotType) {
  const user = getUser();
  const type = getUserCommissionType(user);
  const SUBJCOD = user?.profile.SUBJCOD;
  const STDID = user?.profile.std;

  const groupList = SCHEMA.groupList.map((group) => {
    // todo научить ФГ автоматически скрывать пустые группы
    if (plotType === EPlotType.TEMPORARY && group.name === 'numberingDocument') {
      return {
        ...group,
        visible: false,
      };
    }
    return group;
  });

  const attrList = SCHEMA.attrList.map((oldAttr) => {
    const attr: Field.Raw = {
      ...oldAttr,
      ...attrsByType[type]?.[oldAttr.name],
      ...attrsByPlotType[plotType]?.[oldAttr.name],
      ...attrsByTypeAndPlotType[type]?.[plotType]?.[oldAttr.name],
    };

    if (SUBJCOD && STDID && attr.name === 'parentCommissionOrg') {
      attr.props!.filter =
        type === EUserCommissionType.IKSRF
          ? `subjectRF.SUBJCOD==${SUBJCOD} and commissionType.VNKOD==4 and status==ACTIVE`
          : `std.STDID==${STDID} and commissionType.VNKOD==4 and status==ACTIVE`;
    }

    return attr;
  });

  return convertObjSchemaResponse({ ...SCHEMA, groupList, attrList });
}

export { SCHEMA };
