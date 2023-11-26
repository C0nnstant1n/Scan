import styles from "./Main.module.scss";
import topImage from "../assets/2398.png";
import Carousel from "./components/carousel/carousel";
import middleImage from "../assets/Group 14.svg";
import Tariffs from "./components/tariffs/tariffs";
import { useSelector } from "react-redux";
import type { RootState } from "../redux";

import { Link } from "react-router-dom";

export default function Main() {
  const user = useSelector((state: RootState) => state.toolkit.user);

  return (
    <>
      <div className={styles.top_container}>
        <div className={styles.heading}>
          <h1>Cервис по поиску публикаций о компании по его ИНН</h1>
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
      <picture className={styles.middle_img}>
        <img src={middleImage} alt='image' />
      </picture>
      <Tariffs />
    </>
  );
}
