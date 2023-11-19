import style from "./carousel.module.scss";

// interface Props {
//   carouselList: IcarouselList;
// }

export default function Card({ carouselList }) {
  return (
    <div className={style.card}>
      <p>{carouselList.period}</p>
      <p>{carouselList.totalDocuments}</p>
      <p>{carouselList.riskFactors}</p>
    </div>
  );
}
