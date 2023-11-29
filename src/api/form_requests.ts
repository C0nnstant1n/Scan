import type { LoaderFunctionArgs } from "react-router-dom";
import { histograms } from "./histograms_interface";

export default async function searchAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  //   const Data = formData.get("inn") as string | null;
  // console.log(formData.get("redirectTo"));

  histograms.issueDateInterval.startDate = new Date(
    formData.get("startDate") as string
  ).toISOString();
  histograms.issueDateInterval.endDate = new Date(
    formData.get("endDate") as string
  ).toISOString();

  histograms.limit = Number(formData.get("limit"));

  const inn = formData.get("inn") as string;

  const company = {
    inn: "",
    maxFullness: false,
    inBusinessNews: false,
    entityId: null,
    type: "company",
    sparkId: null
  }


  company.inn = inn ? inn.replace(/\D/g, "") : "";
  company.maxFullness = !!formData.get("maxFullness");
  company.inBusinessNews = !!formData.get("inBusinessNews");

  histograms.searchContext.targetSearchEntitiesContext.targetSearchEntities.push(company)

  histograms.attributeFilters.excludeAnnouncements = !formData.get(
    "excludeAnnouncements"
  )
  histograms.attributeFilters.excludeDigests = !formData.get("excludeDigests")

  histograms.attributeFilters.excludeTechNews = !formData.get("excludeTechNews")

  histograms.searchContext.targetSearchEntitiesContext.onlyMainRole = !!formData.get("onlyMainRole")

  histograms.searchContext.targetSearchEntitiesContext.onlyWithRiskFactors = !!formData.get(
    "onlyWithRiskFactors"
  )

  histograms.searchContext.targetSearchEntitiesContext.tonality = formData.get(
    "tonality"
  ) as string;

  // console.log(histograms);

  return histograms;
}
