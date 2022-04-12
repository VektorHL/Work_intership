import { BaseTableSortDirectionType } from '@cikrf/gas-components';
import { gql } from 'apollo-angular';

export const plotsQuery = ({
  page,
  perPage,
  order,
  fulltext = '',
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
    PlotPaging(
      page: ${page},
      perPage: ${perPage},
      ${order ? `order: { field: "${order.field}", type: ${order.type?.replace(/"/g, '')} }` : ''},
      filter:"${filter}",
      fulltext:"${fulltext}"
    ) {
      total
      page
      perPage
      documents {
        id
        updateDateVoterCount
        name
        plotsType
        number
        regVoterCount
        webCamera
        onlineTranslation
        qrCode
        electronicVoting
        bulletinTreatment
        subjectRF {
          SUBJCOD
        }
        std {
          STDID
        }
        isActive
      }
    }
  }
`;
