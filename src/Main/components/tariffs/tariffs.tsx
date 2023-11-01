import Card from "./card";
import styles from "./tariffs.module.scss";

export default function Tariffs() {
  return (
    <div className={styles.tariffs}>
      <h2>Наши тарифы</h2>
      <div className={styles.cards}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
