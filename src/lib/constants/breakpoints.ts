export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const MEDIA_QUERIES = {
  XS: `(min-width: ${BREAKPOINTS.XS}px)`,
  SM: `(min-width: ${BREAKPOINTS.SM}px)`,
  MD: `(min-width: ${BREAKPOINTS.MD}px)`,
  LG: `(min-width: ${BREAKPOINTS.LG}px)`,
  XL: `(min-width: ${BREAKPOINTS.XL}px)`,
  '2XL': `(min-width: ${BREAKPOINTS['2XL']}px)`,
} as const;

export const BREAKPOINT_NAMES = {
  [BREAKPOINTS.XS]: 'xs',
  [BREAKPOINTS.SM]: 'sm',
  [BREAKPOINTS.MD]: 'md',
  [BREAKPOINTS.LG]: 'lg',
  [BREAKPOINTS.XL]: 'xl',
  [BREAKPOINTS['2XL']]: '2xl',
} as const;

export const CONTAINER_MAX_WIDTHS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
