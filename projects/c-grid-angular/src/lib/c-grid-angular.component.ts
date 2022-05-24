import { DecimalPipe } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CGridConf } from './c-grid-angular.enum'
import { CGridConfig, CGridConfigDataColumn, CGridData, CGridExportMenuItem, CGridSortClickOut } from './c-grid-angular.interface'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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
    this._headerOrder = this._headerOrder.length ? this._headerOrder : Object.keys(value[0])

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
    this._headerOrder = value?.header?.order ?? this.headerOrder
    this.exportEnabled = value?.data?.export?.enable ?? false

    this.exportTypes = [] as CGridExportMenuItem[]

    (value?.data?.export?.types ?? ['pdf', 'xlsx', 'csv']).forEach(type => {
      if (type === 'pdf') {
        this.exportTypes.push({
          name: 'PDF File',
          type: 'pdf',
          icon: 'bi bi-file-earmark-pdf-fill'
        })
      }

      if (type === 'xlsx') {
        this.exportTypes.push({
          name: 'Excel File',
          type: 'xlsx',
          icon: 'bi bi-file-earmark-excel-fill'
        })
      }

      if (type === 'csv') {
        this.exportTypes.push({
          name: 'CSV File',
          type: 'csv',
          icon: 'bi bi-file-earmark-spreadsheet'
        })
      }
    })

    this.exportFileName = this.config?.data?.export?.fileName ?? 'c-grid-export'
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

  exportEnabled = false
  exportTypes: CGridExportMenuItem[] = []
  exportFileName = ''

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

      case CGridConf.ColumnDisplayColumn: {
        const column = this.getColumnConfig(columnName)
        return column ? column.displayColumn ?? columnName : columnName
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

  exportTo(type: CGridExportMenuItem): void {
    switch (type.type) {
      case 'csv': {
        // specify how you want to handle null values here
        const replacer = (_key: any, value: any) => value === null ? '' : value
        const header = this.headerOrder
        const csv = this.data.map(row => header.map((fieldName: string) => JSON.stringify(row[fieldName], replacer)).join(','))

        csv.unshift(header.join(','))

        const csvArray = csv.join('\r\n')

        const blob = new Blob([csvArray], { type: 'text/csv' })
        saveAs(blob, `${this.exportFileName}.csv`)
      } break

      case 'xlsx': {
        const header = this.headerOrder
        const headerDisplay = header.map((head: string) => this.getConfig(CGridConf.ColumnName, head))
        const body = this.data.map(row => header.map((fieldName: string) => row[fieldName]))

        /* generate workbook and add the worksheet */
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet([])

        XLSX.utils.sheet_add_aoa(ws, [headerDisplay])
        XLSX.utils.sheet_add_json(ws, body, { origin: 'A2', skipHeader: true })
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

        /* save to file */
        XLSX.writeFile(wb, `${this.exportFileName}.xlsx`)
      } break

      case 'pdf': {
        const header = this.headerOrder
        const headerDisplay = header.map((head: string) => this.getConfig(CGridConf.ColumnName, head)) as string[]
        const body = this.data.map(row => header.map((fieldName: string) => row[fieldName])) as string[][]

        const doc = new jsPDF()

        autoTable(doc, {
          head: [headerDisplay], body, headStyles: {
            fillColor: '#a61e2d'
          }
        })

        doc.save(`${this.exportFileName}.pdf`)
      } break
    }
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
