import { useState } from "react";
import Card from "./cards";
import styles from "./carousel.module.scss";
import icon from "../../../../assets/icons8-шеврон-вправо-90 1.svg";
import { IhistogramsResponce } from "../../../../api/histograms_interface";

interface Icard {
  period: string;
  totalDocuments: number | null;
  riskFactors: number | null;
}
interface Idata {
  data: IhistogramsResponce;
}

export default function Carousel({ data }: Idata[]) {
  let carouselList: Icard[] = [];
  let list: number[] = [];
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

  for (let i in data[0].data) {
    let card: Icard = {
      period: data[0].data[i].date,
      totalDocuments: data[0].data[i].value,
      riskFactors: data[1].data[1].value,
    };
    carouselList.push(card);
  }

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
  // добавляем пустые карточки, если их не хватает
  if (carouselList.length <= 8) {
    for (let i = 0; i <= 8 - carouselList.length; i++) {
      let card: Icard = {
        period: "",
        totalDocuments: null,
        riskFactors: null,
      };
      carouselList.push(card);
    }
  }

  for (let i in carouselList) {
    list.push(Number(i));
  }

  // console.log(carouselList);
  // console.log(list);
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
        {indexes.length > 0 ? (
          <>
            <Card carouselList={carouselList[indexes[0]]} />
            <Card carouselList={carouselList[indexes[1]]} />
            <Card carouselList={carouselList[indexes[2]]} />
            <Card carouselList={carouselList[indexes[3]]} />
            <Card carouselList={carouselList[indexes[4]]} />
            <Card carouselList={carouselList[indexes[5]]} />
            <Card carouselList={carouselList[indexes[6]]} />
            <Card carouselList={carouselList[indexes[7]]} />
          </>
        ) : null}
      </div>
      <button className={styles.button_right} onClick={nextCard}>
        <img src={icon} alt='next' />
      </button>
    </div>
  );
}
