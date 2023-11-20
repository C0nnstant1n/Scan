import { IDocResponse } from "../../../../api/doc_interfaces";
import styles from "./documentcard.module.scss";

interface Iprops {
  requestItem: IDocResponse;
}

export default function DocumentCard({ requestItem }: Iprops) {
  console.log(requestItem);

  const date = new Date(requestItem.ok.issueDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className={styles.document_card}>
      <div className={styles.document_card__wrapper}>
        <div className={styles.document_card___header}>
          <p>{date.toLocaleString("ru", options)}</p>
          <a href={requestItem.ok.url}>{requestItem.ok.source.name}</a>
        </div>

        <div className={styles.document_card__content}>
          <h2>{requestItem.ok.title.text}</h2>
          {requestItem.ok.attributes.isDigest && (
            <div className={styles.content__tag}>Сводки новостей</div>
          )}
          {requestItem.ok.attributes.isTechNews && (
            <div className={styles.content__tag}>Технические новости</div>
          )}
          {requestItem.ok.attributes.isAnnouncement && (
            <div className={styles.content__tag}>Анонсы и события</div>
          )}

          <div className={styles.content__img}>
            <div className={styles.img_wrapper}>
              <img src='' alt='document picture' />
            </div>
          </div>
        </div>
        <div className={styles.document_card__footer}>
          <button>Читать в источнике</button>
          <p>{requestItem.ok.attributes.wordCount} слова</p>
        </div>
      </div>
    </div>
  );
}
