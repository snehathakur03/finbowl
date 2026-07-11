import { memo, useCallback, useMemo, useState } from 'react'
import Icon from '../common/Icon'

/*
  Filters bar above the table (Figma "Filters bar"): a 460px search input with
  the search icon on the right, and "Saved View" + "Export All" dropdowns
  aligned to the right edge of the table.
*/

const SAVED_VIEWS = [
  { id: 'my-loan-view', label: 'My Loan View', tag: 'Default View' },
  { id: 'priority-loans', label: 'Priority Loans' },
  { id: 'submitted-loans', label: 'Submitted Loans' },
  { id: 'draft-applications', label: 'Draft Applications' },
]

const SavedViewMenu = memo(function SavedViewMenu({ views, selected, onSelect, onClose, onApply, onCancel }) {
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} aria-hidden="true" />
      <div className="absolute top-full right-0 z-40 mt-2 flex max-h-58 w-64 flex-col rounded-xl border border-line-strong bg-white pt-5 shadow-md">
        <ul className="flex flex-col overflow-y-auto">
          {views.map((view) => (
            <li key={view.id} className="px-1.5 py-px">
              <label className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 hover:bg-zebra">
                <input
                  type="radio"
                  name="saved-view"
                  checked={selected === view.id}
                  onChange={() => onSelect(view.id)}
                  className="h-4 w-4 accent-brand-600"
                />
                <span className="flex-1 text-sm leading-5 font-medium text-ink-soft">
                  {view.label}
                </span>
                {view.tag && (
                  <span className="flex h-6 w-23 shrink-0 items-center justify-center gap-0.75 rounded-sm border border-line-strong px-3 text-center text-2xs leading-4.5 font-medium whitespace-nowrap text-ink-soft">
                    {view.tag}
                  </span>
                )}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-1 border-t border-line px-3 pt-3 pb-4">
          <button
            type="button"
            onClick={() => {
              onApply()
              onClose()
            }}
            className="flex h-8 w-28.5 items-center justify-center gap-1 rounded-md border-2 border-brand-600 bg-brand-600 px-2.5 py-1.5 text-sm leading-5 font-medium text-white shadow-xs hover:bg-brand-700"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => {
              onCancel()
              onClose()
            }}
            className="flex h-8 w-28.5 items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-sm leading-5 font-medium text-muted hover:bg-zebra"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
})

const SavedViewDropdown = memo(function SavedViewDropdown({ customViews, activeView, onApplyView }) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(activeView)

  const views = useMemo(() => [...SAVED_VIEWS, ...customViews], [customViews])

  const openMenu = useCallback(() => {
    setDraft(activeView)
    setOpen(true)
  }, [activeView])

  const cancelMenu = useCallback(() => setDraft(activeView), [activeView])
  const applyMenu = useCallback(() => onApplyView(draft), [draft, onApplyView])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openMenu())}
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-line-strong bg-white px-3 text-sm font-semibold text-subtle shadow-skeu hover:bg-[#fafafa]"
      >
        <span className="px-0.5">Saved View</span>
        <Icon name="chevron-down" className="h-5 w-5 text-[#a3a3a3]" />
      </button>
      {open && (
        <SavedViewMenu
          views={views}
          selected={draft}
          onSelect={setDraft}
          onClose={() => setOpen(false)}
          onApply={applyMenu}
          onCancel={cancelMenu}
        />
      )}
    </div>
  )
})

const DropdownButton = memo(function DropdownButton({ label, iconLeft }) {
  return (
    <button
      type="button"
      className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-line-strong bg-white px-3 text-sm font-semibold text-subtle shadow-skeu hover:bg-[#fafafa]"
    >
      {iconLeft && <Icon name={iconLeft} className="h-5 w-5 text-[#a3a3a3]" />}
      <span className="px-0.5">{label}</span>
      <Icon name="chevron-down" className="h-5 w-5 text-[#a3a3a3]" />
    </button>
  )
})

function FiltersBarBase({ value, onChange, customViews = [], activeView, onApplyView }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search — 460px, icon on the right */}
      <label className="flex h-9 w-full max-w-[460px] items-center gap-2 rounded-lg border border-line-strong bg-white py-2 pr-2 pl-3 shadow-xs">
        <Icon name="search-lg" className="h-4 w-4 shrink-0 text-[#a3a3a3]" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for disbursements"
          className="w-full bg-transparent text-sm text-ink placeholder:text-subtle focus:outline-none"
        />
        <span className="shrink-0 rounded border border-line px-1 text-2xs font-medium text-subtle">
          ⌘K
        </span>
      </label>

      {/* Right-aligned dropdowns */}
      <div className="ml-auto flex items-center gap-3">
        <SavedViewDropdown customViews={customViews} activeView={activeView} onApplyView={onApplyView} />
        <DropdownButton label="Export All" />
      </div>
    </div>
  )
}

export const FiltersBar = memo(FiltersBarBase)
export default FiltersBar
