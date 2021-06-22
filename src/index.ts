import './assets/normalize.css';
import './style.css';
import { setMarkup, createMarkup } from './consts/preload';
import { findComponentByPath, parseLocation } from './consts/helpers';
import gameMarkup from './consts/gameMarkup';
import FormValidator from './components/FormValidator';
import { mainMarkup, formElement } from './consts/staticMarkup';
import routes from './consts/constants';
import ErrorComponent from './consts/errorPageMarkup';
import Game from './components/Game';
import dbr from './components/DBRequests';
import { MarkupElement, UserData } from './consts/types';

interface GameInterface extends Game {}
const page = document.body;
setMarkup(page, mainMarkup);
createMarkup(page.children, mainMarkup);
const user: UserData = {};
user.score = 0;
let game: any;
const regButton = document.getElementById('register-btn') as HTMLButtonElement;
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('form-reset');
const inputs = document.querySelectorAll('input');
const form = document.forms[0];
const upload = document.getElementById('form-file');
const submit = document.getElementById('form-submit');
const userAvatar = document.getElementById('user-avatar') as HTMLImageElement;
const main = document.querySelector('main');
const nav = document.querySelectorAll('.header__navigation-item');
let gameDifficulty: number;
let cardsImageType = 'animals';
let isLoggedIn = false;
let gameProgress = 'none';
let gamePlay: GameInterface;

dbr.initial();

function validation() {
  const valid = new FormValidator(formElement, form);
  valid.enableValidation();
}

function openPopup() {
  popup?.classList.add('popup_opened');
  validation();
}

function closePopup() {
  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].value = '';
  }
  popup?.classList.remove('popup_opened');
}

function startGame(difficulty: number, type: string) {
  game = new Game(difficulty, type, user);
  gamePlay = game;
  gamePlay.load();
}

function login() {
  closePopup();
  isLoggedIn = true;
  regButton.textContent = 'start game';
  userAvatar.src = user.avatar || '../src/assets/icons/avatar.png';
  userAvatar.classList.remove('header__user-block-img_unauthorized');
}

function uploadFile(this: any) {
  const fileList = this.files;
  const file = fileList[0];
  const avatar = document.getElementById('popup-avatar');
  let avaUrl: any;
  const image = new Image();
  image.src = window.URL.createObjectURL(file);
  image.onload = () => {
    const maxSize = Math.min(image.width, image.height);
    const canvas = document.createElement('canvas');
    canvas.width = maxSize;
    canvas.height = maxSize;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0, maxSize, maxSize);
    avaUrl = ctx?.canvas.toDataURL(`image.png`);
    (avatar as HTMLImageElement).src = avaUrl;
    user.avatar = avaUrl;
  };
}

class App {
  currentPage: any;

  container: HTMLElement;

  nav: HTMLElement | null;

  difficulty: number;

  type: string;

  constructor(container: HTMLElement, currentPage: Object) {
    this.container = container;
    this.currentPage = currentPage;
    this.difficulty = 16;
    this.type = 'animals';
    this.nav = document.querySelector('nav');
    this.route = this.route.bind(this);
  }

  initApp() {
    main!.innerHTML = '';
    this.render(this.currentPage);
    this.nav?.addEventListener('click', this.route);
  }

  mainFuncs() {
    const popupImg = document.querySelector('.main__about-rule-image_popup');
    const settingsImg = document.querySelector('.main__about-rule-image_settings');
    const gameImg = document.querySelector('.main__about-rule-image_game');

    if (!isLoggedIn) {
      gameImg?.classList.remove('main__about-rule-image_game_enabled');
    } else {
      gameImg?.classList.add('main__about-rule-image_game-enabled');
    }
    settingsImg?.addEventListener('click', () => {
      this.route(nav[2]);
    });
    popupImg?.addEventListener('click', () => {
      openPopup();
    });
    gameImg?.addEventListener('click', () => {
      if (!isLoggedIn) {
        return;
      }
      startGame(gameDifficulty || 16, cardsImageType);
      window.location.hash = 'page3';
    });
  }

  settingsFuncs() {
    const diff = <HTMLInputElement>document.getElementById('difficulty');
    diff.addEventListener('change', () => {
      this.difficulty = +diff.value;
      gameDifficulty = this.difficulty;
    });

    const cardsType = <HTMLInputElement>document.getElementById('cards-type');
    cardsType.addEventListener('change', () => {
      this.type = cardsType.value;
      cardsImageType = this.type;
    });
  }

  render(markupElement?: MarkupElement) {
    const markup = markupElement?.content || this.currentPage;
    setMarkup(this.container, markup);
    createMarkup(this.container.children, markup);
    if (markupElement?.id === 'main') {
      this.mainFuncs();
    }
    if (markupElement?.id === 'settings') {
      this.settingsFuncs();
    }
    if (markupElement?.id === 'score') {
      dbr.getAndDisplayScores();
    }
    if (markupElement?.id === 'game') {
      startGame(gameDifficulty || 16, cardsImageType);
      window.location.hash = 'page3';
    }
  }

  route(element: any) {
    const old = this.nav?.querySelector('.header__navigation-item_active');
    let target;

    if (element.target) {
      target = element.target;
    } else {
      target = element;
    }
    old?.classList.remove('header__navigation-item_active');
    target.classList.add('header__navigation-item_active');
    const uri = target.id || target.parentNode.id;
    if (window.location.hash === uri) {
      return;
    }
    window.location.hash = uri;
  }
}

function renderToGame() {
  main!.innerHTML = '';
  const app = new App(main as HTMLElement, gameMarkup);
  app.initApp();
}

function unpauseGame() {
  gamePlay.startTimer();
}

function mainButtonSwich() {
  if (!isLoggedIn) {
    openPopup();
    return;
  }

  const href = window.location.hash;

  if (href !== '#page3') {
    window.location.hash = '#page3';
    gameProgress = 'none';
    renderToGame();
  }
  if (regButton.textContent === 'one more') {
    gameProgress = 'none';
    renderToGame();
    regButton.textContent = 'stop game';
  }

  if (gameProgress === 'none') {
    renderToGame();
    gameProgress = 'started';
    regButton.textContent = 'stop game';
  } else if (gameProgress === 'started') {
    gameProgress = 'paused';
    regButton.textContent = 'continue game';
  } else {
    unpauseGame();
    gameProgress = 'started';
    regButton.textContent = 'stop game';
  }
}

const router = () => {
  const path = parseLocation();
  const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
  main!.innerHTML = '';
  const app = new App(main as HTMLElement, component);
  app.initApp();
  const old = document.querySelector('.header__navigation-item_active');
  old?.classList.remove('header__navigation-item_active');
  const young = document.getElementById(`${path}`);
  young?.classList.add('header__navigation-item_active');
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
regButton.addEventListener('click', mainButtonSwich);
closePopupBtn?.addEventListener('click', closePopup);
(upload as HTMLInputElement).addEventListener('change', uploadFile);
page.addEventListener('click', (evt: MouseEvent) => {
  if ((evt.target as HTMLElement).classList.contains('popup_opened')) {
    closePopup();
  }
});
window.addEventListener('keyup', (evt: KeyboardEvent) => {
  if (evt.key === 'Escape') {
    closePopup();
  }
});
(submit as HTMLButtonElement).addEventListener('click', () => {
  const timestamp = Date.now();
  user.name = inputs[0].value;
  user.last = inputs[1].value;
  user.email = inputs[2].value;
  user.timestamp = timestamp;
  dbr.addUser(user, login);
});
