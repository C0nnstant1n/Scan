import styles from "./Main.module.scss";
import topImage from "../assets/2398.png";

export default function Main() {
  return (
    <main>
      <div className={styles.top_container}>
        <div className={styles.heading}>
          <h1>сервис по поиску публикаций о компании по его ИНН</h1>
          <p>
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </p>
          <button>Запросить данные</button>
        </div>
        <div className={styles.back_img}>
          <img src={topImage} alt='' />
        </div>
      </div>
    </main>
  );
}
