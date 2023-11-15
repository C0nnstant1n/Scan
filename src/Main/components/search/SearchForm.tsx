import styles from "./search.module.scss";
import {
  getInputNumbersValue,
  getFormattedValue,
} from "./components/FormatValues";
import validateInn, {
  DateValidate,
  dateIntervalValidate,
} from "./components/Validators";
import { useState } from "react";
import {
  useLocation,
  useNavigation,
  useActionData,
  Form,
} from "react-router-dom";

export default function SearchForm() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let from = params.get("form") || "/";

  const navigation = useNavigation();
  let isINN = navigation.formData?.get("inn") != null;
  // let actionData = useActionData() as { error: string } | undefined;

  const [fieldInnValid, setFieldInnValid] = useState({
    code: 1,
    message: "заполните поле",
  });
  const [fieldCountValid, setFieldCount] = useState({
    code: false,
    message: "заполните поле",
  });
  const [fieldDate, setFieldDate] = useState({
    dateFrom: false as Date | boolean,
    dateTo: false as Date | boolean,
    message: "введите корректные данные",
  });

  const dateInterval = dateIntervalValidate(
    fieldDate.dateFrom,
    fieldDate.dateTo
  );
  fieldDate.message = dateInterval.message;

  return (
    <Form className={styles.search_form} method='post' replace>
      <input type='hidden' name='redirectTo' value={from} />
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
            name='inn'
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
          <select name='tonality' id='TONE'>
            <option value='Любая'>Любая</option>
            <option value='1'>Позитивная</option>
            <option value='2'>Негативная</option>
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

        <label
          className={
            styles.range +
            " " +
            (fieldDate.dateFrom && fieldDate.dateTo
              ? styles.valid
              : styles.error)
          }
        >
          <span>
            Диапазон поиска <sup>*</sup>
          </span>
          <br />
          <input
            id={fieldDate.dateFrom ? styles.range_from : "dateFrom"}
            name='startDate'
            type='date'
            placeholder='Дата начала'
            required
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              const dateValue = e.target.value;
              const fields = {
                dateFrom: DateValidate(dateValue),
                dateTo: fieldDate.dateTo,
                message: "Заполните конечную дату ",
              };
              setFieldDate(fields);
            }}
          />
          <input
            id={fieldDate.dateTo ? styles.range_to : "dateTo"}
            name='endDate'
            type='date'
            placeholder='Дата конца'
            required
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              const dateValue = e.target.value;
              const fields = {
                dateFrom: fieldDate.dateFrom,
                dateTo: DateValidate(dateValue),
                message: "Заполните начальную дату ",
              };
              setFieldDate(fields);
            }}
          />
          <p>{fieldDate.message}</p>
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
          <input id='role' type='checkbox' name='onlyMainRole' />
          <label htmlFor='role'>Главная роль в публикации</label>
        </li>
        <li>
          <input id='risc' type='checkbox' name='onlyWithRiskFactors' />
          <label htmlFor='risc'>Публикации только с риск-факторами</label>
        </li>
        <li>
          <input id='technic' type='checkbox' name='excludeTechNews' />
          <label htmlFor='technic'>Включать технические новости рынков</label>
        </li>
        <li>
          <input id='announce' type='checkbox' name='excludeAnnouncements' />
          <label htmlFor='announce'>Включать анонсы и календари</label>
        </li>
        <li>
          <input id='news' type='checkbox' name='excludeDigests' />
          <label htmlFor='news'>Включать сводки новостей</label>
        </li>

        <button
          type='submit'
          disabled={
            !(
              (!fieldInnValid.code ? true : false) &&
              fieldCountValid.code &&
              dateInterval.code
            )
          }
        >
          {isINN ? "Поиск...." : "Поиск"}
        </button>
        <p>
          <sup>*</sup> Обязательные к заполнению поля
        </p>
      </ul>
    </Form>
  );
}
