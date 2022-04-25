import { DecimalPipe } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { CGridConf } from './c-grid-angular.enum'
import { CGridConfig, CGridConfigDataColumn, CGridData } from './c-grid-angular.interface'

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

  private getColumnConfig(columnName?: string): CGridConfigDataColumn | undefined {
    return columnName && this.config?.data?.columns && this.config.data.columns[columnName] ?
      this.config.data.columns[columnName] : undefined
  }

  constructor(private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    console.log(this._data)
  }

  getConfig(conf: CGridConf, columnName?: string): string | boolean | undefined {
    switch (conf) {
      case CGridConf.ColumnAlign: {
        const column = this.getColumnConfig(columnName)
        return column ? column.align : 'start'
      }

      case CGridConf.ColumnBold: {
        const column = this.getColumnConfig(columnName)
        return column ? column.bold ?? false : false
      }

      case CGridConf.ColumnName: {
        return this.getColumnConfig(columnName)?.name ?? columnName
      }

      case CGridConf.ColumnPrefix: {
        return this.getColumnConfig(columnName)?.prefix
      }

      case CGridConf.ColumnSuffix: {
        return this.getColumnConfig(columnName)?.suffix
      }

      case CGridConf.ColumnCommaSeparate: {
        const column = this.getColumnConfig(columnName)
        return column ? column.commaSeparate ?? false : false
      }

    }
  }

  getDisplayValue(value: string | number | null | undefined | Date | boolean, column: string): string {
    let returnVal = value
    returnVal = `${this.getConfig(CGridConf.ColumnCommaSeparate, column) ? this.decimalPipe.transform(Number(returnVal), '1.0') : returnVal}`
    returnVal = `${this.getConfig(CGridConf.ColumnPrefix, column) ?? ''}${returnVal}`
    returnVal = `${returnVal}${this.getConfig(CGridConf.ColumnSuffix, column) ?? ''}`

    return returnVal
  }
}
