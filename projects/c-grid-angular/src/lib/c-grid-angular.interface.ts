/** CGrid Data */
export interface CGridData {
  [key: string]: string | number | null | undefined | Date | boolean
}

/** CGrid Configurations */
export interface CGridConfig {
  /** Data configurations */
  data?: CGridConfigData
  /** Pagination config */
  pagination?: CGridConfigPagination
  /** Set true to enable responsiveness. Default is false. */
  responsive?: boolean
  /** Set true to enable table strips. Default is false. */
  striped?: boolean
}

interface CGridConfigData {
  /** Columns configurations */
  columns?: CGridConfigDataColumns
  /** Set data length if want to set a custom data size (Pagination purposes) */
  length?: number
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
  align?: 'start' | 'end' | 'center'
  /** Set true to bold the column. Default value is false */
  bold?: boolean
  /** Set true to separate each 3 digits by a comma (Applicable for numbers only) */
  commaSeparate?: boolean
  /** Data type for sorting */
  dataType?: 'string' | 'date' | 'number'
  /** Set true to disable sorting by the grid and just trigger the sort click event. Default is false */
  disableInternalSort?: boolean
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
  type: 'asc' | 'desc' | 'none'
}