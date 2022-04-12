// файл конфигурации для тулбара в хедере страницы
// ключ - имя роута, указанное в mfe-routing модуле для роута в свойстве data.name
// значение - объект с компонентом, который необходимо встроить в тулбар
/* eslint max-len:"off" */
import { PlotsToolbarButtonComponent } from '@/app/modules/tvd/components/plots-toolbar-button/plots-toolbar-button.component';

export default {
  basic: {
    component: PlotsToolbarButtonComponent,
  },
  create: {
    component: PlotsToolbarButtonComponent,
  },
  info: {
    component: PlotsToolbarButtonComponent,
  },
  edit: {
    component: PlotsToolbarButtonComponent,
  },
  formation: {
    component: PlotsToolbarButtonComponent,
  },
  'list-edit': {
    component: PlotsToolbarButtonComponent,
  },
};
