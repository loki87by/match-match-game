import Content from '../components/Content';
import { NewElement } from './types';

function setMarkup(parent: Element, elementsArray: Object[]) {
  if (elementsArray) {
    elementsArray.forEach((elementData: Object) => {
      const name = Object.keys(elementData)[0];
      const el = new Content(parent, name, Object.values(elementData)[0] as NewElement);
      return el;
    });
  }
}

function createMarkup(selectors: HTMLCollection, markupRepo: any) {
  if (markupRepo) {
    for (let i = 0; i < selectors.length; i += 1) {
      const obj = markupRepo[i];
      const currentName = selectors[i].nodeName.toLowerCase();
      if (obj[currentName].children) {
        setMarkup(selectors[i], obj[currentName].children);
        createMarkup(selectors[i].children, obj[currentName].children);
      }
    }
  }
}

export { setMarkup, createMarkup };
