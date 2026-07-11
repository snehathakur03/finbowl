import { memo } from 'react'
import Icon from '../common/Icon'
import Button from '../common/Button'

/*
  Error state: shown when the (simulated) API call fails. Retry re-runs the fetch.
*/
function ErrorStateBase({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-[#FECACA] bg-[#FEF2F2] px-6 py-16 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-danger-600">
        <Icon name="alert-triangle" className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-md font-semibold text-ink">
        Couldn’t load disbursements
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted">
        Something went wrong while fetching the data. Check your connection and
        try again.
      </p>
      <div className="mt-5">
        <Button variant="primary" iconLeft="clock-refresh" onClick={onRetry}>
          Retry
        </Button>
      </div>
    </div>
  )
}

export const ErrorState = memo(ErrorStateBase)
export default ErrorState
