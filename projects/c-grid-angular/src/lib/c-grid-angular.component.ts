import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'lib-c-grid-angular',
  template: `
    <p>
      c-grid-angular works!
    </p>
  `,
  styles: [
  ]
})
export class CGridAngularComponent implements OnInit {

  ngOnInit(): void {
    console.log('Hello World!')
  }

}
