/** CGrid Data */
export interface CGridData {
  [key: string]: string | number | null | undefined | Date | boolean
}

/** CGrid Configurations */
export interface CGridConfig {
  /** Data configurations */
  data?: CGridConfigData
  /** Set true to enable responsiveness. Default is false. */
  responsive?: boolean
  /** Set true to enable table strips. Default is false. */
  striped?: boolean
}

interface CGridConfigData {
  /** Columns configurations */
  columns?: CGridConfigDataColumns
}

interface CGridConfigDataColumns {
  /** Column configurations. Key name should be exactly as keys in the data set. */
  [key: string]: CGridConfigDataColumn
}

interface CGridConfigDataColumn {
  /** Column alignment */
  align?: 'start' | 'end' | 'center'
  /** Set true to bold the column. Default value is false */
  bold?: boolean
  /** Custom column name */
  name?: string
  /** Set column prefix */
  prefix?: string
  /** Set column suffix */
  suffix?: string
}