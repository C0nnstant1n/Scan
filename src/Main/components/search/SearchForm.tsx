import styles from "./search.module.scss";
export default function SearchForm() {
  return (
    <form className={styles.search_form} action=''>
      <ul className={styles.search_form__input}>
        <label htmlFor='INN'>
          ИНН компании <sup>*</sup>
        </label>
        <input id='INN' type='text' />

        <label htmlFor='TONE'>Тональность</label>
        <input id='TONE' type='text' />

        <label htmlFor='COUNT'>
          Количество документов в выдаче <sup>*</sup>
        </label>
        <input id='COUNT' type='text' />

        <label className={styles.RANGE} htmlFor='RANGE'>
          Диапазон поиска <sup>*</sup>
          <br />
          <input
            className={styles.RANGE_from}
            id={styles.RANGE_from}
            type='text'
          />
          <input className={styles.RANGE_to} id={styles.RANGE_to} type='text' />
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
        <button>Поиск</button>
        <p>* Обязательные к заполнению поля</p>
      </ul>
    </form>
  );
}
