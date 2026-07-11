import { memo, useCallback, useMemo, useState } from 'react'
import useDisbursements from '../../hooks/useDisbursements'
import { COLUMNS, SAVED_VIEW_STATUS_FILTER } from '../../data/mockDisbursements'
import PageHeader from './PageHeader'
import MetricsRow from './MetricsRow'
import FiltersBar from './FiltersBar'
import DisbursementTable from './DisbursementTable'
import TableSkeleton from './TableSkeleton'
import EmptyState from './EmptyState'
import ErrorState from './ErrorState'
import Pagination from './Pagination'

const SCENARIOS = [
  { key: 'success', label: 'Data' },
  { key: 'empty', label: 'Empty' },
  { key: 'error', label: 'Error' },
]


function DisbursementPageBase({ onOpenLoan }) {
  const [scenario, setScenario] = useState('success')
  const [search, setSearch] = useState('')
  const [customViews, setCustomViews] = useState([])
  const [customViewColumns, setCustomViewColumns] = useState({})
  const [activeView, setActiveView] = useState('my-loan-view')

  const addCustomView = useCallback((name, checkedSet) => {
    const id = `custom-${Date.now()}`
    const visibleKeys = COLUMNS.filter((c) => checkedSet.has(c.key)).map((c) => c.key)
    setCustomViews((prev) => [...prev, { id, label: name }])
    setCustomViewColumns((prev) => ({ ...prev, [id]: visibleKeys }))
  }, [])

  // Pagination state
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { status, rows, metrics, retry } = useDisbursements(scenario)

  const goSuccess = useCallback(() => setScenario('success'), [])

  // Rows filtered for the active saved view (e.g. "Submitted Loans" only shows submitted status)
  const viewRows = useMemo(() => {
    const requiredStatus = SAVED_VIEW_STATUS_FILTER[activeView]
    if (!requiredStatus) return rows
    return rows.filter((row) => row.status === requiredStatus)
  }, [rows, activeView])

  // Total pages
  const pages = useMemo(() => {
    return Math.ceil(viewRows.length / rowsPerPage) || 1
  }, [viewRows.length, rowsPerPage])

  // Paginated rows
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    return viewRows.slice(start, start + rowsPerPage)
  }, [viewRows, page, rowsPerPage])

  // Reset page when data changes
  const handleRowsChange = (n) => {
    setRowsPerPage(n)
    setPage(1)
  }

  return (
    <div className="mx-auto flex w-full min-w-0 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">

      {/* Header */}
      <PageHeader onRefresh={retry} />

      {/* Metrics */}
      <MetricsRow metrics={metrics} />

      {/* Table Card */}
      <section className="flex min-w-0 flex-col gap-4 rounded-card border border-line bg-white p-4 shadow-card">

        <FiltersBar
          value={search}
          onChange={setSearch}
          customViews={customViews}
          activeView={activeView}
          onApplyView={(view) => {
          setActiveView(view)
          setPage(1)
        }}
        />

        {status === 'loading' && <TableSkeleton />}
        {status === 'error' && <ErrorState onRetry={retry} />}
        {status === 'empty' && <EmptyState onReset={goSuccess} />}

        {status === 'success' && (
          <>
            <DisbursementTable
              rows={paginatedRows}
              onOpenLoan={onOpenLoan}
              onCreateView={addCustomView}
              activeView={activeView}
              customViewColumns={customViewColumns}
            />

            <Pagination
              page={page}
              pages={pages}
              total={viewRows.length}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsChange={handleRowsChange}
            />
          </>
        )}
      </section>
    </div>
  )
}

export const DisbursementPage = memo(DisbursementPageBase)
export default DisbursementPage