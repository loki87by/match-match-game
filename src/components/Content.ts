import { NewElement } from '../consts/types';

export default class Content {
  child: HTMLElement;

  constructor(parent: Element, name: string, children: NewElement) {
    this.child = document.createElement(`${name}`);
    if (children.class) {
      this.child.className = children.class as string;
    }

    if (children.text) {
      this.child.textContent = children.text as string;
    }

    if (children.id) {
      this.child.id = children.id as string;
    }

    if (children.src) {
      (<HTMLImageElement>this.child).src = children.src as string;
    }

    if (children.alt) {
      (<HTMLImageElement>this.child).alt = children.alt as string;
    }

    if (children.href) {
      (<HTMLAnchorElement>this.child).href = children.href as string;
    }

    if (children.target) {
      (<HTMLAnchorElement>this.child).target = children.target as string;
    }

    if (children.for) {
      (<HTMLLabelElement>this.child).htmlFor = children.for as string;
    }

    if (children.type) {
      (<HTMLInputElement>this.child).type = children.type as string;
    }

    if (children.value) {
      (<HTMLInputElement>this.child).value = children.value as string;
    }

    if (children.placeholder) {
      (<HTMLInputElement>this.child).placeholder = children.placeholder as string;
    }

    if (children.required) {
      (<HTMLInputElement>this.child).required = children.required as boolean;
    }

    if (children.accept) {
      (<HTMLInputElement>this.child).accept = children.accept as string;
    }

    if (children.pattern) {
      (<HTMLInputElement>this.child).pattern = children.pattern as string;
    }

    if (children.max) {
      (<HTMLInputElement>this.child).maxLength = children.max as number;
    }

    if (children.disabled) {
      (<HTMLInputElement>this.child).disabled = children.disabled as boolean;
    }

    if (children.selected) {
      (<HTMLOptionElement>this.child).selected = children.selected as boolean;
    }
    parent.appendChild(this.child);
  }
}
