declare module '*/schema.graphql' {
  import type { DocumentNode } from 'graphql';

  const Query: DocumentNode;

  export { Query };
}

// https://github.com/Pouja/typescript-deep-path-safe
type ResolveTypeByPath<ObjectType, Path extends string, OrElse> = Path extends keyof ObjectType
  ? ObjectType[Path]
  : Path extends `${infer LeftSide}.${infer RightSide}`
  ? LeftSide extends keyof ObjectType
    ? ResolveTypeByPath<ObjectType[LeftSide], RightSide, OrElse>
    : Path extends `${infer LeftSide}[${number}].${infer RightSide}` // eslint-disable-line @typescript-eslint/no-shadow
    ? LeftSide extends keyof ObjectType
      ? ObjectType[LeftSide] extends Array<infer U>
        ? ResolveTypeByPath<U, RightSide, OrElse>
        : OrElse
      : OrElse
    : OrElse
  : Path extends `${infer LeftSide}[${number}]`
  ? LeftSide extends keyof ObjectType
    ? ObjectType[LeftSide] extends Array<infer U>
      ? U
      : OrElse
    : OrElse
  : OrElse;
