import style from "./carousel.module.scss";
import rectangle from "../../../../assets/Rectangle 36.svg";
import { Icard } from "./carousel";
import { FC } from "react";

interface IProps {
  card: Icard;
}

const Card: FC<IProps> = ({ card }) => {
  // console.log(card);

  return (
    <>
      <div className={style.card}>
        <p>{card.period && card.period}</p>
        <p>{card.totalDocuments}</p>
        <p>{card.riskFactors}</p>
      </div>
      <img src={rectangle} alt='Разделитель' />
    </>
  );
};

export default Card;
