import { App } from 'vue';

import regiesterElement from './regiester-element';
import regiesterEleIcon from './regiester-eleicon';
import regiesterProperties from './regiester-properties';

export function globalRegister(app: App): void {
  app.use(regiesterElement);
  // regiesterElement(app);
  app.use(regiesterEleIcon);
  app.use(regiesterProperties);
}
