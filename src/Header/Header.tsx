import styles from "./header.module.scss";
import separator from "../assets/separator.svg";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          {/* <img className={styles.logo_img} alt='Logo' src={logo} /> */}
        </div>

        <div className={styles.navbar}>
          <nav>
            <ul>
              <li>
                <a href='#'>Главная</a>
              </li>
              <li>
                <a href='#'>Тарифы</a>
              </li>
              <li>
                <a href='#'>FAQ</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.account_info}></div>
        <div className={styles.account}>
          <a href='#'>Зарегистрироваться</a>
          <img src={separator} alt='|' />
          <button>Войти</button>
        </div>
      </header>
    </>
  );
}
