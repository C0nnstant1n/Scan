import styles from "./header.module.scss";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className='logo'>
          <img className='logo-img' alt='Logo' src={logo} />
        </div>
        <div className='navbar'>
          <ul>
            <li>Главная</li>
            <li>Тарифы</li>
            <li>Faq</li>
          </ul>
        </div>
        <div className='account-info'></div>
        <div className='account'></div>
      </header>
    </>
  );
}
