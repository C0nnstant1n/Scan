import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect, useActionData } from "react-router-dom";
import SearchResult from "../result/Result.js";
import { Ihistograms } from "../../../api/histograms_interface.js";

export function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  // console.log(request);
  const isAuthorized = localStorage.getItem("user") ? true : false;

  if (!isAuthorized) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    // console.log(params.toString());
    // если пользователь не авторизован, можно отправить его на страницу входа
    // return redirect("/signin?" + params.toString());
    // но по техзаданию мы должны его отправить на главную страницу
    return redirect("/");
  }
  return null;
}

export default function Search() {
  let formData = useActionData() as Ihistograms;
  if (formData) {
    return <SearchResult formData={formData} />;
  }

  // const a = {
  //   issueDateInterval: {
  //     startDate: "2018-01-01T00:00:00.000Z",
  //     endDate: "2023-11-19T00:00:00.000Z",
  //   },
  //   searchContext: {
  //     targetSearchEntitiesContext: {
  //       targetSearchEntities: [
  //         {
  //           type: "company",
  //           sparkId: null,
  //           entityId: null,
  //           inn: 7710137066,
  //           maxFullness: false,
  //           inBusinessNews: false,
  //         },
  //       ],
  //       onlyMainRole: false,
  //       tonality: "any",
  //       onlyWithRiskFactors: false,
  //       riskFactors: {
  //         and: [],
  //         or: [],
  //         not: [],
  //       },
  //       themes: {
  //         and: [],
  //         or: [],
  //         not: [],
  //       },
  //     },
  //     themesFilter: {
  //       and: [],
  //       or: [],
  //       not: [],
  //     },
  //   },
  //   searchArea: {
  //     includedSources: [],
  //     excludedSources: [],
  //     includedSourceGroups: [],
  //     excludedSourceGroups: [],
  //   },
  //   attributeFilters: {
  //     excludeTechNews: false,
  //     excludeAnnouncements: false,
  //     excludeDigests: false,
  //   },
  //   similarMode: "duplicates",
  //   limit: 100,
  //   sortType: "sourceInfluence",
  //   sortDirectionType: "desc",
  //   intervalType: "month",
  //   histogramTypes: ["totalDocuments", "riskFactors"],
  // };

  // return <SearchResult formData={a} />;
}
