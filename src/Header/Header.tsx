import styles from "./header.module.scss";
import logo from "../assets/logo.png";
import separator from "../assets/separator.svg";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.logo_img} alt='Logo' src={logo} />
        </div>

        <div className={styles.navbar}>
          <nav>
            <ul>
              <li>Главная</li>
              <li>Тарифы</li>
              <li>FAQ</li>
            </ul>
          </nav>
        </div>
        <div className={styles.account_info}></div>
        <div className={styles.account}>
          <p>Зарегистрироваться</p>
          <img src={separator} alt='|' />
          <button>Войти</button>
        </div>
      </header>
    </>
  );
}
