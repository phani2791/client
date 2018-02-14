import {inject, TestBed} from '@angular/core/testing';

import {BrowserService} from './browser.service';
import {GoogleAnalyticsService} from './google-analytics.service';

describe('BrowserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BrowserService,
        GoogleAnalyticsService
      ]
    });
  });

  it('should be created', inject([BrowserService], (service: BrowserService) => {
    pending('not implemented');
  }));
});
