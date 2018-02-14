import {Injectable} from '@angular/core';

@Injectable()
export class BrowserService {

  get document(): any {
    return document;
  }

  get window(): any {
    return window;
  }

  get Stripe(): any {
    return (window as any).Stripe;
  }

  get sessionStorage(): any {
    return (this.window || {}).sessionStorage || null;
  }

  get localStorage(): any {
    return (this.window || {}).localStorage || null;
  }
}
