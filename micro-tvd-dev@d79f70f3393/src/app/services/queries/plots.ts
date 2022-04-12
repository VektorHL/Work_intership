import { gql } from 'apollo-angular';

export const PlotById = ({ id }: { id: string }) => gql`
  query PlotById {
    PlotById(id: "${id}") {
      id
  		subjectRF {
        SUBJCOD
      }
      parentCommissionOrg {
        id
      }
      commissionComposition {
        id
      }
      voteStructure {
        VNKOD
      }
      plotsCategory {
        VNKOD
      }
      updateDateVoterCount
      name
      plotsType
      number
      initialVoterCount
      regVoterCount
      numerRes {
        VNKOD
        ZNACHATR
      }
      numerResNum
      numerResDate
      slicingRes {
        VNKOD
        ZNACHATR
      }
      std {
        STDID
      }
      slicingResNum
      slicingResDate
      webCamera
      onlineTranslation
      qrCode
      electronicVoting
      bulletinTreatment
      modified
      isActive
    }
  }
`;
