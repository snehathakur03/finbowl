import { memo, useMemo } from 'react'
import Icon from '../common/Icon'

const NavButton = memo(function NavButton({ icon, disabled, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="
        flex items-center justify-center
        h-9 w-9 rounded-lg
        border border-line-strong
        bg-white text-[#A3A3A3] shadow-skeu
        hover:bg-zebra
        disabled:opacity-40 disabled:cursor-not-allowed
      "
    >
      <Icon name={icon} className="h-5 w-5" />
    </button>
  )
})

const PagePill = memo(function PagePill({ page, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        h-9 w-9 rounded-lg text-sm font-medium
        ${
          active
            ? 'bg-zebra text-ink-soft'
            : 'text-subtle hover:bg-zebra'
        }
      `}
    >
      {page}
    </button>
  )
})

function usePageWindow(page, pages) {
  return useMemo(() => {
    if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1)

    const set = new Set([1, pages, page - 1, page, page + 1])
    const list = [...set]
      .filter((n) => n >= 1 && n <= pages)
      .sort((a, b) => a - b)

    const out = []
    let prev = 0

    for (const n of list) {
      if (n - prev > 1) out.push('...')
      out.push(n)
      prev = n
    }

    return out
  }, [page, pages])
}

function PaginationBase({
  page = 1,
  pages = 10,
  total = 100,
  rowsPerPage = 10,
  onPageChange,
  onRowsChange,
}) {
  const items = usePageWindow(page, pages)

  const go = (p) => {
    const next = Math.min(Math.max(1, p), pages)
    onPageChange?.(next)
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-line">

      {/* LEFT */}
      <div className="flex items-center gap-4 text-sm font-medium text-ink-soft">
        <span className="flex items-center gap-2">
          Page
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong bg-white text-ink shadow-xs">
            {page}
          </span>
          of {pages}
        </span>

        <span className="h-4 w-px bg-line-strong" />

        <div className="flex items-center gap-2">
          <span>Rows per page</span>

          <select
            value={rowsPerPage}
            onChange={(e) => onRowsChange?.(Number(e.target.value))}
            className="
              h-9 px-3 rounded-lg
              border border-line-strong
              bg-white text-sm font-medium text-ink shadow-xs
              outline-none
            "
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <NavButton icon="chevron-left-double" disabled={page === 1} onClick={() => go(1)} />
        <NavButton icon="chevron-left" disabled={page === 1} onClick={() => go(page - 1)} />

        <div className="flex items-center gap-0.5">
          {items.map((it, i) =>
            it === '...' ? (
              <span key={i} className="px-2 text-subtle">...</span>
            ) : (
              <PagePill
                key={it}
                page={it}
                active={it === page}
                onClick={() => go(it)}
              />
            )
          )}
        </div>

        <NavButton icon="chevron-right" disabled={page === pages} onClick={() => go(page + 1)} />
        <NavButton icon="chevron-right-double" disabled={page === pages} onClick={() => go(pages)} />
      </div>
    </div>
  )
}

export const Pagination = memo(PaginationBase)
export default Pagination