import styles from "./Main.module.scss";
import topImage from "../assets/2398.png";
import Carousel from "./components/carousel/carousel";
import middleImage from "../assets/Group 14.svg";
import Tariffs from "./components/tariffs/tariffs";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux";
import { authorize, login } from "../redux/slices";
import { Link } from "react-router-dom";

export default function Main() {
  let lifetime = 0;
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  console.log(user);
  dispatch(login(user));
  const expire = localStorage.getItem("expire");
  if (expire) {
    lifetime = (Date.parse(expire) - Date.now()) / 1000;
  }

  lifetime > 10 ? dispatch(authorize(true)) : dispatch(authorize(false));

  const isAuthorized = useSelector(
    (state: RootState) => state.toolkit.isAuthenticated
  );
  console.log(isAuthorized);

  return (
    <>
      <div className={styles.top_container}>
        <div className={styles.heading}>
          <h1>сервис по поиску публикаций о компании по его ИНН</h1>
          <p>
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </p>
          {user && (
            <button>
              <Link to='/search'>Запросить данные</Link>
            </button>
          )}
        </div>
        <div className={styles.back_img}>
          <img src={topImage} alt='' />
        </div>
      </div>
      <Carousel />
      <div className={styles.middle_img}>
        <img src={middleImage} alt='image' />
      </div>
      <Tariffs />
    </>
  );
}
