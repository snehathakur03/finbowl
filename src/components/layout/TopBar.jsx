import { memo } from 'react'
import Icon from '../common/Icon'
import Avatar, { avatarSrc } from '../common/Avatar'

/*
  White top bar (Figma "Top Bar", 68px): two org selector dropdowns on the
  left, a notification bell with a red counter, and the user avatar on the right.
*/

const FilterButton = memo(function FilterButton({ icon, label }) {
  return (
    <button
      type="button"
      className="flex h-9 w-[232px] items-center justify-between gap-1 rounded-lg border border-line-strong bg-white px-3 text-sm font-medium text-ink-soft shadow-skeu hover:bg-[#fafafa]"
    >
      <span className="flex items-center gap-1.5">
        <Icon name={icon} className="h-5 w-5 text-[#a3a3a3]" />
        <span className="truncate">{label}</span>
      </span>
      <Icon name="chevron-down" className="h-4 w-4 text-[#a3a3a3]" />
    </button>
  )
})

function TopBarBase({ onToggleSidebar }) {
  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between gap-2.5 border-b border-line bg-white py-2.5 pr-6 pl-5">
      {/* Mobile sidebar toggle */}
      <button
        type="button"
        onClick={onToggleSidebar}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-strong text-ink-soft lg:hidden"
        aria-label="Toggle navigation"
      >
        <Icon name="columns" className="h-5 w-5" />
      </button>

      {/* Left org selectors */}
      <div className="flex min-w-0 items-center gap-2">
        <FilterButton icon="building" label="Gracia Advisory Group" />
        <FilterButton icon="building" label="ABC Advisory Group" />
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          className="relative grid h-9 w-9 place-items-center rounded-md hover:bg-[#f5f5f5]"
          aria-label="Notifications"
        >
          <Icon name="bell" className="h-5 w-5 text-[#a3a3a3]" />
          <span className="absolute -top-px -right-px grid h-3.5 w-3.5 place-items-center rounded-full bg-danger-600 text-[10px] leading-none font-bold text-white">
            3
          </span>
        </button>
        <Avatar name="Olivia Rhye" src={avatarSrc('Olivia Rhye')} size={32} />
      </div>
    </header>
  )
}

export const TopBar = memo(TopBarBase)
export default TopBar
