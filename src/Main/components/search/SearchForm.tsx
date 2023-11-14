import styles from "./search.module.scss";
import {
  getInputNumbersValue,
  getFormattedValue,
} from "./components/FormatValues";
import validateInn from "./components/Validators";
import { useState } from "react";

export default function SearchForm() {
  const [fieldInnValid, setFieldInnValid] = useState({
    code: 1,
    message: "заполните поле",
  });
  const [fieldCountValid, setFieldCount] = useState({
    code: false,
    message: "заполните поле",
  });
  const [fieldDate, setFieldDate] = useState({
    code: false,
    dateFrom: "",
    dateTo: "",
    message: "заполните оба поля",
  });

  return (
    <form className={styles.search_form} action=''>
      <ul className={styles.search_form__input}>
        <label
          htmlFor='INN'
          className={fieldInnValid.code ? styles.error : styles.valid}
        >
          <span>
            ИНН компании <sup>*</sup>
          </span>

          <br />
          <input
            id='INN'
            type='text'
            placeholder='10 цифр'
            maxLength={12}
            required
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              let input = e.target,
                formattedInputValue = getFormattedValue(
                  getInputNumbersValue(input)
                );
              setFieldInnValid(validateInn(formattedInputValue));
              input.value = formattedInputValue;
            }}
          />
          <p>{fieldInnValid.message}</p>
        </label>

        <label htmlFor='TONE'>
          <span>Тональность</span>
          <br />
          <select name='tone' id='TONE'>
            <option value='Любая'>Любая</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          <p style={{ visibility: "hidden" }}>hide </p>
        </label>

        <label
          htmlFor='COUNT'
          className={fieldCountValid.code ? styles.valid : styles.error}
        >
          <span>
            Количество документов в выдаче <sup>*</sup>
          </span>
          <br />
          <input
            id='COUNT'
            type='number'
            min={1}
            max={1000}
            required
            placeholder='от 1 до 1000'
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              Number(e.target.value) >= 1 && Number(e.target.value) <= 1000
                ? setFieldCount({ code: true, message: "Ok" })
                : setFieldCount({ code: false, message: "Неверное значение" });
            }}
          />
          <p>{fieldCountValid.message}</p>
        </label>

        <label className={styles.range + " " + styles.error}>
          <span>
            Диапазон поиска <sup>*</sup>
          </span>
          <br />
          <input
            className={styles.range_from}
            name='dateFrom'
            type='date'
            placeholder='Дата начала'
            required
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              const d = fieldDate;
              d.dateFrom = new Date(e.target.value);
              console.log(fieldDate.dateFrom);
              // let date = `${fieldDate.dateFrom.getFullYear()}-${fieldDate.dateFrom.getMonth()}-${fieldDate.dateFrom.getDate()}`;

              console.log(e.target.value);

              setFieldDate(d);
            }}
          />
          <input
            className={styles.range_to}
            name='date_to'
            type='date'
            placeholder='Дата конца'
            required
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              const d = fieldDate;
              d.dateTo = new Date(e.target.value);
              d.code = true;
              console.log(d);

              setFieldDate(d);
              console.log(fieldDate);
            }}
          />
          <p>Введите корректные данные</p>
        </label>
      </ul>
      <ul className={styles.search_form__checkbox}>
        <li>
          <input id='completeness' type='checkbox' />
          <label htmlFor='completeness'>Признак максимальной полноты</label>
        </li>
        <li>
          <input id='mentions' type='checkbox' />
          <label htmlFor='mentions'>Упоминания в бизнес-контексте</label>
        </li>
        <li>
          <input id='role' type='checkbox' />
          <label htmlFor='role'>Главная роль в публикации</label>
        </li>
        <li>
          <input id='risc' type='checkbox' />
          <label htmlFor='risc'>Публикации только с риск-факторами</label>
        </li>
        <li>
          <input id='technic' type='checkbox' />
          <label htmlFor='technic'>Включать технические новости рынков</label>
        </li>
        <li>
          <input id='announce' type='checkbox' />
          <label htmlFor='announce'>Включать анонсы и календари</label>
        </li>
        <li>
          <input id='news' type='checkbox' />
          <label htmlFor='news'>Включать сводки новостей</label>
        </li>
        <p>inn {String(!fieldInnValid.code ? true : false)}</p>
        <p>count {fieldCountValid.code.toString()}</p>
        <p>date {fieldDate.code.toString()}</p>
        <p>
          {" "}
          all{" "}
          {String(
            (!fieldInnValid.code ? true : false) &&
              fieldCountValid.code &&
              fieldDate.code
              ? true
              : false
          )}
        </p>

        <button
          disabled={
            (!fieldInnValid.code ? true : false) &&
            fieldCountValid.code &&
            fieldDate.code
              ? false
              : true
          }
        >
          Поиск
        </button>
        <p>
          <sup>*</sup> Обязательные к заполнению поля
        </p>
      </ul>
    </form>
  );
}
