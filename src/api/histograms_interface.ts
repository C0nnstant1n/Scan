interface ICompany {
  type: string;
  sparkId: number | null;
  entityId: number | null;
  inn: number | null;
  maxFullness: boolean;
  inBusinessNews: boolean;
}

interface ISearch {
  targetSearchEntitiesContext: {
    targetSearchEntities: ICompany[];
    onlyMainRole: boolean;
    tonality: string;
    onlyWithRiskFactors: boolean;
    riskFactors: {
      and: [];
      or: [];
      not: [];
    };
    themes: {
      and: [];
      or: [];
      not: [];
    };
  };
  themesFilter: {
    and: [];
    or: [];
    not: [];
  };
}

interface IHistograms {
  issueDateInterval: {
    startDate: string;
    endDate: string;
  };
  searchContext: ISearch;
  searchArea: {
    includedSources: [];
    excludedSources: [];
    includedSourceGroups: [];
    excludedSourceGroups: [];
  };
  attributeFilters: {
    excludeTechNews: boolean;
    excludeAnnouncements: boolean;
    excludeDigests: boolean;
  };
  similarMode: string;
  limit: number;
  sortType: string;
  sortDirectionType: string;
  intervalType: string;
  histogramTypes: string[];
}

interface IDataItem {
  date: string;
  value: number;
}

interface IHistogram {
  data: IDataItem[];
  histogramType: string;
}

interface IHistogramsResponse {
  data: IHistogram[];
}

export const histograms: IHistograms = {
  issueDateInterval: {
    startDate: "2019-01-01T00:00:00+03:00",
    endDate: "2022-08-31T23:59:59+03:00",
  },
  searchContext: {
    targetSearchEntitiesContext: {
      targetSearchEntities: [
        {
          type: "company",
          sparkId: null,
          entityId: null,
          inn: 7710137066,
          maxFullness: true,
          inBusinessNews: false,
        },
      ],
      onlyMainRole: true,
      tonality: "any",
      onlyWithRiskFactors: false,
      riskFactors: {
        and: [],
        or: [],
        not: [],
      },
      themes: {
        and: [],
        or: [],
        not: [],
      },
    },
    themesFilter: {
      and: [],
      or: [],
      not: [],
    },
  },
  searchArea: {
    includedSources: [],
    excludedSources: [],
    includedSourceGroups: [],
    excludedSourceGroups: [],
  },
  attributeFilters: {
    excludeTechNews: true,
    excludeAnnouncements: true,
    excludeDigests: true,
  },
  similarMode: "duplicates",
  limit: 100,
  sortType: "sourceInfluence",
  sortDirectionType: "desc",
  intervalType: "month",
  histogramTypes: ["totalDocuments", "riskFactors"],
};




export type { IHistograms, ICompany, ISearch, IHistogramsResponse, IHistogram };
