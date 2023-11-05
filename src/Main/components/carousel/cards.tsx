import style from "./carousel.module.scss";
import { IcarouselList } from "./ListCards";

interface Props {
  carouselList: IcarouselList;
}

export default function Card({ carouselList }: Props) {
  return (
    <div className={style.card}>
      <img src={carouselList.img} alt='card-icon' />
      <p>{carouselList.text}</p>
    </div>
  );
}
