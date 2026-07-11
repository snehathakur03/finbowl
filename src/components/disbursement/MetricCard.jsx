import { memo } from 'react'

/*
  Single KPI card (Figma "Metric item"): heading + big number, white surface,
  hairline border, radius 12, shadow-xs. Grows to share row width equally.
*/
function MetricCardBase({ label, value }) {
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-card border border-line bg-white p-5 shadow-xs">
      <p className="flex min-h-10 items-start text-sm leading-5 font-medium text-muted">{label}</p>
      <p className="truncate text-2xl leading-8 font-medium text-ink tabular-nums">
        {value}
      </p>
    </div>
  )
}

export const MetricCard = memo(MetricCardBase)
export default MetricCard
