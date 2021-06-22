import { cardCreate, gameErrorClassClean, convertSeconds, gameGrid, congratulationPopup } from '../consts/helpers';
import dbr from './DBRequests';
import { Card, UserData } from '../consts/types';

export default class Game {
  cards: Card[];

  selectedCard: Card | undefined;

  currentCard: Card | undefined;

  selectionIndex: number;

  front: string;

  difficulty: number;

  success: number;

  failure: number;

  time: number;

  button: HTMLButtonElement;

  user: UserData;

  timer: any;

  score: number;

  constructor(difficulty: number, front: string, user: UserData) {
    this.front = front;
    this.difficulty = difficulty;
    this.cards = [];
    this.selectionIndex = NaN;
    this.success = 0;
    this.failure = 0;
    this.time = 0;
    this.user = user;
    this.score = 0;
    this.button = document.getElementById('register-btn') as HTMLButtonElement;
  }

  shuffle = (cardsArray: Card[]): Card[] => {
    const copy = cardsArray.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  preload(): Card[] {
    this.cards = [];

    for (let i = 0; i < this.difficulty; i += 2) {
      this.cards[i] = {
        front: `../src/assets/images/${this.front}/${i / 2 + 1}.jpg`,
      };
      this.cards[i + 1] = {
        front: `../src/assets/images/${this.front}/${i / 2 + 1}.jpg`,
      };
    }
    this.shuffle(this.cards);
    const cards = this.shuffle(this.cards);
    return cards;
  }

  startTimer = () => {
    const container = document.querySelector('.main__game-timer') as HTMLElement;

    if (this.button.textContent === 'stop game') {
      setTimeout(() => {
        this.time += 1;
        convertSeconds(this.time, container);
        return this.startTimer();
      }, 1000);
    }
  };

  stopTimer() {
    const maxScore = this.difficulty * 50;
    if (maxScore > (this.time + 1) * 10) {
      this.score = maxScore - (this.time + 1) * 10;
    } else {
      this.score = 0;
    }
    this.user.score = this.score;
    dbr.getNote(this.user);
    setTimeout(() => {
      const oldscore = dbr.score;

      if (oldscore < this.score) {
        dbr.updateScore(this.user);
      }
    }, 100);
    const popupObject = {
      success: this.success,
      failure: this.failure,
      time: this.time + 1,
      score: this.score,
    };
    congratulationPopup(popupObject);
  }

  checkCoincidence(event: MouseEvent, cardsArray: Card[]): void {
    const container = document.querySelector('.main__game-cards-container') as HTMLElement;
    let number: number = NaN;
    Array.from(container.children).forEach((card, index) => {
      if (card === event.target) {
        number = index;
      }
    });
    const wrongCards: number[] = [];

    if (!this.selectedCard && (event.target as HTMLImageElement).classList.contains('main__game-card_hidden')) {
      this.selectedCard = cardsArray[number];
      this.selectionIndex = number;
      container.children[this.selectionIndex].classList.remove('main__game-card_hidden');
    } else if (!this.currentCard && (event.target as HTMLImageElement).classList.contains('main__game-card_hidden')) {
      this.currentCard = cardsArray[number];
      container.children[number].classList.remove('main__game-card_hidden');
      setTimeout(() => {
        if (this.selectedCard?.front === this.currentCard?.front) {
          container.children[this.selectionIndex].classList.add('main__game-card_success');
          container.children[number].classList.add('main__game-card_success');
          this.success += 1;
          if (this.success === this.difficulty / 2) {
            this.button.textContent = 'one more';
            this.stopTimer();
          }
        } else {
          wrongCards.push(this.selectionIndex, number);
          container.children[this.selectionIndex].classList.add('main__game-card_failure');
          container.children[number].classList.add('main__game-card_failure');
          this.failure += 1;
        }
        this.selectedCard = undefined;
        this.currentCard = undefined;
        this.selectionIndex = NaN;
      }, 100);
      setTimeout(() => {
        if (wrongCards.length !== 0) {
          gameErrorClassClean(container.children, wrongCards[0]);
          gameErrorClassClean(container.children, wrongCards[1]);
        }
      }, 800);
    }
  }

  load(): void {
    const cards = this.preload();
    const container = document.querySelector('.main__game-cards-container') as HTMLElement;
    if (this.difficulty > 16) {
      gameGrid(this.difficulty, container);
    }
    cards.forEach((item: Card) => {
      cardCreate(item, this.front, container);
    });
    setTimeout(() => {
      const allCards = document.querySelectorAll('.main__game-card');
      Array.from(allCards).forEach((card) => {
        card.classList.add('main__game-card_hidden');
      });
      container.addEventListener('click', (event) => {
        this.checkCoincidence(event, cards);
      });
      this.startTimer();
    }, 30000);
  }
}
