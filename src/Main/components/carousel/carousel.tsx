import * as React from "react";
import Card from "./cards";
import styles from "./carousel.module.scss";
import icon from "../../../assets/icons8-шеврон-вправо-90 1.svg";
import clock from "../../../assets/clock-ico.svg";
import search from "../../../assets/search-ico.svg";
import defense from "../../../assets/defense-ico.svg";

export interface IcarouselList {
  img: string;
  text: string;
}

const carouselList: IcarouselList[] = [
  {
    img: `${clock}`,
    text: "Высокая и оперативная скорость обработки заявки",
  },

  {
    img: `${search}`,
    text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
  },

  {
    img: `${defense}`,
    text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
  },
  {
    img: `${defense}`,
    text: "1",
  },
  {
    img: `${defense}`,
    text: "2",
  },
  {
    img: `${defense}`,
    text: "3",
  },
];

let list: number[] = [];
for (let i in carouselList) {
  list.push(Number(i));
}

export default function Carousel() {
  const [indexes, setIndexes] = React.useState(list);

  function prevCard() {
    const newList: number[] = [];
    indexes.map((value, index) => {
      value--;
      value < 0
        ? (newList[index] = carouselList.length - 1)
        : (newList[index] = value);
    });
    setIndexes(newList);
    // console.log(newList);
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
    // console.log(newList);
  }
  return (
    <div className={styles.carousel}>
      <h2>Почему именно мы</h2>
      <div className={styles.cards}>
        <button className={styles.button_left} onClick={prevCard}>
          <img src={icon} alt='prev' />
        </button>

        <Card carouselList={carouselList[indexes[0]]} />
        <Card carouselList={carouselList[indexes[1]]} />
        <Card carouselList={carouselList[indexes[2]]} />

        <button className={styles.button_right} onClick={nextCard}>
          <img src={icon} alt='next' />
        </button>
      </div>
    </div>
  );
}
