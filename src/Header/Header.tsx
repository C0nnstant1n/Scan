import styles from "./header.module.scss";
import separator from "../assets/separator.svg";
import { useState } from "react";
import { AccountInfo } from "../api/requests";

interface IAccountInfo {
  eventFiltersInfo: {
    companyLimit: number;
    usedCompanyCount: number;
  };
}

export default function Header() {
  const expire = localStorage.getItem("expire");
  let lifetime = 0;
  let _info: IAccountInfo = {
    eventFiltersInfo: {
      companyLimit: 0,
      usedCompanyCount: 0,
    },
  };

  const [info, setInfo] = useState<IAccountInfo | null>(null);
  if (expire) {
    lifetime = (Date.parse(expire) - Date.now()) / 1000;
    if (info == null) {
      AccountInfo().then((response: IAccountInfo) => {
        console.log(response.eventFiltersInfo);
        setInfo(response);
      });
    }
  }
  console.log(lifetime);

  // function infoMap(){
  //   info.
  // }
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
        {lifetime > 10 ? (
          <>
            <div className={styles.account_info}>
              {info != null ? (
                <>
                  <div>
                    <p>Использовано компаний </p>
                    <p>Лимит по компаниям </p>
                  </div>
                  <div>
                    {" "}
                    <p>{info.eventFiltersInfo.usedCompanyCount}</p>
                    <p>{info.eventFiltersInfo.companyLimit}</p>
                  </div>
                </>
              ) : (
                "loading"
              )}
            </div>
            <div className={styles.account}>
              <div className='account-name'>
                <p>Иванов И. И.</p>
                <a href=''>выйти</a>
              </div>
              <img className='avatar' src='' alt='avatar' />
            </div>
          </>
        ) : (
          <>
            <div className={styles.account_info}></div>
            <div className={styles.account}>
              <a href='#'>Зарегистрироваться</a>
              <img src={separator} alt='|' />
              <a className={styles.link_button} href='/signin'>
                Войти
              </a>
            </div>
          </>
        )}
      </header>
    </>
  );
}
