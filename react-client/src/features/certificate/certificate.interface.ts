export interface Certificate {
  id?: number;
  address: string;
  landParcel: number;
  mapSheet: number;
  acreage: number;
  ownerName: string;
  locations?: Location[];
}

export interface Location {
  id?: number;
  order: number;
  latitudeY: number;
  longitudeX: number;
  certificateId: number;
  certificate?: Certificate;
}

export interface PageInfo {
  page: number;
  pageSize: number;
  count: number;
}

export interface FetchAllData {
  certificates: Certificate[];
  pageInfo: PageInfo;
};