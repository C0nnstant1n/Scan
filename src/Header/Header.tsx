import styles from "./header.module.scss";
import separator from "../assets/separator.svg";
import { useState } from "react";
import { AccountInfo } from "../api/requests";
import avatar from "../assets/avatar.png";
import spinner from "../assets/spinner-ico.svg";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux";

interface IAccountInfo {
  eventFiltersInfo: {
    companyLimit: number;
    usedCompanyCount: number;
  };
}

export default function Header() {
  const [info, setInfo] = useState<IAccountInfo | null>(null);

  const isAuthorized = useSelector(
    (state: RootState) => state.toolkit.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.toolkit.user);
  console.log(user);

  const dispath = useDispatch();

  if (info == null && isAuthorized) {
    AccountInfo().then((response: IAccountInfo) => {
      setInfo(response);
    });
  }

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
                <a href='/'>Главная</a>
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
        {isAuthorized ? (
          <>
            <div className={styles.account_info}>
              {info ? (
                <>
                  <div className={styles.account_info__label}>
                    <p>Использовано компаний </p>
                    <p>Лимит по компаниям </p>
                  </div>
                  <div className={styles.account_info__value}>
                    <p className={styles.account_info__value_black}>
                      {info && info.eventFiltersInfo.usedCompanyCount}
                    </p>
                    <p className={styles.account_info__value_green}>
                      {info && info.eventFiltersInfo.companyLimit}
                    </p>
                  </div>
                </>
              ) : (
                <div className={styles.account_info__loading}>
                  <img className={styles.spinner} src={spinner} alt='' />
                </div>
              )}
            </div>
            <div className={styles.account}>
              <div className={styles.account__name}>
                <p>{user}</p>
                <button
                  className={styles.account__name_button}
                  onClick={() => {
                    if (confirm("Вы действительно хотите выйти?")) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                >
                  Выйти
                </button>
              </div>
              <img
                className={styles.account__name_avatar}
                src={avatar}
                alt='avatar'
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.account}>
              <a href='#'>Зарегистрироваться</a>
              <img
                className={styles.account__separator}
                src={separator}
                alt='|'
              />
              <a className={styles.account__link_button} href='/signin'>
                Войти
              </a>
            </div>
          </>
        )}
      </header>
    </>
  );
}
