import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeletedInboxComponent } from './admin-deleted-inbox.component';

describe('AdminDeletedInboxComponent', () => {
  let component: AdminDeletedInboxComponent;
  let fixture: ComponentFixture<AdminDeletedInboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeletedInboxComponent]
    });
    fixture = TestBed.createComponent(AdminDeletedInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
