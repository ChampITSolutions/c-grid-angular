/** CGrid Data */
export interface CGridData {
  [key: string]: string | number | null | undefined | Date | boolean
}

/** CGrid Configurations */
export interface CGridConfig {
  /** Data configurations */
  data?: CGridConfigData
  /** Header configurations */
  header?: CGridConfigHeader
  /** Pagination config */
  pagination?: CGridConfigPagination
  /** Set true to enable responsiveness. Default is false. */
  responsive?: boolean
  /** Set true to enable table strips. Default is false. */
  striped?: boolean
}

interface CGridConfigHeader {
  /** Put headers in the order that you required. */
  order: string[]
}

interface CGridConfigData {
  /** Columns configurations */
  columns?: CGridConfigDataColumns
  /** Data export configurations */
  export?: CGridConfigDataExport
  /** Set data length if want to set a custom data size (Pagination purposes) */
  length?: number
}

interface CGridConfigDataExport {
  /** Set true to enable exporting data */
  enable: boolean
  /** Set the file name for export */
  fileName?: string
  /** Export types */
  types?: ExportTypes[]
}

interface CGridConfigDataColumns {
  /** Column configurations. Key name should be exactly as keys in the data set. */
  [key: string]: CGridConfigDataColumn
}

interface CGridConfigPagination {
  /** Set true to enable pagination. Default is false */
  enable: boolean
  /** Set custom page size. Default is 10 */
  pageSize?: number
}

export interface CGridConfigDataColumn {
  /** Column alignment */
  align?: AlignmentTypes
  /** Set true to bold the column. Default value is false */
  bold?: boolean
  /** Set true to separate each 3 digits by a comma (Applicable for numbers only) */
  commaSeparate?: boolean
  /** Data type for sorting */
  dataType?: DataTypes
  /** Set true to disable sorting by the grid and just trigger the sort click event. Default is false */
  disableInternalSort?: boolean
  /** If want to use the value of a different column in view */
  displayColumn?: string
  /** Custom column name */
  name?: string
  /** Set column prefix */
  prefix?: string
  /** Set true to enable sorting. Default is false. */
  sort?: boolean
  /** Set column suffix */
  suffix?: string
}

export interface CGridSortClickOut {
  column: string
  type: SortTypes
}

export interface CGridExportMenuItem {
  name: string
  type: ExportTypes
  icon: string
}

type SortTypes = 'asc' | 'desc' | 'none'
type AlignmentTypes = 'start' | 'end' | 'center'
type DataTypes = 'string' | 'date' | 'number'
type ExportTypes = 'pdf' | 'xlsx' | 'csv'