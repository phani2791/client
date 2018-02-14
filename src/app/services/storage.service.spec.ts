import {
  inject,
  TestBed
} from '@angular/core/testing';
import {BrowserService} from './browser.service';
import {StorageService} from './storage.service';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService, BrowserService]
    });
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    pending('not implemented');
  }));
});
