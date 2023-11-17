let company = {
  type: "company",
  sparkId: null,
  entityId: null,
  inn: "0",
  maxFullness: true,
  inBusinessNews: null as boolean | null,
};

let search = {
  targetSearchEntitiesContext: {
    targetSearchEntities: [company],
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
};

const histograms = {
  issueDateInterval: {
    startDate: "2019-01-01T00:00:00+03:00",
    endDate: "2022-08-31T23:59:59+03:00",
  },
  searchContext: search,
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
  limit: "1000",
  sortType: "sourceInfluence",
  sortDirectionType: "desc",
  intervalType: "month",
  histogramTypes: ["totalDocuments", "riskFactors"],
};

export { histograms, company, search };

export interface Ihistograms {
  data: [
    {
      data: [
        {
          date: string;
          value: number;
        }
      ];
      histogramType: string;
    }
  ];
}
