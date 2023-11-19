import SearchForm from "./SearchForm.jsx";
import styles from "./search.module.scss";
import document_img from "../../../assets/Document.svg";
import folders_img from "../../../assets/Folders.svg";
import search_background from "../../../assets/search_background_img.svg";
import type { LoaderFunctionArgs } from "react-router-dom";
import { redirect, useActionData } from "react-router-dom";
import SearchResult from "../result/Result.js";
import { Ihistograms } from "../../../api/histograms_interface.js";
import { Link } from "react-router-dom";

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
  let formData = useActionData();
  if (formData) {
    return <SearchResult formData={formData} />;
  }

  const a = {
    issueDateInterval: {
      startDate: "2018-01-01T00:00:00.000Z",
      endDate: "2023-11-19T00:00:00.000Z",
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: 7710137066,
            maxFullness: false,
            inBusinessNews: false,
          },
        ],
        onlyMainRole: false,
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
      excludeTechNews: false,
      excludeAnnouncements: false,
      excludeDigests: false,
    },
    similarMode: "duplicates",
    limit: 100,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: ["totalDocuments", "riskFactors"],
  };

  return (
    <SearchResult formData={a} />
    // <>
    //   <div className={styles.wrapper}>
    //     <div className={styles.heading}>
    //       <div className={styles.heading__content}>
    //         <h1>Найдите необходимые данные в пару кликов.</h1>
    //         <div className={styles.heading__comment}>
    //           <p>Задайте параметры поиска.</p>
    //           <p>Чем больше заполните, тем точнее поиск</p>
    //         </div>
    //       </div>
    //       <div className={styles.heading__img}>
    //         <div className={styles.wrapper_img}>
    //           <img src={document_img} alt='document image' />
    //           <img src={folders_img} alt='folders image' />
    //         </div>
    //       </div>
    //     </div>

    //     <div className={styles.form_wrapper}>
    //       <SearchForm />
    //       <div className={styles.search_form__img}>
    //         <img src={search_background} alt='search_form img' />
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
