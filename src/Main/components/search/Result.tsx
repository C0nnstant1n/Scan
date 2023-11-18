import { histogramsApi } from "../../../redux/HistogramSevice";

export default function SearchResult(props) {
  console.log(props.formData);
  const [searhHistograms, { data, error }] =
    histogramsApi.useSearchHistogramsMutation();
  // console.log(data);

  const getHistograms = async () => {
    await searhHistograms({ ...props.formData });
  };
  console.log(data);
  return (
    <>
      <div className='result'>
        <h1> Результаты поиска</h1>

        <button onClick={getHistograms}>get</button>
        {/* {isLoading && <h2>Данные загружаются</h2>} */}
        {/* {error && <h2>Произошла ошибка при запросе</h2>} */}
      </div>
    </>
  );
}
