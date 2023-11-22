import { useState } from "react";
import Card from "./cards";
import styles from "./carousel.module.scss";
import icon from "../../../../assets/icons8-шеврон-вправо-90 1.svg";
import { IhistogramsResponce } from "../../../../api/histograms_interface";
import { FC } from "react";

export interface Icard {
  period: string;
  totalDocuments: number | null;
  riskFactors: number | null;
}
interface Idata {
  data: IhistogramsResponce[];
}

const Carousel: FC<Idata> = ({ data }) => {
  let list: number[] = [];
  let carouselList: Icard[] = [];
  // console.log(data);

  let monthArray = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  if (data.length) {
    // console.log(data.length);

    for (let i in data[0].data) {
      let card: Icard = {
        period: data[0].data[i].date,
        totalDocuments: data[0].data[i].value,
        riskFactors: data[1].data[1].value,
      };
      carouselList.push(card);
    }
  }

  if (data.length) {
    // сортируем наш список по дате
    carouselList.sort((a, b) => {
      return Number(new Date(a["period"])) - Number(new Date(b["period"]));
    });
    // форматируем дату
    carouselList.map((period) => {
      const date = new Date(period.period);
      period.period = `${monthArray[date.getMonth()]} ${date.getFullYear()}`;
    });
    list = [];
  }

  // добавляем пустые карточки, если их не хватает
  if (carouselList.length <= 9) {
    for (let i = 0; i <= 9 - carouselList.length; i++) {
      let card: Icard = {
        period: "",
        totalDocuments: null,
        riskFactors: null,
      };
      carouselList.push(card);
    }
  }
  // console.log(carouselList);

  for (let i in carouselList) {
    list.push(Number(i));
  }

  const [indexes, setIndexes] = useState(list);

  function prevCard() {
    const newList: number[] = [];
    indexes.map((value, index) => {
      value--;
      value < 0
        ? (newList[index] = carouselList.length - 1)
        : (newList[index] = value);
    });
    setIndexes(newList);
  }

  function nextCard() {
    const newList: number[] = [];
    indexes.map((value, index) => {
      value++;
      value > indexes.length - 1
        ? (newList[index] = 0)
        : (newList[index] = value);
    });
    setIndexes(newList);
  }
  return (
    <div className={styles.carousel}>
      <button className={styles.button_left} onClick={prevCard}>
        <img src={icon} alt='prev' />
      </button>
      <div className={styles.carousel__legenda}>
        <p>Период</p>
        <p>Всего</p>
        <p>Риски</p>
      </div>
      <div className={styles.cards}>
        {indexes.length && carouselList.length > 7 ? (
          <>
            <Card card={carouselList[indexes[0]]} />
            <Card card={carouselList[indexes[1]]} />
            <Card card={carouselList[indexes[2]]} />
            <Card card={carouselList[indexes[3]]} />
            <Card card={carouselList[indexes[4]]} />
            <Card card={carouselList[indexes[5]]} />
            <Card card={carouselList[indexes[6]]} />
            <Card card={carouselList[indexes[7]]} />
          </>
        ) : null}
      </div>
      <button className={styles.button_right} onClick={nextCard}>
        <img src={icon} alt='next' />
      </button>
    </div>
  );
};

export default Carousel;
