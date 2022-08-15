import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedPriceListComponent } from './listed-price-list.component';

describe('ListedPriceListComponent', () => {
  let component: ListedPriceListComponent;
  let fixture: ComponentFixture<ListedPriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedPriceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
