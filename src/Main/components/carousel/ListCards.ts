import clock from "../../../assets/clock-ico.svg";
import search from "../../../assets/search-ico.svg";
import defense from "../../../assets/defense-ico.svg";

interface IcarouselList {
  img: string;
  text: string;
}

const carouselList: IcarouselList[] = [
  {
    img: `${clock}`,
    text: "Высокая и оперативная скорость обработки заявки",
  },

  {
    img: `${search}`,
    text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
  },

  {
    img: `${defense}`,
    text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
  },
  {
    img: `${defense}`,
    text: "1",
  },
  {
    img: `${defense}`,
    text: "2",
  },
  {
    img: `${defense}`,
    text: "3",
  },
];

export default carouselList;
export type { IcarouselList };
