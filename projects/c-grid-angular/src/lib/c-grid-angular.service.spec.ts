import { TestBed } from '@angular/core/testing'

import { CGridAngularService } from './c-grid-angular.service'

describe('CGridAngularService', () => {
  let service: CGridAngularService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CGridAngularService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
