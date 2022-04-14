import EventBus from '@devsun/utility-event-bus';

declare global {
  interface Window {
    EventBus: EventBus;
    authService: any;
    env: { [key: string]: any };
  }
}
