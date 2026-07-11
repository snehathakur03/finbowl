import { memo } from 'react'

/*
  Generic pill badge. Renders an optional leading dot.
  Colors are passed via className so the same primitive serves the
  sidebar "New feature" badge and (through StatusBadge) the table badges.
*/
function BadgeBase({ children, dotClassName, className = '', rounded = 'full' }) {
  const radius = rounded === 'full' ? 'rounded-full' : 'rounded-md'
  return (
    <span
      className={`inline-flex items-center gap-1 border px-1.5 py-0.5 text-2xs font-medium ${radius} ${className}`}
    >
      {dotClassName && (
        <span className={`h-1.5 w-1.5 rounded-full ${dotClassName}`} />
      )}
      {children}
    </span>
  )
}

export const Badge = memo(BadgeBase)
export default Badge
