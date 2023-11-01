import style from "./tariffs.module.scss";
import li_icon from "../../../assets/icons8-галочка-96 1.svg";
import icon from "../../../assets/Beginner.svg";
export default function Card() {
  return (
    <div className={style.card}>
      <div className={style.heading}>
        <h2>Название</h2>
        <img src={icon}></img>
        <p>Для небольшого исследования</p>
      </div>
      <div className={style.is_current}>
        <p>Текущий тариф</p>
      </div>
      <div className={style.price}>
        <h2>
          700 p <span>1200 p</span>
        </h2>
        <br />
        <p>или 150 ₽/мес. при рассрочке на 24 мес.</p>
      </div>
      <div className={style.terms}>
        <ul>
          {" "}
          <b>В тариф входит:</b>
          <li>
            <img src={li_icon}></img>
            Безлимитная история запросов
          </li>
          <li>
            <img src={li_icon}></img>
            Безопасная сделка
          </li>
          <li>
            <img src={li_icon}></img>
            Поддержка 24/7
          </li>
        </ul>
      </div>
    </div>
  );
}
