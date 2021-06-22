import Main from './mainMarkup';
import Score from './scoreMarkup';
import Settings from './settingsMarkup';
import gameMarkup from './gameMarkup';
import { Route } from './types';

const routes: Route[] = [
  { path: '/', component: Main },
  { path: 'page1', component: Score },
  { path: 'page2', component: Settings },
  { path: 'page3', component: gameMarkup },
];

export default routes;
