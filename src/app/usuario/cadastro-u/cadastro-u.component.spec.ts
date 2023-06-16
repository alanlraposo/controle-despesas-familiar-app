import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUComponent } from './cadastro-u.component';

describe('CadastroUComponent', () => {
  let component: CadastroUComponent;
  let fixture: ComponentFixture<CadastroUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroUComponent]
    });
    fixture = TestBed.createComponent(CadastroUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
