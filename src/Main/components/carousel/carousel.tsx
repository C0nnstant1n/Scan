import { useState } from "react";
import Card from "./cards";
import styles from "./carousel.module.scss";
import icon from "../../../assets/icons8-шеврон-вправо-90 1.svg";
import carouselList from "./ListCards";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import { setWidth } from "../../../redux/windowsize.ts";

const list: number[] = [];
for (const i in carouselList) {
  list.push(Number(i));
}

export default function Carousel() {
  const [indexes, setIndexes] = useState(list);
  // const [width, setWidth] = useState(window.innerWidth);

  const windowWidth = useAppSelector((state) => state.windowSize.width);
  const dispatch = useAppDispatch();

  const handleResize = () => {
    dispatch(setWidth(window.innerWidth));
  };
  window.addEventListener("resize", handleResize);

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
        {windowWidth > 1200 ? (
          <>
            <Card carouselList={carouselList[indexes[0]]} />
            <Card carouselList={carouselList[indexes[1]]} />
            <Card carouselList={carouselList[indexes[2]]} />
          </>
        ) : windowWidth > 1000 ? (
          <>
            <Card carouselList={carouselList[indexes[0]]} />
            <Card carouselList={carouselList[indexes[1]]} />
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
