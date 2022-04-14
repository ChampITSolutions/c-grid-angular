import { Component, Input, OnInit } from '@angular/core'
import { CGridConf } from './c-grid-angular.enum'
import { CGridConfig, CGridData } from './c-grid-angular.interface'

@Component({
  selector: 'c-grid',
  templateUrl: './c-grid-angular.component.html',
  styleUrls: ['./c-grid-angular.component.scss']
})
export class CGridAngularComponent implements OnInit {

  @Input()
  set data(value: CGridData[]) {
    this._data = value

    this._headerOrder = Object.keys(value[0])
  }
  get data(): CGridData[] {
    return this._data
  }

  @Input()
  set config(value: CGridConfig | undefined) {
    this._config = value

    this.responsive = value?.responsive ?? false
    this.striped = value?.striped ?? false
  }
  get config(): CGridConfig | undefined {
    return this._config
  }

  private _data: CGridData[] = []
  private _config: CGridConfig | undefined

  private _headerOrder: string[] = []
  get headerOrder(): string[] {
    return this._headerOrder
  }

  CGridConf = CGridConf
  responsive = false
  striped = false

  ngOnInit(): void {
    console.log(this._data)
  }

  getConfig(conf: CGridConf, columnName: string | undefined): string {
    switch (conf) {
      case CGridConf.ColumnAlign: {
        return columnName && this.config?.data?.columns && this.config.data.columns[columnName] ?
          this.config.data.columns[columnName].align ?? 'start' : 'start'
      }
    }
  }
}
