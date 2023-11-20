interface IDocRequest {
  ids: string[];
}

interface Isource {
  id: number;
  groupId: number;
  name: string;
  categoryId: number;
  levelId: number;
}

interface Iauthor {
  name: string;
}

interface Ititle {
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

interface Ipeople {
  rotatedName: string;
  tags: string[];
  isSpeechAuthor: boolean;
  localId: number;
  name: string;
  entityId: number;
  isMainRole: boolean;
}

interface Ithemes {
  localId: number;
  name: string;
  entityId: number;
  tonality: string;
  participant: {
    localId: number;
    type: string;
  };
}

interface Ilocatios {
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
  people: Ipeople[];
  themes: Ithemes[];
  locations: Ilocatios[];
}

interface Iattributes {
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
    author: Iauthor;
    source: Isource;
    dedupClusterId: string;
    title: Ititle;
    content: {
      markup: string;
    };
    entities: IEntities;
    attributes: Iattributes;
    language: string;
  };
  fail: {
    id: string;
    errorCode: number;
    errorMessage: string;
  };
}
[];

export type { IDocRequest, IDocResponse };
