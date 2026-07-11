import { memo, useState } from 'react'
import Icon from './Icon'

/*
  Collapsible bordered section (Figma "…Section" + "Component 2" header).
  Header: leading icon + title, optional right-aligned node (badge), chevron.
  Body collapses on header click.
*/
function SectionCardBase({ icon, title, headerRight, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="overflow-hidden rounded-card border border-black/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 border-b border-line bg-zebra py-3 pr-6 pl-5 text-left"
      >
        <span className="flex items-center gap-2">
          {icon && <Icon name={icon} className="h-4 w-4 text-black" strokeWidth={1.5} />}
          <span className="text-sm font-medium text-ink">{title}</span>
          {headerRight}
        </span>
        <Icon
          name={open ? 'chevron-up' : 'chevron-down'}
          className="h-4 w-4 text-black"
          strokeWidth={2}
        />
      </button>
      {open && <div>{children}</div>}
    </section>
  )
}

export const SectionCard = memo(SectionCardBase)
export default SectionCard
