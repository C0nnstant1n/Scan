import { histogramsApi } from "../../../redux/HistogramSevice";
import { LoaderFunctionArgs, useLocation } from "react-router-dom";

export default function SearchResult() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  console.log(params);

  const { data: post } = histogramsApi.useGetPostsQuery(1);
  console.log(post);

  return (
    <>
      <div className='result'>
        <h1> Результаты поиска</h1>
      </div>
    </>
  );
}
