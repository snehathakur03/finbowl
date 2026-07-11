import { memo } from 'react'
import Icon from '../common/Icon'

/*
  Purple gradient navigation rail (Figma, 288px).
  Structure mirrors the design: search field, top-level links, an expanded
  "RMS" group whose "Disbursement" child is active, more links, and a
  "Version 1.0" footer tag.
*/

const NAV_TOP = [
  { icon: 'layout-grid', label: 'Dashboard' },
  { icon: 'coins', label: 'Finance', caret: true },
  { icon: 'trending-up', label: 'Sales CRM', caret: true },
]

const RMS_CHILDREN = [
  { icon: 'layout-grid', label: 'Dashboard' },
  { icon: 'coins-hand', label: 'Disbursement', active: true },
  { icon: 'file-check', label: 'Invoices' },
  { icon: 'clipboard', label: 'PO' },
  { icon: 'bar-chart', label: 'RMS Reports' },
]

const NAV_BOTTOM = [
  { icon: 'shield-tick', label: 'Compliance', caret: true },
  { icon: 'users', label: 'Vendors', caret: true },
  { icon: 'magic-wand', label: 'AI Suite', caret: true },
  { icon: 'file', label: 'Reports', caret: true },
]

const Logo = memo(function Logo() {
  return (
    <div className="flex items-center gap-2 px-5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">
        <Icon name="bowl" className="h-5 w-5 text-white" strokeWidth={1.8} />
      </span>
      <span className="text-[21px] leading-8 font-normal text-white">
        FinBowl
      </span>
    </div>
  )
})

const NavLink = memo(function NavLink({
  icon,
  label,
  active,
  inset,
  caret,
  onNavigate,
}) {
  return (
    <a
      href="#"
      aria-current={active ? 'page' : undefined}
      onClick={(e) => {
        e.preventDefault()
        onNavigate?.(label)
      }}
      className={`group relative flex items-center gap-2.5 py-2.5 text-sm transition-colors ${
        inset ? 'pr-3 pl-11' : 'mx-4 rounded-md px-3'
      } ${
        inset && !active ? 'mx-5' : ''
      } ${
        inset && active ? 'ml-5 rounded-l-md' : ''
      } ${
        active
          ? 'bg-white/10 font-semibold text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]'
          : 'font-normal text-white/60 hover:bg-white/5 hover:text-white/90'
      }`}
    >
      {inset && active && (
        <span className="absolute top-0 -left-5 h-full w-px bg-white" aria-hidden="true" />
      )}
      <Icon
        name={icon}
        className={`h-[18px] w-[18px] ${active ? 'text-white' : 'text-white/70'}`}
      />
      <span className="flex-1 truncate">{label}</span>
      {caret && (
        <Icon name="chevron-down" className="h-4 w-4 text-white/50" />
      )}
    </a>
  )
})

function SidebarBase({ onNavigate }) {
  return (
    <nav
      className="bg-sidebar flex h-full w-72 shrink-0 flex-col pt-4 pb-4 text-white shadow-xs"
      aria-label="Primary"
    >
      <Logo />

      <div className="my-2 h-px w-full border-t border-white/10" aria-hidden="true" />

      <div className="px-4 py-3">
        {/* Search */}
        <div className="flex h-9 items-center gap-2 rounded-lg bg-brand-800 py-2 pr-2 pl-3 shadow-xs">
          <Icon name="search-lg" className="h-4 w-4 shrink-0 text-white/90" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-sm leading-5 font-normal text-white placeholder:text-white/90 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        {NAV_TOP.map((item) => (
          <NavLink key={item.label} {...item} onNavigate={onNavigate} />
        ))}

        {/* RMS group (expanded) */}
        <div className="flex items-end justify-between px-5 py-2.75">
          <span className="flex items-center gap-2 text-sm leading-5 font-medium text-white">
            <Icon name="bank" className="h-[18px] w-[18px] text-white" />
            RMS
          </span>
          <Icon name="chevron-up" className="h-4 w-4 text-white" />
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute top-0 bottom-0 left-7 w-px bg-white/10" aria-hidden="true" />
          {RMS_CHILDREN.map((item) => (
            <NavLink key={item.label} {...item} inset onNavigate={onNavigate} />
          ))}
        </div>

        <div className="my-0.5 px-5 py-0.5">
          <div className="h-px border-t border-white/10" />
        </div>

        {NAV_BOTTOM.map((item) => (
          <NavLink key={item.label} {...item} onNavigate={onNavigate} />
        ))}
      </div>

      {/* Version tag */}
      <div className="flex justify-center px-5 pt-2">
        <span className="rounded-full border border-white/20 px-3 py-1 text-2xs font-medium text-white/80">
          Version 1.0
        </span>
      </div>
    </nav>
  )
}

export const Sidebar = memo(SidebarBase)
export default Sidebar
