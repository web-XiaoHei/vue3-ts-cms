import { App } from 'vue';

import regiesterElement from './regiester-element';
import regiesterEleIcon from './regiester-eleicon';

export function globalRegister(app: App): void {
  app.use(regiesterElement);
  // regiesterElement(app);
  app.use(regiesterEleIcon);
}
