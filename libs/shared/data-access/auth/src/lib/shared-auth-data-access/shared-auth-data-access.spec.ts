import { TestBed } from '@angular/core/testing';
import {
  AuthService,
  AuthStore,
  FakeApiService,
} from './shared-auth-data-access';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('AuthStore', () => {
  let store: AuthStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(AuthStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with unauthenticated state', () => {
    expect(store.isAuthenticated()).toBe(false);
    expect(store.user()).toBeUndefined();
    expect(store.token()).toBeUndefined();
  });
});

describe('FakeApiService', () => {
  let service: FakeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
