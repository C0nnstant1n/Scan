import { scanApi } from "../../../redux/HistogramSevice";
import { Ihistograms } from "../../../api/histograms_interface";
interface IpropsDataform {
  formData: Ihistograms;
}
import { useEffect } from "react";
import Carousel from "./components/carousel";
import { IDocRequest } from "../../../api/doc_interfaces";
import DocumentCard from "./components/documentcard";
import styles from "./result.module.scss";
import searchImg from "../../../assets/searh_img.svg";
import spinnerIco from "../../../assets/spinner-ico.svg";

export default function SearchResult(props: IpropsDataform) {
  const [
    searhHistograms,
    {
      data: histogramsData,
      error: histogramsError,
      isLoading: histogrmsLoading,
    },
  ] = scanApi.useSearchHistogramsMutation();

  const [objectSearch, { data: scanData }] = scanApi.useObjectSearchMutation();

  const getHistograms = async () => {
    await searhHistograms({ ...props.formData });
  };

  const getObject = async () => {
    await objectSearch({ ...props.formData });
  };

  useEffect(() => {
    getHistograms();
    getObject();
  }, []);

  const [getDocs, { data: docsData, isLoading: docsLoading }] =
    scanApi.useDocumentSearchMutation();

  const getDoc = async (docsId: IDocRequest) => {
    await getDocs(docsId);
  };

  let request: IDocRequest = { ids: [] };
  let docsFinded = 0;
  if (scanData) {
    docsFinded = scanData.items.length;
    for (let index = 0; index < 10; index++) {
      request.ids.push(scanData.items[index].encodedId);
    }
  }
  let totalDocuments = 0;
  if (histogramsData) {
    histogramsData?.data[0].data.map((value) => {
      totalDocuments += value.value;
    });
  }

  useEffect(() => {
    if (request.ids.length > 0 && !docsLoading) {
      // console.log(request);
      getDocs(request);
    }
  }, [scanData]);

  return (
    <>
      <div className={styles.result}>
        <div className={styles.result__top}></div>
        <div className={styles.top__content}>
          <div className={styles.content__text}>
            <h1> Ищем. Скоро будут результы</h1>
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
                <Carousel data={histogramsData.data} />
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
          <div className={styles.docs_list__wrapper}>
            {docsData ? (
              <>
                {docsData.map((item) => {
                  return <DocumentCard requestItem={item} key={item.ok.id} />;
                })}
              </>
            ) : (
              <div className={styles.loading}>
                <img src={spinnerIco} alt='' />
              </div>
            )}
          </div>
          <div className={styles.doc_list__button}>
            <button onClick={() => getDoc(request)}>Показать больше</button>
          </div>
        </div>
      </div>
    </>
  );
}
