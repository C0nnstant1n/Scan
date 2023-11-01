import styles from "./footer.module.scss";
import logo from "../assets/logo-invert.png";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.logo}>
          {/* <img className={styles.logo_img} alt='Logo' src={logo} /> */}
        </div>
        <div className={styles.contact}>
          <p className={styles.contacts}>
            г. Москва, Цветной б-р, 40
            <br />
            +7 495 771 21 11
            <br />
            info@skan.ru
          </p>
          <br />
          <p className={styles.copyright}>Copyright. 2022</p>
        </div>
      </footer>
    </>
  );
}
