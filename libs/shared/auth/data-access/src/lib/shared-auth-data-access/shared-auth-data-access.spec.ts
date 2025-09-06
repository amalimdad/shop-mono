import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedAuthDataAccess } from './shared-auth-data-access';

describe('SharedAuthDataAccess', () => {
  let component: SharedAuthDataAccess;
  let fixture: ComponentFixture<SharedAuthDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedAuthDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedAuthDataAccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
