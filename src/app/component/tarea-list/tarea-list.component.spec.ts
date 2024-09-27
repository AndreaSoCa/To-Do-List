import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaListComponent } from './tarea-list.component';

describe('TareaListComponent', () => {
  let component: TareaListComponent;
  let fixture: ComponentFixture<TareaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TareaListComponent]
    });
    fixture = TestBed.createComponent(TareaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
