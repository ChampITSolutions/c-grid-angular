import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CGridAngularComponent } from './c-grid-angular.component'

describe('CGridAngularComponent', () => {
  let component: CGridAngularComponent
  let fixture: ComponentFixture<CGridAngularComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CGridAngularComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CGridAngularComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
