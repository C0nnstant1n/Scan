import { histogramsApi } from "../../../redux/HistogramSevice";
import { Ihistograms } from "../../../api/histograms_interface";
interface IpropsDataform {
  formData: Ihistograms;
}
import { useEffect } from "react";
import Carousel from "./components/carousel";

export default function SearchResult(props: IpropsDataform) {
  const [searhHistograms, { data, error, isLoading }] =
    histogramsApi.useSearchHistogramsMutation();

  const getHistograms = async () => {
    await searhHistograms({ ...props.formData });
  };

  // useEffect(() => {
  //   getHistograms();
  // }, []);

  const resp = {
    data: [
      {
        data: [
          {
            date: "2023-05-01T03:00:00+03:00",
            value: 2,
          },
          {
            date: "2023-09-01T03:00:00+03:00",
            value: 3,
          },
          {
            date: "2023-03-01T03:00:00+03:00",
            value: 2,
          },
          {
            date: "2022-12-01T03:00:00+03:00",
            value: 6,
          },
          {
            date: "2023-10-01T03:00:00+03:00",
            value: 5,
          },
          {
            date: "2023-04-01T03:00:00+03:00",
            value: 2,
          },
        ],
        histogramType: "totalDocuments",
      },
      {
        data: [
          {
            date: "2023-05-01T03:00:00+03:00",
            value: 0,
          },
          {
            date: "2023-09-01T03:00:00+03:00",
            value: 0,
          },
          {
            date: "2023-03-01T03:00:00+03:00",
            value: 0,
          },
          {
            date: "2022-12-01T03:00:00+03:00",
            value: 0,
          },
          {
            date: "2023-10-01T03:00:00+03:00",
            value: 0,
          },
          {
            date: "2023-04-01T03:00:00+03:00",
            value: 0,
          },
        ],
        histogramType: "riskFactors",
      },
    ],
  };

  // console.log(props.formData);

  // console.log(data);
  // console.log(data?.data[0].histogramType);

  return (
    <>
      <div className='result'>
        <h1> Ищем. Скоро будут результы</h1>
        <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
        {isLoading && <h2>Данные загружаются</h2>}
        {error && <h2>Произошла ошибка при запросе</h2>}
        <div className='summary'>
          <h2>Общая сводка</h2>
          <p>Найдено {resp?.data[0].data.length}</p>
          {resp ? <Carousel data={resp.data} /> : <h2>Loading...</h2>}
        </div>
      </div>
    </>
  );
}
