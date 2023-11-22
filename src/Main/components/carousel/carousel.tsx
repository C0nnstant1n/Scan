import { useState, useEffect } from "react";
import Card from "./cards";
import styles from "./carousel.module.scss";
import icon from "../../../assets/icons8-шеврон-вправо-90 1.svg";
import carouselList from "./ListCards";

let list: number[] = [];
for (let i in carouselList) {
  list.push(Number(i));
}

export default function Carousel() {
  const [indexes, setIndexes] = useState(list);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        {width > 600 ? (
          <>
            <Card carouselList={carouselList[indexes[0]]} />
            <Card carouselList={carouselList[indexes[1]]} />
            <Card carouselList={carouselList[indexes[2]]} />
          </>
        ) : (
          <Card carouselList={carouselList[indexes[0]]} />
        )}
        <button className={styles.button_right} onClick={nextCard}>
          <img src={icon} alt='next' />
        </button>
      </div>
    </div>
  );
}
