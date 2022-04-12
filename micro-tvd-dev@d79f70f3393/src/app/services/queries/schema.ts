import { gql } from 'apollo-angular';

export const nsiPagingQuery = ({
  schema,
  attrList,
  page = 1,
  perPage = 100,
  order,
  fulltext,
  filter = '',
  showTotal,
}: {
  schema: string;
  attrList?: string;
  page?: number;
  perPage?: number;
  order?: Array<{ field: string; type: unknown }>;
  fulltext?: string;
  filter?: string;
  showTotal?: boolean;
}) => gql`
  query pagingQuery {
    ${schema}Paging(
      page: ${page},
      perPage: ${perPage},
      ${
        order
          ? `order: [
        ${order
          .map((item) => {
            return `{ field: "${item.field}", type: ${item.type}}`;
          })
          .join(',')}
      ]`
          : ''
      },
      ${filter ? `filter:"${filter}",` : ''}
      ${fulltext ? `fulltext: "${fulltext}"` : ''}
    ) {
      ${showTotal ? `total` : ''}
      documents {
        ${attrList}
      }
    }
  }
`;
