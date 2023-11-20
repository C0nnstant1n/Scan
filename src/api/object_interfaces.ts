export interface IObjectData {
  items: {
    encodedId: string;
    influence: number;
    similarCount: number;
  }[];
  mappings: {
    inn: string;
    entityIds: number[];
  }[];
}
