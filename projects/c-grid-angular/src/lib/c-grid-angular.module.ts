import { CommonModule, DecimalPipe } from '@angular/common'
import { NgModule } from '@angular/core'
import { CGridAngularComponent } from './c-grid-angular.component'

@NgModule({
  declarations: [
    CGridAngularComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CGridAngularComponent
  ],
  providers: [DecimalPipe]
})
export class CGridAngularModule { }
