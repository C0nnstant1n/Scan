import { scanApi } from "../../../redux/HistogramSevice";
import {IHistograms, IHistogramsResponse} from "../../../api/histograms_interface";
import { useEffect } from "react";
import Carousel from "./components/carousel";
import { IDocRequest, IDocResponse } from "../../../api/doc_interfaces";
import DocumentCard from "./components/documentcard";
import styles from "./result.module.scss";
import searchImg from "../../../assets/searh_img.svg";
import spinnerIco from "../../../assets/spinner-ico.svg";
import { useState } from "react";

interface IPropsDataForm {
  formData: IHistograms;
}

const count = 0;
const response: IDocResponse[] = [];

export default function SearchResult(props: IPropsDataForm) {
  // console.log(props);

  const [
    searchHistograms,
    { data: histogramsData, isSuccess: histogramSuccess },
  ] = scanApi.useSearchHistogramsMutation();

  const [objectSearch,
    { data: scanData, isSuccess: objectSuccess }] =
    scanApi.useObjectSearchMutation();

  const getHistograms = async () => {
    await searchHistograms({ ...props.formData });
  };

  const getObject = async () => {
    await objectSearch({ ...props.formData });
  };

  useEffect(() => {
    // console.log("запрос гистограмм");
    getHistograms();
    getObject();
  }, []);

  const [getDocs, { data: docsData, isLoading: docsLoading }] =
    scanApi.useDocumentSearchMutation();

  const getDoc = async (docsId: IDocRequest) => {
    await getDocs(docsId);
  };

  const request: IDocRequest = { ids: [] };
  let docsFoundCount = 0;
  const [indexOfReading, setIndexOfReading] = useState(count);
  // console.log("state index - ", indexOfReading);
  if (scanData) {
    docsFoundCount = scanData.items.length;
    for (
      let index = indexOfReading;
      index < indexOfReading + 10 && index < docsFoundCount;
      index++
    ) {
      request.ids.push(scanData.items[index].encodedId);
    }
  }

  let totalDocuments = 0;
  if (histogramsData?.data.length) {
    // console.log(histogramsData);

    histogramsData?.data[0].data.map((value) => {
      totalDocuments += value.value;
    });
  }

  const [loadedDocs, setLoadedDocs] = useState(response);

  useEffect(() => {
    // console.log("загружаем первые 10 документов");

    if (request.ids.length > 0 && !docsLoading) {
      getDoc(request);
    }
  }, [scanData]);


  useEffect(() => {
    // console.log("загружаем следующую 10ку документов");
    if (request.ids.length) {
      getDoc(request);
    }
  }, [indexOfReading]);

  useEffect(() => {
    // console.log("дорисовываем документы");
    if (docsData) {
      loadedDocs.length
        ? setLoadedDocs(loadedDocs.concat(docsData))
        : setLoadedDocs(docsData);
    }
  }, [docsData]);

  const buttonDisable = () =>
    docsFoundCount == loadedDocs.length ? { display: "none" } : undefined;

  const example: IHistogramsResponse = {
    data: [{
      data: [{
        date: "2020-11-01T03:00:00+03:00",
        value: 8
      }, {
        date: "2020-06-01T03:00:00+03:00",
        "value": 6
      }],
      "histogramType": "totalDocuments"
    }, {
      "data": [{
        "date": "2020-11-01T03:00:00+03:00",
        "value": 0
      }, {
        "date": "2020-06-01T03:00:00+03:00",
        "value": 1
      }],
      "histogramType": "riskFactors"
    }]
  }

  // console.log(example)
  return (
    <>
      <div className={styles.result}>
        <div className={styles.result__top}></div>
        <div className={styles.top__content}>
          <div className={styles.content__text}>
            <h1> Ищем. Скоро будут результаты</h1>
            <br />
            <p>
              Поиск может занять некоторое время, просим сохранять терпение.
            </p>
          </div>
          <div className={styles.content__img}>
            <img src={searchImg} alt='Картинка поиск' />
          </div>
        </div>

        <div className={styles.summary}>
          <h2>Общая сводка</h2>
          <p>Найдено {totalDocuments} документов</p>
          <br />
          <div className={styles.summary__frame}>
            <div className={styles.frame__background}>
              {histogramsData ? (
                <Carousel data={example.data} />
              ) : (
                <div className={styles.loading}>
                  <img src={spinnerIco} alt='' />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.docs_list}>
          <h2>список документов</h2>
          {histogramSuccess &&
            objectSuccess &&
            !loadedDocs.length &&
            !docsLoading && (
              <h1>Извините, по вашему запросу ничего не найдено</h1>
            )}
          <div className={styles.docs_list__wrapper}>
            {loadedDocs && (
              <>
                {loadedDocs.map((item) => {
                  return <DocumentCard requestItem={item} key={item.ok.id} />;
                })}
              </>
            )}
          </div>
          <div className={styles.doc_list__button} style={buttonDisable()}>
            {docsLoading ? (
              <div className={styles.loading}>
                <img src={spinnerIco} alt='' />
              </div>
            ) : (
              <button onClick={() => setIndexOfReading(indexOfReading + 10)}>
                Показать больше
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
