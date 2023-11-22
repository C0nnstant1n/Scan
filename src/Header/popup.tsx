import styles from "./header.module.scss";
import popup_styles from "./popup.module.scss";

export default function PopUp({ user }) {
  let isAuthorized = false;
  console.log(user);
  user ? (isAuthorized = true) : (isAuthorized = false);
  return (
    <div className={styles.popup}>
      <div className={popup_styles.heading}>
        <div className={popup_styles.logo_img}></div>
        <div className={popup_styles.button}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='25'
            viewBox='0 0 25 25'
            fill='none'
          >
            <rect
              x='3.53613'
              width='30'
              height='5'
              transform='rotate(45 3.53613 0)'
              fill='white'
            />
            <rect
              x='24.7485'
              y='3.53564'
              width='30'
              height='5'
              transform='rotate(135 24.7485 3.53564)'
              fill='white'
            />
          </svg>
        </div>
      </div>
      <div className={popup_styles.main}>
        <div className={popup_styles.navig}>
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
          {isAuthorized ? (
            <div className='12'>
              <div className={styles.account__name}>
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
            </div>
          ) : (
            <div className={styles.account}>
              <a href='#'>Зарегистрироваться</a>
              <a className={styles.account__link_button} href='/signin'>
                Войти
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
