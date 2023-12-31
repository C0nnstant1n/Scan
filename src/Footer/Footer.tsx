import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.logo}></div>
        <div className={styles.contact}>
          <p className={styles.contacts}>
            г. Москва, Цветной б-р, 40</p>
<p>
            +7 495 771 21 11
</p><p>
            info@skan.ru
          </p>
          <br />
          <p className={styles.copyright}>Copyright. 2022</p>
        </div>
      </footer>
    </>
  );
}
