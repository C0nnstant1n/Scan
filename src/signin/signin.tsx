import { Form } from "react-router-dom";
import charactersImg from "../assets/Characters.svg";
import "./signin.scss";
export default function Signin() {
  const sign = {
    login: "",
    password: "",
  };
  return (
    <div className='authorization'>
      <div className='authorization_img'>
        <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
        <img src={charactersImg} alt='Ключ' />
      </div>
      <div className='authorization_form'>
        <ul>
          <li>
            <h2>
              <a href='#'>Войти</a>
            </h2>
          </li>
          <li>
            <h2>
              <a href='#'>Зарегистрироваться</a>
            </h2>
          </li>
        </ul>

        <Form action='signin'>
          <label htmlFor='login'>Логин или номер телефона</label>
          <input id='login' type='text' />
          <label htmlFor='password'>Пароль</label>
          <input type='password' />
          <button>Войти</button>
        </Form>
        <a href='#'>Восстановить пароль</a>
        <div className='alternative_signin'>
          <p>Войти через:</p>
          <div className='alternative_signin_links'>
            <button>Google</button>
            <button>facebook</button>
            <button>Yandex</button>
          </div>
        </div>
      </div>
    </div>
  );
}
