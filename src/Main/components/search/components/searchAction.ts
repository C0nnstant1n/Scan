import type { LoaderFunctionArgs } from "react-router-dom";
import {
  Icompany,
  Ihistograms,
  Isearch,
  histograms,
} from "../../../../api/histograms_interface";

export default async function searchAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let hist = {
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
            inBusinessNews: null,
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
    limit: 1000,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: ["totalDocuments", "riskFactors"],
  };
  histograms.histogramTypes = ["totalDocuments", "riskFactors"];
  console.log(histograms);

  console.log(formData.get("startDate"));
  histograms.issueDateInterval.startDate = new Date(
    formData.get("startDate") as string
  ).toISOString();
  histograms.issueDateInterval.endDate = new Date(
    formData.get("endDate") as string
  ).toISOString();

  histograms.limit = Number(formData.get("limit"));

  const inn = formData.get("inn") as string;

  let company = {} as Icompany;
  let search = histograms.searchContext.targetSearchEntitiesContext;

  company.inn = inn ? Number(inn.replace(/\D/g, "")) : null;
  company.maxFullness = formData.get("maxFullness") ? true : false;
  company.inBusinessNews = formData.get("inBusinessNews") ? true : false;
  histograms.attributeFilters.excludeAnnouncements = formData.get(
    "excludeAnnouncements"
  )
    ? false
    : true;

  histograms.attributeFilters.excludeDigests = formData.get("excludeDigests")
    ? false
    : true;

  histograms.attributeFilters.excludeTechNews = formData.get("excludeTechNews")
    ? false
    : true;

  search.onlyMainRole = formData.get("onlyMainRole") ? true : false;

  search.onlyWithRiskFactors = formData.get("onlyWithRiskFactors")
    ? true
    : false;

  search.tonality = formData.get("tonality") as string;

  (histograms.searchContext.targetSearchEntitiesContext.targetSearchEntities = [
    company,
  ]),
    search;
  console.log(histograms);

  return hist;
}
