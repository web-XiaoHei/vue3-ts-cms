import { App } from 'vue';
import formatUtcString from '@/utils/date-formate';

export default function regiesterProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value);
    },
  };
}
