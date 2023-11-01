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
];

console.log(carouselList.length);

export default function Carousel() {
  return (
    <div className={styles.carousel}>
      <h2>Почему именно мы</h2>
      <div className={styles.cards}>
        <button className={styles.button_left}>
          <img src={icon} alt='' />
        </button>
        <Card carouselList={carouselList[0]} />
        <Card carouselList={carouselList[1]} />
        <Card carouselList={carouselList[2]} />
        <button className={styles.button_right}></button>
      </div>
    </div>
  );
}
