import SearchForm from "./SearchForm.jsx";
import styles from "./search.module.scss";
import document_img from "../../../assets/Document.svg";
import folders_img from "../../../assets/Folders.svg";
import search_background from "../../../assets/search_background_img.svg";

export default function Search() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <div className={styles.heading__content}>
            <h1>Найдите необходимые данные в пару кликов.</h1>
            <div className={styles.heading__comment}>
              <p>
                Задайте параметры поиска. Чем больше заполните, тем точнее поиск
              </p>
            </div>
          </div>
          <div className={styles.heading__img}>
            <img src={document_img} alt='document image' />
            <img src={folders_img} alt='folders image' />
          </div>
        </div>

        <div className={styles.form_wrapper}>
          <SearchForm />
          <div className={styles.search_form_img}>
            <img src={search_background} alt='search_form img' />
          </div>
        </div>
      </div>
    </>
  );
}
