import clock from "../../../assets/clock-ico.svg";
import style from "./carousel.module.scss";
import { IcarouselList } from "./carousel";

interface Props {
  carouselList: IcarouselList;
}

export default function Card({ carouselList }: Props) {
  return (
    <div className={style.card}>
      <img src={carouselList.img} alt='clock' />
      <p>{carouselList.text}</p>
    </div>
  );
}
