import styles from "./footer.module.scss";
import logo from "../assets/logo-invert.png";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className='logo'>
          <img className='logo-img' alt='Logo' src={logo} />
        </div>
        <div className='label'>
          <p className='element'>
            г. Москва, Цветной б-р, 40
            <br />
            +7 495 771 21 11
            <br />
            info@skan.ru
          </p>
        </div>
      </footer>
    </>
  );
}
