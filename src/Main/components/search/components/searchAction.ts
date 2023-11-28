import type { LoaderFunctionArgs } from "react-router-dom";
import { ICompany, histograms } from "../../../../api/histograms_interface";

export default async function searchAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();

  histograms.histogramTypes = ["totalDocuments", "riskFactors"];
  histograms.issueDateInterval.startDate = new Date(
    formData.get("startDate") as string
  ).toISOString();
  histograms.issueDateInterval.endDate = new Date(
    formData.get("endDate") as string
  ).toISOString();

  histograms.limit = Number(formData.get("limit"));

  const inn = formData.get("inn") as string;

  const company: ICompany = {
    type: "company",
    sparkId: null,
    entityId: null,
    inn: 7710137066,
    maxFullness: false,
    inBusinessNews: false,
  };
  const search = histograms.searchContext.targetSearchEntitiesContext;

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

  return histograms;
}
