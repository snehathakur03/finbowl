import { memo } from 'react'
import Icon from '../common/Icon'
import Button from '../common/Button'

/*
  Empty state: shown when the (simulated) API returns no disbursements.
*/
function EmptyStateBase({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-white px-6 py-16 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-head text-brand-700">
        <Icon name="inbox" className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-md font-semibold text-ink">
        No disbursements yet
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted">
        Nothing matches your current filters and date range. Try widening the
        range or clearing filters to see recent disbursements.
      </p>
      <div className="mt-5">
        <Button variant="primary" iconLeft="plus" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </div>
  )
}

export const EmptyState = memo(EmptyStateBase)
export default EmptyState
