import { memo, useCallback, useMemo, useState } from 'react'
import Icon from '../common/Icon'
import Avatar, { avatarSrc } from '../common/Avatar'
import StatusBadge from '../common/StatusBadge'
import { COLUMNS, SAVED_VIEW_COLUMNS } from '../../data/mockDisbursements'

/* ---- checkbox square matching Figma "_Checkbox base" ---- */
const CheckSquare = memo(function CheckSquare({ checked }) {
  if (checked) {
    return (
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-sm bg-brand-600">
        <Icon name="check" className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
      </span>
    )
  }
  return (
    <span className="h-4 w-4 shrink-0 rounded-sm border border-line-strong" />
  )
})

/* ---- "Create Custom View" naming modal ---- */
const CreateViewModal = memo(function CreateViewModal({ onCancel, onCreate }) {
  const [name, setName] = useState('')
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-[#0A0A0A] opacity-70" onClick={onCancel} aria-hidden="true" />
      <div className="relative max-w-100 w-100 rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-base leading-6 font-medium text-ink">Create Custom View</h2>
          <button
            type="button"
            onClick={onCancel}
            className="grid h-6 w-6 place-items-center rounded-md text-muted hover:bg-zebra"
            aria-label="Close"
          >
            <Icon name="x" className="h-2.5 w-2.5" strokeWidth={1.67} />
          </button>
        </div>
        <label className="mt-6 block">
          <span className="mb-1.5 block text-left text-2xs leading-4.5 font-medium text-ink-soft">
            Enter View Name <span className="text-brand-600">*</span>
          </span>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter View Name"
            className="h-9 w-full rounded-lg border border-line-strong px-3.5 text-sm leading-5 font-normal text-ink shadow-xs outline-none placeholder:text-subtle"
          />
        </label>
        <div className="mt-6 border-t border-line" />
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 flex-1 items-center justify-center gap-1 rounded-md border border-line-strong px-3.5 py-2.5 text-sm leading-5 font-medium text-ink-soft hover:bg-zebra"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onCreate(name.trim())}
            disabled={!name.trim()}
            className="flex h-10 flex-1 items-center justify-center gap-1 rounded-md border-2 border-brand-600 bg-brand-600 px-3.5 py-2.5 text-sm leading-5 font-medium text-white shadow-xs hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create View
          </button>
        </div>
      </div>
    </div>
  )
})

/* ---- column visibility toggle dropdown ---- */
const ColumnsMenu = memo(function ColumnsMenu({ columns, checked, onToggle, onClose, onCancel, onCreateView }) {
  const [search, setSearch] = useState('')
  const [namingView, setNamingView] = useState(false)
  const filtered = columns.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} aria-hidden="true" />
      <div className="absolute top-16.5 right-3 z-40 flex max-h-128 w-64 flex-col rounded-lg border border-black/10 bg-white shadow-lg">
        <div className="px-2 pt-4">
          <label className="flex h-9 w-full items-center gap-1.5 rounded-lg border border-line-strong px-3.5 shadow-xs">
            <Icon name="search-lg" className="h-3.5 w-3.5 text-subtle" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for Loans"
              className="w-full text-sm leading-5 font-normal text-subtle outline-none placeholder:text-subtle"
            />
          </label>
        </div>
        <ul className="p-2">
          {filtered.map((col) => (
            <li key={col.key} className="px-1.5 py-px">
              <label className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 hover:bg-zebra">
                <CheckSquare checked={checked.has(col.key)} />
                <input
                  type="checkbox"
                  checked={checked.has(col.key)}
                  onChange={() => onToggle(col.key)}
                  className="sr-only"
                />
                <span className="text-sm leading-5 font-medium text-ink-soft">{col.label}</span>
              </label>
            </li>
          ))}
        </ul>
        {checked.size > 0 && (
          <div className="flex items-center justify-center gap-1 border-t border-line-strong px-3 py-4">
            <button
              type="button"
              onClick={() => setNamingView(true)}
              className="flex h-8 w-28.5 items-center justify-center gap-1 rounded-lg bg-brand-600 px-2.5 py-1.5 text-sm leading-5 font-semibold text-white shadow-xs hover:bg-brand-700"
            >
              Save View
            </button>
            <button
              type="button"
              onClick={() => {
                onCancel()
                onClose()
              }}
              className="flex h-8 w-28.5 items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-sm leading-5 font-semibold text-muted hover:bg-zebra"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {namingView && (
        <CreateViewModal
          onCancel={() => setNamingView(false)}
          onCreate={(name) => {
            setNamingView(false)
            onCreateView(name, checked)
            onClose()
          }}
        />
      )}
    </>
  )
})

/* ---- one body cell, variant-aware ---- */
const Cell = memo(function Cell({ column, row, onOpenLoan }) {
  const value = row[column.key]
  switch (column.variant) {
    case 'link':
      return (
        <button
          type="button"
          onClick={() => onOpenLoan(row)}
          className="font-medium text-brand-600 hover:underline"
        >
          {value}
        </button>
      )
    case 'avatar':
      return (
        <span className="flex items-center gap-2">
          <Avatar name={value} src={avatarSrc(value)} size={20} />
          <span className="truncate text-ink">{value}</span>
        </span>
      )
    case 'amount':
      return <span className="text-ink-soft">{value}</span>
    case 'verified':
      return <span>{value}</span>
    case 'status':
      return <StatusBadge status={value} />
    case 'mono':
      return <span className="text-subtle">{value}</span>
    default:
      return <span className="text-ink">{value}</span>
  }
})

/* ---- one body row (zebra via index) ---- */
const Row = memo(function Row({ row, index, columns, onOpenLoan }) {
  const zebra = index % 2 === 1 ? 'bg-zebra' : 'bg-white'
  return (
    <tr className={zebra}>
      <td
        className={`sticky left-0 z-10 w-14 border-b border-line px-4 py-[18px] ${zebra}`}
      >
        <span className="flex justify-center">
          <span className="h-4 w-4 rounded border border-line-strong" />
        </span>
      </td>
      {columns.map((col) => (
        <td
          key={col.key}
          className={`${col.width} truncate border-b border-line px-4 py-[18px] text-sm ${
            col.align === 'right' ? 'text-right' : 'text-left'
          }`}
        >
          <Cell column={col} row={row} onOpenLoan={onOpenLoan} />
        </td>
      ))}
      <td className={`sticky right-0 z-10 w-16 border-b border-line px-3 py-[18px] text-center ${zebra}`}>
        <button
          type="button"
          className="mx-auto grid h-6 w-6 place-items-center rounded text-[#a3a3a3] hover:bg-[#f2f2f2]"
          aria-label="Row actions"
        >
          <Icon name="dots-vertical" className="h-5 w-5" />
        </button>
      </td>
    </tr>
  )
})

/* ---- sortable header cell ---- */
const HeaderCell = memo(function HeaderCell({ column, sort, onSort }) {
  const active = sort.key === column.key

  // exclude filter icon for specific columns
  const showFilter =
  column.key !== 'date' && column.key !== 'select'

  return (
    <th
      scope="col"
      className={`${column.width} whitespace-nowrap border-b border-line bg-head px-4 py-5 align-middle ${
        column.align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      <div className={`flex items-center gap-1 ${column.align === 'right' ? 'justify-end' : ''}`}>

        {/* Sort Button */}
        <button
          type="button"
          disabled={!column.sortable}
          onClick={() => onSort(column.key)}
          className="flex items-center gap-1 text-2xs font-medium text-muted enabled:hover:text-ink disabled:cursor-default"
        >
          {column.label}

          {column.sortable && (
            <Icon
              name={
                active
                  ? sort.dir === 'asc'
                    ? 'chevron-up'
                    : 'chevron-down'
                  : 'chevrons-updown'
              }
              className="h-3 w-3 text-muted"
            />
          )}
        </button>

        {/*  Filter Icon */}
        {showFilter && (
          <button
            type="button"
            className="ml-1 text-muted hover:text-ink"
            aria-label={`Filter ${column.label}`}
          >
            <Icon name="filter-outline" className="h-3 w-3" strokeWidth={1} />
          </button>
        )}
      </div>
    </th>
  )
})

const hiddenSetForView = (viewId, customViewColumns) => {
  const visibleKeys = SAVED_VIEW_COLUMNS[viewId] ?? customViewColumns?.[viewId]
  if (!visibleKeys) return new Set()
  return new Set(COLUMNS.filter((c) => !visibleKeys.includes(c.key)).map((c) => c.key))
}

function DisbursementTableBase({ rows, onOpenLoan, onCreateView, activeView, customViewColumns }) {
  const [sort, setSort] = useState({ key: null, dir: 'asc' })
  const [hidden, setHidden] = useState(() => hiddenSetForView(activeView, customViewColumns))
  const [draftChecked, setDraftChecked] = useState(() => new Set())
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastAppliedView, setLastAppliedView] = useState(activeView)

  if (activeView !== lastAppliedView) {
    setLastAppliedView(activeView)
    setHidden(hiddenSetForView(activeView, customViewColumns))
  }

  const onSort = useCallback((key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' },
    )
  }, [])

  const openMenu = useCallback(() => {
    setDraftChecked(new Set())
    setMenuOpen(true)
  }, [])

  const toggleDraftColumn = useCallback((key) => {
    setDraftChecked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const cancelMenu = useCallback(() => {
    setDraftChecked(new Set())
  }, [])

  const visibleColumns = useMemo(
    () => COLUMNS.filter((col) => !hidden.has(col.key)),
    [hidden],
  )

  const sortedRows = useMemo(() => {
    if (!sort.key) return rows
    const copy = [...rows]
    copy.sort((a, b) => {
      const av = String(a[sort.key])
      const bv = String(b[sort.key])
      return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })
    return copy
  }, [rows, sort])

  return (
    <div className="scroll-thin relative overflow-x-auto rounded-card border border-line shadow-xs">
      <table className="w-full table-fixed border-collapse text-sm">
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-20 w-14 border-b border-line bg-head px-4 py-5"
            >
              <span className="flex justify-center">
                <span className="h-4 w-4 rounded border border-line-strong" />
              </span>
            </th>
            {visibleColumns.map((col) => (
              <HeaderCell key={col.key} column={col} sort={sort} onSort={onSort} />
            ))}
            <th
              scope="col"
              className="sticky right-0 z-20 w-16 border-b border-line bg-head py-5"
            >
              <div className="flex items-center justify-center">
                <span className="mr-2 h-6 w-px bg-line" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => (menuOpen ? setMenuOpen(false) : openMenu())}
                  className="grid h-5 w-5 place-items-center rounded-sm border border-[#9E77ED] bg-[#F4EBFF] text-ink"
                  aria-label="Toggle columns"
                >
                  <Icon name="columns" className="h-3 w-3" strokeWidth={1.5} />
                </button>
                {menuOpen && (
                  <ColumnsMenu
                    columns={COLUMNS}
                    checked={draftChecked}
                    onToggle={toggleDraftColumn}
                    onClose={() => setMenuOpen(false)}
                    onCancel={cancelMenu}
                    onCreateView={onCreateView}
                  />
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) => (
            <Row key={row.id} row={row} index={i} columns={visibleColumns} onOpenLoan={onOpenLoan} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const DisbursementTable = memo(DisbursementTableBase)
export default DisbursementTable
