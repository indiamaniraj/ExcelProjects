import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelProjectComponent } from './excel-project.component';

describe('ExcelProjectComponent', () => {
  let component: ExcelProjectComponent;
  let fixture: ComponentFixture<ExcelProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
