import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className='error-page'>
      <h1>Ууупс!</h1>
      <p>Извените, что то пошло не так</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
