import { App } from 'vue';

import regiesterElement from './regiester-element';

export function globalRegister(app: App): void {
  app.use(regiesterElement);
  // regiesterElement(app);
}
