import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUComponent } from './lista-u.component';

describe('ListaUComponent', () => {
  let component: ListaUComponent;
  let fixture: ComponentFixture<ListaUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaUComponent]
    });
    fixture = TestBed.createComponent(ListaUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
