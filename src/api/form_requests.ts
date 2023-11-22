import type { LoaderFunctionArgs } from "react-router-dom";
import { histograms } from "./histograms_interface";

export default async function searchAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  //   const Data = formData.get("inn") as string | null;
  console.log(formData.get("redirectTo"));

  histograms.issueDateInterval.startDate = new Date(
    formData.get("startDate") as string
  ).toISOString();
  histograms.issueDateInterval.endDate = new Date(
    formData.get("endDate") as string
  ).toISOString();

  histograms.limit = Number(formData.get("limit"));

  const inn = formData.get("inn") as string;

  company.inn = inn ? inn.replace(/\D/g, "") : "";
  company.maxFullness = formData.get("maxFullness") ? true : false;
  company.inBusinessNews = formData.get("inBusinessNews") ? true : null;
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

  search.targetSearchEntitiesContext.onlyMainRole = formData.get("onlyMainRole")
    ? true
    : false;

  search.targetSearchEntitiesContext.onlyWithRiskFactors = formData.get(
    "onlyWithRiskFactors"
  )
    ? true
    : false;

  search.targetSearchEntitiesContext.tonality = formData.get(
    "tonality"
  ) as string;

  // console.log(histograms);

  return histograms;
}
