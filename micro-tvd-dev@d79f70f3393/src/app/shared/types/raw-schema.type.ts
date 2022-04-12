import { Field, Group, Meta, Schema } from '@cikrf/gas-components';

export interface IFieldRaw<T> extends Field.Raw {
  name: Extract<keyof T, string>;
  view: Field.View;
  type: Field.Type;
}

export interface IGroupRaw<T> extends Group.Raw {
  attrList: Extract<keyof T, string>[];
}

export type IGridRaw<T> = Meta.FormGeneratorGrid & {
  [K in Extract<keyof T, string>]?: Meta.FormGeneratorGrid[string];
};

export interface ISchemaRaw<Model> extends Schema.MetaClassSchemaRaw {
  groupList: IGroupRaw<Model>[];
  attrList: IFieldRaw<Model>[];
  grid: IGridRaw<Model>;
}
