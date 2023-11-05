import Card from "./card";
import styles from "./tariffs.module.scss";
import begin_ico from "../../../assets/Beginner.svg";
import pro_ico from "../../../assets/Pro-icon.svg";
import business_ico from "../../../assets/Business-icon.svg";

export interface ITariff {
  name: string;
  icon: string;
  description: string;
  isCurrent: boolean;
  price: {
    cost: string;
    discount: string;
    installment: string;
  };
  conditions: string[];
}

const tariffs: ITariff[] = [
  {
    name: "Beginner",
    icon: `${begin_ico}`,
    description: "Для небольшого исследования",
    isCurrent: true,
    price: {
      cost: "1 200 ₽",
      discount: "799 ₽",
      installment: "или 150 ₽/мес. при рассрочке на 24 мес.",
    },
    conditions: [
      "Безлимитная история запросов",
      "Безопасная сделка",
      "Поддержка 24/7",
    ],
  },
  {
    name: "Pro",
    icon: `${pro_ico}`,
    description: "Для HR и фрилансеров",
    isCurrent: false,
    price: {
      cost: "2 600 ₽",
      discount: "1 299 ₽",
      installment: "или 279 ₽/мес. при рассрочке на 24 мес.",
    },
    conditions: [
      "Все пункты тарифа Beginner",
      "Экспорт истории",
      "Рекомендации по приоритетам",
    ],
  },
  {
    name: "Business",
    icon: `${business_ico}`,
    description: "Для корпоративных клиентов",
    isCurrent: false,
    price: {
      cost: "3 700 ₽",
      discount: "2 379 ₽",
      installment: "",
    },
    conditions: [
      "Все пункты тарифа Pro",
      "Безлимитное количество запросов",
      "Приоритетная поддержка",
    ],
  },
];

export default function Tariffs() {
  return (
    <div className={styles.tariffs}>
      <h2>Наши тарифы</h2>
      <div className={styles.cards}>
        {tariffs.map((tarif) => (
          <Card rate={tarif} key={tarif.name} />
        ))}
      </div>
    </div>
  );
}
