import { gql } from 'apollo-angular';

export const TerritoryById = ({ id }: { id: string }) => gql`
  query TerritoryById {
    TerritoryById(id: "${id}") {
        id
        name
        number
        subjectRF {
          SUBJCOD
        }
        std {
          STDID
        }
    }
  }
`;
