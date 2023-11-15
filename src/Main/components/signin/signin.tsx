import {
  Form,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import charactersImg from "../../../assets/Characters.svg";
import styles from "./signin.module.scss";
import lock from "../../../assets/lock.svg";
import google from "../../../assets/google_button.svg";
import facebook from "../../../assets/facebook_button.svg";
import yandex from "../../../assets/yandex_button.svg";
import { useState } from "react";

export default function Signin() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let from = params.get("form") || "/";

  const navigation = useNavigation();
  let isLogginIn = navigation.formData?.get("login") != null;
  let actionData = useActionData() as { error: string } | undefined;
  console.log(actionData);

  const [loginCheck, setLoginCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  return (
    <>
      <div className={styles.authorization}>
        <div className={styles.authorization_img}>
          <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
          <img src={charactersImg} alt='Ключ' />
        </div>
        <div className={styles.authorization_form}>
          <img className={styles.lock_img} src={lock} alt='Замок' />
          <ul>
            <li>
              <h2>
                <a className={styles.active_tab} href='#'>
                  Войти
                </a>
              </h2>
              <p className={styles.active_tab}>
                <b>________________</b>
              </p>
            </li>
            <li className={styles.inactive_tab}>
              <h2>
                <a className={styles.inactive_tab} href='#'>
                  Зарегистрироваться
                </a>
              </h2>
              <p className={styles.inactive_tab}>
                <b>_______________________________</b>
              </p>
            </li>
          </ul>

          <Form method='post' replace>
            <input type='hidden' name='redirectTo' value={from} />
            <label htmlFor='login'>Логин или номер телефона</label>
            <input
              id='login'
              name='login'
              type='text'
              required
              minLength={8}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLoginCheck(e.target.checkValidity())
              }
            />
            <label htmlFor='password'>Пароль</label>
            <input
              id='password'
              name='password'
              type='password'
              minLength={7}
              required
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPasswordCheck(e.target.checkValidity())
              }
            />
            <button
              className={styles.active_button}
              disabled={!(passwordCheck && loginCheck)}
              type='submit'
            >
              {isLogginIn ? "Вход..." : "Войти"}
            </button>
            {actionData && actionData.error ? (
              <div className={styles.error}>
                <p style={{ color: "red" }}>{actionData.error}</p>
              </div>
            ) : null}
          </Form>

          <a href='#'>Восстановить пароль</a>

          <div className={styles.alternative_signin}>
            <p>Войти через:</p>
            <div className={styles.alternative_signin_links}>
              <button>
                <img src={google} alt='google' />
              </button>
              <button>
                <img src={facebook} alt='facebook' />
              </button>
              <button>
                <img src={yandex} alt='yandex' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
