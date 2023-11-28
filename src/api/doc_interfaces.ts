interface IDocRequest {
  ids: string[];
}

interface ISource {
  id: number;
  groupId: number;
  name: string;
  categoryId: number;
  levelId: number;
}

interface IAuthor {
  name: string;
}

interface ITitle {
  text: string;
  markup: string;
}

interface ICompany {
  sparkId: number;
  inn: string;
  ogrn: string;
  searchPrecision: "maxPrecision";
}

interface IResolveInfo {
  resolveApproaches: string[];
}

interface ICompanies {
  suggestedCompanies: ICompany[];
  resolveInfo: IResolveInfo;
  tags: string[];
  isSpeechAuthor: boolean;
  localId: number;
  name: string;
  entityId: number;
  isMainRole: boolean;
}

interface IPeople {
  rotatedName: string;
  tags: string[];
  isSpeechAuthor: boolean;
  localId: number;
  name: string;
  entityId: number;
  isMainRole: boolean;
}

interface IThemes {
  localId: number;
  name: string;
  entityId: number;
  tonality: string;
  participant: {
    localId: number;
    type: string;
  };
}

interface ILocations {
  code: {
    countryCode: string;
    regionCode: string;
  };
  localId: number;
  name: string;
  entityId: number;
  isMainRole: boolean;
}

interface IEntities {
  companies: ICompanies[];
  people: IPeople[];
  themes: IThemes[];
  locations: ILocations[];
}

interface IAttributes {
  isTechNews: boolean;
  isAnnouncement: boolean;
  isDigest: boolean;
  isSpeechRecognition: boolean;
  influence: number;
  wordCount: number;
  coverage: {
    value: number;
    state: string;
  };
}

interface IDocResponse {
  ok: {
    schemaVersion: string;
    id: string;
    version: number;
    issueDate: string;
    url: string;
    author: IAuthor;
    source: ISource;
    dedupClusterId: string;
    title: ITitle;
    content: {
      markup: string;
    };
    entities: IEntities;
    attributes: IAttributes;
    language: string;
  };
  fail: {
    id: string;
    errorCode: number;
    errorMessage: string;
  };
}

export type { IDocRequest, IDocResponse };
