import styles from "./header.module.scss";
import separator from "../assets/separator.svg";
import { useState } from "react";
import { AccountInfo } from "../api/account_requests";
import avatar from "../assets/avatar.png";
import spinner from "../assets/spinner-ico.svg";
import { authorize, login } from "../redux/authorizeSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import PopUp from "./popup";

interface IAccountInfo {
  eventFiltersInfo: {
    companyLimit: number;
    usedCompanyCount: number;
  };
}

export default function Header() {
  const [info, setInfo] = useState<IAccountInfo | null>(null);

  let lifetime = 0;
  const dispatch = useAppDispatch();
  const user = localStorage.getItem("user");

  // console.log(user);
  dispatch(login(user));

  const expire = localStorage.getItem("expire");
  if (expire) {
    lifetime = (Date.parse(expire) - Date.now()) / 1000;
  }
  // console.log(lifetime);

  lifetime > 10
    ? (dispatch(authorize(true)), dispatch(login(user)))
    : (dispatch(authorize(false)), dispatch(login(null)));

  const isAuthorized = useAppSelector((state) => state.toolkit.isAuthenticated);

  if (info == null && isAuthorized) {
    AccountInfo().then((response: IAccountInfo) => {
      setInfo(response);
    });
  }
  const [isPopUp, setPopUp] = useState(false);

  const handlePopUp = () => {
    setPopUp(true);
  };

  return (
    <>
      <header className={styles.header}>
        {isPopUp ? <PopUp user={user} /> : null}

        <picture className={styles.logo}>
          {/* <img className={styles.logo_img} alt='Logo' src={logo} /> */}
        </picture>

        <div className={styles.nav_button} onClick={handlePopUp}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='25'
            viewBox='0 0 30 25'
            fill='none'
          >
            <rect width='30' height='5' fill='#029491' />
            <rect y='10' width='30' height='5' fill='#029491' />
            <rect y='20' width='30' height='5' fill='#029491' />
          </svg>
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
