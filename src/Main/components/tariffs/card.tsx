import styles from "./tariffs.module.scss";
import li_icon from "../../../assets/icons8-галочка-96 1.svg";
import { ITariff } from "./tariffs";

interface IProps {
  rate: ITariff;
}

export default function Card({ rate }: IProps) {
  let type = "";
  switch (rate.name) {
    case "Beginner":
      type = styles.beginner;
      break;

    case "Pro":
      type = styles.pro;
      break;

    case "Business":
      type = styles.business;
      break;

    default:
      type = styles.beginner;
      break;
  }

  return (
    <div className={styles.card}>
      <div className={styles.heading + " " + type}>
        <h2>{rate.name}</h2>
        <img src={rate.icon}></img>
        <p>{rate.description}</p>
      </div>

      {rate.isCurrent ? (
        <div className={styles.is_current}>
          <p>Текущий тариф</p>
        </div>
      ) : (
        <div className={styles.is_current_hide}></div>
      )}

      <div className={styles.price}>
        <h2>
          {rate.price.discount} <span>{rate.price.cost}</span>
        </h2>
        <br />
        <p>{rate.price.installment} </p>
      </div>
      <div className={styles.terms}>
        <ul>
          {" "}
          <b>В тариф входит:</b>
          {rate.conditions.map((condition) => (
            <li key={condition}>
              <img src={li_icon}></img>
              {condition}
            </li>
          ))}
        </ul>
      </div>
      {rate.isCurrent ? (
        <button>Перейти в личный кабинет</button>
      ) : (
        <button>Подробнее</button>
      )}
    </div>
  );
}
