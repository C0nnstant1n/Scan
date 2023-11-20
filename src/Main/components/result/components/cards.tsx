import style from "./carousel.module.scss";
import rectangle from "../../../../assets/Rectangle 36.svg";
// interface Props {
//   carouselList: IcarouselList;
// }

export default function Card({ carouselList }) {
  // console.log(carouselList);

  return (
    <>
      <div className={style.card}>
        <p>{carouselList.period}</p>
        <p>{carouselList.totalDocuments}</p>
        <p>{carouselList.riskFactors}</p>
      </div>
      <img src={rectangle} alt='Разделитель' />
    </>
  );
}
