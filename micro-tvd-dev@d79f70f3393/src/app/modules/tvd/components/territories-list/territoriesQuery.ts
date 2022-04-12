import { BaseTableSortDirectionType } from '@cikrf/gas-components';
import { gql } from 'apollo-angular';

export const territoriesQuery = ({
  page,
  perPage,
  order,
  fulltext,
  filter = '',
}: {
  attrList?: string;
  page: number;
  perPage: number;
  order?: { field: string; type: BaseTableSortDirectionType } | null;
  fulltext?: string;
  filter?: string;
}) => gql`
  query pagingQuery {
    TerritoryPaging(
      page: ${page},
      perPage: ${perPage},
      ${order ? `order: { field: "${order.field}", type: ${order.type?.replace(/"/g, '')} }` : ''},
      filter:"${filter}",
      fulltext:"${fulltext}"
    ) {
      total
      documents {
        id
        name
        number
        std {
          STDID
        }
        stdParent {
          STDID
        }
      }
    }
  }
`;
