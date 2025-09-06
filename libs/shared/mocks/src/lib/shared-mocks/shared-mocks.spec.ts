import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedMocks } from './shared-mocks';

describe('SharedMocks', () => {
  let component: SharedMocks;
  let fixture: ComponentFixture<SharedMocks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedMocks],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedMocks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
