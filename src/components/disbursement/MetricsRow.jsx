import { memo } from 'react'
import MetricCard from './MetricCard'

function MetricsRowBase({ metrics }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {metrics.map((m) => (
        <MetricCard key={m.id} label={m.label} value={m.value} />
      ))}
    </div>
  )
}

export const MetricsRow = memo(MetricsRowBase)
export default MetricsRow
