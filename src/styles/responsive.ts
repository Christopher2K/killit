export const mobileBreakpoint = '900px'
export const mobileBreakpointLimit = '901px'
export const desktopBreakpoint = '1200px'
export const desktopBreakpointLimit = '1201px'

export const mobile = `@media screen and (max-width: ${mobileBreakpoint})`

export const desktop = `@media screen and (min-width: ${mobileBreakpointLimit}) and (max-width: ${desktopBreakpoint})`

export const hd = `@media screen and (min-width: ${desktopBreakpointLimit})`

export function getPixelNumberFromPixelValue (value: string): number {
  return +value.slice(0, value.length - 2)
}
