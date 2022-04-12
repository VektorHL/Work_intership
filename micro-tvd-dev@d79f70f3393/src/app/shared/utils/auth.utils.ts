import { get } from 'lodash';

export const enum EUserCommissionType {
  CIK = 0,
  IKSRF = 1,
  TIK = 2,
  UNKNOWN = -1,
}

export interface IUser {
  id_token: string;
  session_state: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  scope: string;
  profile: IUserProfile;
  expires_at: number;
}

export interface IUserProfile {
  mapper_test_claim: string;
  sub: string;
  birthdate: Date;
  gender: string;
  amr: string[];
  roles: string[];
  preferred_username: string;
  domain_id: string;
  azp: string;
  auth_time: number;
  scope: string;
  SUBJCOD: string;
  session_state: string;
  email: string;
  person_id: string;
  ogrn: string;
  std: string;
  groups: string[];
  given_name: string;
  middle_name: string;
  picture: string;
  name: string;
  realm: string;
  family_name: string;
  resource_access: Record<string, string[]>;
  iss: string;
  exp: number;
  iat: number;
  aud: string;
  nbf: number;
}

export function getUser(): IUser | null;
export function getUser<T extends string>(path?: T): ResolveTypeByPath<IUser, T, null>;
export function getUser(path?: string) {
  const authUser = window.localStorage.getItem('arm_auth_user');
  if (!authUser) return null;
  const user = JSON.parse(authUser);
  if (!path) return user;
  return get(user, path, null);
}

export function getUserCommissionType(user?: IUser | null): EUserCommissionType {
  /*
    00C000 - ЦИК
    XXS000 - ИКСРФ
    XXTXXX, XXKXXX, XXRXXX - ТИК
 */
  switch (/^(?:\d\d)?([CSKRT])\d\d\d$/.exec((user ?? getUser())?.profile.std!)?.[1]) {
    case 'C':
      return EUserCommissionType.CIK;
    case 'S':
      return EUserCommissionType.IKSRF;
    case 'K':
    case 'R':
    case 'T':
      return EUserCommissionType.TIK;
    default:
      return EUserCommissionType.UNKNOWN;
  }
}
