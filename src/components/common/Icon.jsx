import { memo } from 'react'

/*
  Lightweight inline icon set (Untitled UI / lucide style, 24x24, stroke = currentColor).
  Kept in-repo so the app has no icon-library / network dependency.
  Usage: <Icon name="search" className="w-5 h-5 text-subtle" />
*/
const PATHS = {
  'search-lg': (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  bell: (
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
  ),
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-up': <path d="m18 15-6-6-6 6" />,
  'chevron-right': <path d="m9 18 6-6-6-6" />,
  'chevron-left': <path d="m15 18-6-6 6-6" />,
  'chevrons-updown': <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />,
  'chevron-left-double': <path d="m11 17-5-5 5-5M18 17l-5-5 5-5" />,
  'chevron-right-double': <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />,
  'dots-vertical': (
    <>
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="19" r="1" />
    </>
  ),
  'clock-refresh': (
    <>
      <path d="M20.5 9A9 9 0 1 0 21 14M20.5 4v5h-5" />
      <path d="M12 8v4l2.5 1.5" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
    </>
  ),
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  wallet: (
    <path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v3h-4a2 2 0 0 0 0 4h4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  ),
  'coins-hand': (
    <>
      <circle cx="9" cy="7.5" r="4.5" />
      <path d="M3 21v-1a3 3 0 0 1 3-3h4l5 2 6-2c1 1 0 2-1 2l-6 2-5-2" />
    </>
  ),
  'receipt-check': (
    <>
      <path d="M5 3v18l2-1.3L9 21l2-1.3L13 21l2-1.3L17 21l2-1.3V3l-2 1.3L15 3l-2 1.3L11 3 9 4.3 7 3z" />
      <path d="m8.5 11 2 2 4-4" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 3v18l2-1.3L9 21l2-1.3L13 21l2-1.3L17 21l2-1.3V3l-2 1.3L15 3l-2 1.3L11 3 9 4.3 7 3z" />
      <path d="M8 8h8M8 12h8" />
    </>
  ),
  'bar-chart': (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 16v-3M12 16v-6M16 16v-4" />
    </>
  ),
  'pie-chart': <path d="M21 15A9 9 0 1 1 9 3v9h9M14 3a7 7 0 0 1 7 7h-7z" />,
  bank: (
    <>
      <path d="M3 10 12 4l9 6M4 10v8m4-8v8m8-8v8m4-8v8M3 21h18" />
    </>
  ),
  'shield-tick': (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5a3.5 3.5 0 0 1 0 6.5M18 20a5.8 5.8 0 0 0-2-3.3" />
    </>
  ),
  'magic-wand': (
    <path d="m4 20 10-10M14 6l1.5-1.5M18 8l1.5-1.5M18 4l.5-.5M20 10l.5-.5M14 4l-.6 1.8L11.6 6l1.8.6.6 1.8.6-1.8L16.4 6l-1.8-.6z" />
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M20 6 9 17l-5-5" />,
  columns: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M12 4v16" />
    </>
  ),
  'alert-triangle': (
    <>
      <path d="M12 4 2.5 20h19z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  inbox: (
    <>
      <path d="M3 12h5l2 3h4l2-3h5" />
      <path d="M5 5h14l2 7v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z" />
    </>
  ),
  bowl: (
    <>
      <path d="M3 11h18a9 9 0 0 1-18 0Z" />
      <path d="M8 11a4 4 0 0 1 8 0" />
    </>
  ),
  'layout-grid': (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="8" cy="6" rx="5" ry="2.5" />
      <path d="M3 6v5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V6" />
      <path d="M13 12.5c.5 1.2 2.6 2 5 2 2.8 0 5-1.1 5-2.5V9c0-1.4-2.2-2.5-5-2.5-1 0-2 .15-2.8.4" />
    </>
  ),
  'trending-up': <path d="M3 17 9 11l4 4 8-8m0 0h-5m5 0v5" />,
  'file-check': (
    <>
      <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z" />
      <path d="M13 3v6h6M9.5 14.5l2 2 3.5-3.5" />
    </>
  ),
  clipboard: (
    <>
      <rect x="8" y="3" width="8" height="4" rx="1" />
      <path d="M9 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3" />
    </>
  ),
  archive: (
    <>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M9 12h6" />
    </>
  ),
  edit: <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  'users-check': (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0M16 11l2 2 4-4" />
    </>
  ),
  'bank-note': (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
    </>
  ),
  'filter-outline': (
    <>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </>
  ),

 activity: (
    <>
      <path d="M20 12a8 8 0 1 1-2.34-5.66" />
      <path d="M20 4v6h-6" />
    </>
  ),

  'import-excel': (
    <>
      <path d="M12 3v12" />
      <path d="M8 11l4 4 4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </>
  ),
  }

function IconBase({ name, className = 'w-5 h-5', strokeWidth = 1.67, ...rest }) {
  const path = PATHS[name]
  if (!path) return null
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {path}
    </svg>
  )
}

export const Icon = memo(IconBase)
export default Icon
