import { IDocResponse } from "../../../../api/doc_interfaces";
import styles from "./documentcard.module.scss";
import scanLogo from "../../../../assets/logo.svg";

interface Iprops {
  requestItem: IDocResponse;
}

export default function DocumentCard({ requestItem }: Iprops) {
  // console.log(requestItem);

  const date = new Date(requestItem.ok.issueDate);

  const parser = new DOMParser();
  const xmlDom = parser.parseFromString(
    requestItem.ok.content.markup,
    "text/xml"
  );
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const scanDocDom = xmlDom.querySelector("scandoc");
  const text = scanDocDom?.textContent;
  let img = text?.match(/<img[^>]+src="([^"]+)"*/g)?.[0];
  const imgUrl = img?.match(/"([^"]+)"*/)?.[0];

  let backgroundImage = {
    backgroundImage: `url(${scanLogo})`,
  };

  if (imgUrl) {
    backgroundImage = {
      backgroundImage: `url(${imgUrl})`,
    };
  }

  let splitedText = text?.slice(0, 500).split("</p>");
  // console.log(splitedText);

  function removeHTML(str: string) {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }

  let clearedParagraph: string[] = [];
  splitedText?.forEach((item) => {
    clearedParagraph.push(removeHTML(item));
  });
  // console.log(splitedText);

  return (
    <div className={styles.document_card}>
      <div className={styles.document_card__wrapper}>
        <div className={styles.document_card___header}>
          <p>{date.toLocaleString("ru", options)}</p>
          <a href={requestItem.ok.url} target='_blank' rel='noreferrer'>
            {requestItem.ok.source.name}
          </a>
        </div>

        <div className={styles.document_card__content}>
          <h2>{requestItem.ok.title.text}</h2>
          <div className={styles.content__tags}>
            {requestItem.ok.attributes.isDigest && (
              <div className={styles.content__tag}>Сводки новостей</div>
            )}
            {requestItem.ok.attributes.isTechNews && (
              <div className={styles.content__tag}>Технические новости</div>
            )}
            {requestItem.ok.attributes.isAnnouncement && (
              <div className={styles.content__tag}>Анонсы и события</div>
            )}
          </div>
          <div className={styles.content__img} style={backgroundImage}></div>
          <div className={styles.content__text}>
            {clearedParagraph.map((item, index) => (
              <div key={item.slice(0, 20) + index}>
                <p>{item}</p>
                <br key={item.slice(0, 20) + index + "123"} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.document_card__footer}>
          <a
            href={requestItem.ok.url}
            target='_blank'
            rel='noreferrer'
            className={styles.document_card__link_button}
          >
            Читать в источнике
          </a>
          <p>{requestItem.ok.attributes.wordCount} слова</p>
        </div>
      </div>
    </div>
  );
}
