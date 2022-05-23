import { CommonModule, DecimalPipe } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CGridAngularComponent } from './c-grid-angular.component'

@NgModule({
  declarations: [
    CGridAngularComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CGridAngularComponent
  ],
  providers: [DecimalPipe]
})
export class CGridAngularModule { }
