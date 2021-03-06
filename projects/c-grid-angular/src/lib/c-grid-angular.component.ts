import { DecimalPipe } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CGridConf } from './c-grid-angular.enum'
import { CGridConfig, CGridConfigDataColumn, CGridData, CGridSortClickOut } from './c-grid-angular.interface'

@Component({
  selector: 'c-grid',
  templateUrl: './c-grid-angular.component.html',
  styleUrls: ['./c-grid-angular.component.scss']
})
export class CGridAngularComponent implements OnInit {

  @Input()
  set data(value: CGridData[]) {
    this._data = value?.length ? value.slice() : []
    this.sortedData = value?.length ? value.slice() : []
    this._headerOrder = Object.keys(value[0])

    this.changePageSize()
    this.changePage(this.page)
  }
  get data(): CGridData[] {
    return this._data
  }

  @Input()
  set config(value: CGridConfig | undefined) {
    this._config = value

    this.responsive = value?.responsive ?? false
    this.striped = value?.striped ?? false
    this.paginationEnabled = value?.pagination?.enable ?? false
    this.pageSize = value?.pagination?.pageSize ?? 10
    this.dataLength = value?.data?.length ?? 0
  }
  get config(): CGridConfig | undefined {
    return this._config
  }

  @Output() pageChanged = new EventEmitter<number>()
  @Output() pageSizeChanged = new EventEmitter<number>()
  @Output() sortClick = new EventEmitter<CGridSortClickOut>()

  private _data: CGridData[] = []
  private _config: CGridConfig | undefined

  private _headerOrder: string[] = []
  get headerOrder(): string[] {
    return this._headerOrder
  }

  CGridConf = CGridConf
  responsive = false
  striped = false

  paginationEnabled = false
  pageSize = 10
  pageData: CGridData[] = []
  page = 1
  pageNumbers: number[] = []
  dataLength = 0

  sortDirection = 0
  sortBy = ''
  sortedData: CGridData[] = []

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

      case CGridConf.ColumnCommaSeparate: {
        const column = this.getColumnConfig(columnName)
        return column ? column.commaSeparate ?? false : false
      }

      case CGridConf.ColumnDataType: {
        return this.getColumnConfig(columnName)?.dataType
      }

      case CGridConf.ColumnDisableInternalSort: {
        const column = this.getColumnConfig(columnName)
        return column ? column.disableInternalSort ?? false : false
      }

      case CGridConf.ColumnName: {
        return this.getColumnConfig(columnName)?.name ?? columnName
      }

      case CGridConf.ColumnPrefix: {
        return this.getColumnConfig(columnName)?.prefix
      }

      case CGridConf.ColumnSort: {
        const column = this.getColumnConfig(columnName)
        return column ? column.sort ?? false : false
      }

      case CGridConf.ColumnSuffix: {
        return this.getColumnConfig(columnName)?.suffix
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

  sort(column: string, emit = true): void {
    if (this.getConfig(CGridConf.ColumnSort, column)) {
      if (column !== this.sortBy) {
        this.sortBy = column
        this.sortDirection = 1
      } else {
        this.sortDirection = ++this.sortDirection > 2 ? 0 : this.sortDirection
      }

      if (!this.getConfig(CGridConf.ColumnDisableInternalSort, column)) {
        this.sortedData = this.data.slice()

        if (this.sortDirection) {
          this.sortedData.sort((a, b) => {
            if (this.getConfig(CGridConf.ColumnDataType, this.sortBy) === 'date') {
              return new Date(a[this.sortBy] as string).getTime() - new Date(b[this.sortBy] as string).getTime()
            }

            if (typeof a[this.sortBy] === 'number') {
              return (a[this.sortBy] as number) - (b[this.sortBy] as number)
            }

            return ('' + a[this.sortBy]).localeCompare(b[this.sortBy] as string)
          })

          if (this.sortDirection === 2) {
            this.sortedData.reverse()
          }
        }
      }

      if (this.sortClick.observed && emit) {
        let sortType: 'asc' | 'desc' | 'none' = 'none'

        switch (this.sortDirection) {
          case 1: {
            sortType = 'asc'
          } break

          case 2: {
            sortType = 'desc'
          } break
        }

        this.sortClick.emit({
          column: this.sortBy,
          type: sortType
        })
      }
    }

    this.changePage(this.page)
  }

  changePageSize(): void {
    if (this.paginationEnabled) {
      this.pageNumbers = []

      let pagesCount = this.dataLength ? this.dataLength / this.pageSize : this.data.length / this.pageSize

      if ((this.dataLength ? this.dataLength % this.pageSize : this.data.length % this.pageSize)) {
        pagesCount++
      }

      for (let i = 1; i <= pagesCount; i++) {
        this.pageNumbers.push(i)
      }

      if (!this.pageNumbers.includes(this.page)) {
        this.page = 1
      }
    }
  }

  changePageSizeClick(): void {
    this.changePageSize()

    if (this.paginationEnabled) {
      this.changePage(this.page)

      if (this.pageSizeChanged.observed) {
        this.pageSizeChanged.emit(this.pageSize)
      }
    }
  }

  changePage(page: number): void {
    this.page = page
    this.pageData = []

    let start = this.pageSize * this.page - this.pageSize
    const endStep01 = this.data.length > this.pageSize * this.page ? this.pageSize * this.page : this.data.length
    let end = (this.data.length > this.pageSize ? endStep01 : this.data.length)

    if (!this.paginationEnabled) {
      start = 0
      end = this.data.length
    }

    for (let i = start; i < end; i++) {
      this.pageData.push(this.sortBy !== '' ? this.sortedData[i] : this.data[i])
    }

    if (this.pageChanged.observed && this.data.length) {
      this.pageChanged.emit(this.page)
    }
  }
}
