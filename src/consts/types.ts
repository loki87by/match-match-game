interface UserData {
  name?: string;
  last?: string;
  email?: string;
  avatar?: string;
  score?: number;
  timestamp?: number | undefined;
}

interface PopupObject {
  success: number;
  failure: number;
  time: number;
  score: number;
}

interface MarkupElement {
  content: Object[];
  id: string;
}

interface Route {
  path: string;
  component: Object;
}

interface DbElement {
  result?: Object;
  errorCode?: Object;
}

interface Card {
  front: string;
}

type ElementParams = Record<string, string | number>;

type NewElement = Record<string, string | number | boolean>;

type FormElement = Record<string, string>;

export { ElementParams, Card, PopupObject, Route, DbElement, MarkupElement, UserData, NewElement, FormElement };
