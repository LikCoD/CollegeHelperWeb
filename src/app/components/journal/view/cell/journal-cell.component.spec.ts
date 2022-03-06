import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalCellComponent } from './journal-cell.component';

describe('CellComponent', () => {
  let component: JournalCellComponent;
  let fixture: ComponentFixture<JournalCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
