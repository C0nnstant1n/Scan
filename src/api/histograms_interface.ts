interface Icompany {
  type: string;
  sparkId: number | null;
  entityId: number | null;
  inn: number | null;
  maxFullness: Boolean;
  inBusinessNews: Boolean;
}

interface Isearch {
  targetSearchEntitiesContext: {
    targetSearchEntities: Icompany[];
    onlyMainRole: Boolean;
    tonality: string;
    onlyWithRiskFactors: Boolean;
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

interface Ihistograms {
  issueDateInterval: {
    startDate: string;
    endDate: string;
  };
  searchContext: Isearch;
  searchArea: {
    includedSources: [];
    excludedSources: [];
    includedSourceGroups: [];
    excludedSourceGroups: [];
  };
  attributeFilters: {
    excludeTechNews: Boolean;
    excludeAnnouncements: Boolean;
    excludeDigests: Boolean;
  };
  similarMode: string;
  limit: number;
  sortType: string;
  sortDirectionType: string;
  intervalType: string;
  histogramTypes: string[];
}

export let histograms: Ihistograms = {
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

export type { Ihistograms, Icompany, Isearch };

interface IDataItem {
  date: string;
  value: number;
}

interface IHistogram {
  data: IDataItem[];
  histogramType: string;
}

export interface IhistogramsResponce {
  data: IHistogram[];
}
