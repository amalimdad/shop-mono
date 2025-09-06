import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesCatalog } from './features-catalog';

describe('FeaturesCatalog', () => {
  let component: FeaturesCatalog;
  let fixture: ComponentFixture<FeaturesCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesCatalog],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesCatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
