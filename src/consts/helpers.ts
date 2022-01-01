import { ElementParams, Card, UserData, Route, DbElement, PopupObject } from './types';

const createElement = (tagName: string, params: ElementParams, container?: HTMLElement, text?: string) => {
  const element = document.createElement(tagName);

  if (text) {
    element.textContent = text;
  }

  Object.entries(params).forEach((param) => {
    element.setAttribute(String(param[0]), String(param[1]));
  });

  if (container) {
    container.appendChild(element);
  }

  return element;
};
function cardCreate(item: Card, name: string, container: HTMLElement): void {
  const data: ElementParams = {
    class: 'main__game-card',
    src: `${item.front}`,
    alt: `some ${name}`,
  };
  createElement('img', data, container);
}
function scoresListCreate(container: HTMLElement, arg: UserData) {
  const listItem = createElement(`li`, { class: 'main__score-item' }, container);
  const userInfo = createElement(`div`, { class: 'main__score-user' }, listItem);
  const scoreInfo = createElement(`div`, { class: 'main__score-score-info' }, listItem);
  createElement(
    `img`,
    { class: 'main__score-avatar', src: arg.avatar || '../src/assets/icons/avatar.png', alt: 'avatar' },
    userInfo,
  );
  createElement(`h3`, { class: 'main__score-name' }, userInfo, `${arg.name} ${arg.last}`);
  createElement(`h4`, { class: 'main__score-email' }, userInfo, `${arg.email}`);
  createElement(`h3`, { class: 'main__score-score-text' }, scoreInfo, `Score:  `);
  createElement(`h3`, { class: 'main__score-score-count' }, scoreInfo, `${arg.score}`);
}
const findComponentByPath = (path: string, routs: Route[]) =>
  routs.find((i: Route) => i.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;
const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';
function createErrorPopup(e: Event) {
  const error = document.createElement('h1');
  const message = String((e.target as DbElement).errorCode).concat('. Sorry, please retry later.');
  error.textContent = message;
  error.classList.add('unknown-db-error');
  setTimeout(() => {
    error.remove();
  }, 5000);
}
function displayScores(data: UserData[]) {
  const content = document.querySelector('.main__content') as HTMLElement;
  data.forEach((user) => {
    scoresListCreate(content, user);
  });
}
function gameErrorClassClean(cardsArray: HTMLCollection, wrongIndex: number) {
  cardsArray[wrongIndex].classList.remove('main__game-card_failure');
  cardsArray[wrongIndex].classList.add('main__game-card_hidden');
}
const timeToString = (timeUnit: number) => {
  let result = '';
  if (timeUnit < 10) {
    result = `0${String(timeUnit)}`;
  } else {
    result = String(timeUnit);
  }
  return result;
};

function timeCounter(mins: number, secs: number, element: HTMLElement) {
  let minutes;
  if (mins > 60) {
    const hours = timeToString(Math.floor(mins / 60));
    const ms = timeToString(Math.floor(mins % 60));
    minutes = `${hours}:${ms}`;
  } else {
    minutes = timeToString(mins);
  }
  const seconds = timeToString(secs);
  const container = element;
  container.textContent = `${minutes}:${seconds}`;
}

function convertSeconds(time: number, container: HTMLElement) {
  let minutes = 0;
  let seconds = 0;
  if (time > 59) {
    minutes = Math.floor(time / 60);
    seconds = time % 60;
  } else {
    seconds = time;
  }
  timeCounter(minutes, seconds, container);
}

function gameGrid(difficulty: number, container: HTMLElement) {
  const rows = Math.floor(Math.sqrt(difficulty));
  const columns = difficulty / rows;
  const verticalShift = (columns - 1) * 2;
  const horizontalShift = (columns - 1) * 2;
  const templateColumnsValue = `repeat(${columns}, ${(100 - verticalShift) / columns}%)`;
  const templateRowsValue = `repeat(${rows}, ${(100 - horizontalShift) / rows}%)`;
  container.setAttribute(
    'style',
    `grid-template-columns: ${templateColumnsValue}; grid-template-rows: ${templateRowsValue}`,
  );
}

function congratulationPopup(params: PopupObject) {
  const main = document.querySelector('main') as HTMLElement;
  const popup = createElement('div', { class: 'popup popup_opened popup_congratulations' }, main);
  const popupContainer = createElement('div', { class: 'popup__container' }, popup);
  const text = `Congratulations! You won with ${params.success + params.failure} attempts in ${
    params.time
  } seconds and scored ${
    params.score
  } points. To try again, click "One more", or click "ok" to be redirected to the page of records.`;
  createElement('h3', { class: 'popup__text' }, popupContainer, text);
  createElement('a', { href: '#page1', class: 'popup__link' }, popupContainer, 'ok');
}

export {
  cardCreate,
  createElement,
  findComponentByPath,
  displayScores,
  createErrorPopup,
  parseLocation,
  gameErrorClassClean,
  convertSeconds,
  gameGrid,
  congratulationPopup,
};
