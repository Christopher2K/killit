const mobileBreakpoint = '900px'
const mobileBreakpointLimit = '901px'
const desktopBreakpoint = '1200px'
const desktopBreakpointLimit = '1201px'

export const mobile = `@media screen and (max-width: ${mobileBreakpoint})`

export const desktop = `@media screen and (min-width: ${mobileBreakpointLimit}) and (max-width: ${desktopBreakpoint})`

export const hd = `@media screen and (min-width: ${desktopBreakpointLimit})`
