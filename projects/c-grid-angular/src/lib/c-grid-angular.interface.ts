/** CGrid Data */
export interface CGridData {
  [key: string]: string | number | null | undefined | Date | boolean
}

/** CGrid Configurations */
export interface CGridConfig {
  /** Set true to enable responsiveness. Default is false. */
  responsive?: boolean
  /** Set true to enable table strips. Default is false. */
  striped?: boolean
}