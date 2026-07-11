import { memo } from 'react'
import { TABS } from '../../data/mockApplicant'

/*
  Left vertical tab list (Figma "Vertical tabs"). Selecting a tab scrolls its
  matching section into view; the active tab uses the brand pill styling.
*/
function VerticalTabsBase({ active, onSelect }) {
  return (
    <nav className="flex w-[217px] shrink-0 flex-col gap-1">
      {TABS.map((tab) => {
        const isActive = tab === active
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelect(tab)}
            className={`rounded-md px-2.5 py-2 text-left text-sm font-medium transition-colors ${
              isActive
                ? 'bg-head text-brand-700'
                : 'text-subtle hover:bg-[#f5f5f5] hover:text-ink'
            }`}
          >
            {tab}
          </button>
        )
      })}
    </nav>
  )
}

export const VerticalTabs = memo(VerticalTabsBase)
export default VerticalTabs
