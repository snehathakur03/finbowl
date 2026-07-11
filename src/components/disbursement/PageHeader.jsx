import { memo } from 'react'
import Icon from '../common/Icon'
import Button from '../common/Button'

/*
  Page header (Figma "Page header"): breadcrumb + title on the left,
  Refresh / Export actions on the right.
*/
function PageHeaderBase({ onRefresh }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-xl font-semibold text-ink">Disbursement</h1>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 text-2xs font-medium"
        >
          <span className="text-subtle">RMS</span>
          <Icon name="chevron-right" className="h-4 w-4 text-line-strong" />
          <span className="text-brand-700">Disbursement</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Button iconLeft="activity" onClick={onRefresh}>
          Activity
        </Button>
        <Button iconLeft="import-excel">
          Import Excel
        </Button>
        <Button variant="primary" iconRight="chevron-down">
          Add Disbursement
        </Button>
      </div>
    </div>
  )
}

export const PageHeader = memo(PageHeaderBase)
export default PageHeader
