import { memo } from 'react'
import Icon from '../common/Icon'
import Avatar from '../common/Avatar'
/*
  Right-hand slide-over "Activity Log" (Figma). Toggled from the header
  "Activity Logs" button. Renders a timeline with optional from/to change rows.
*/

const BADGE_TONES = {
  blue: 'bg-[#F0F9FF] border-[#BAE6FD] text-[#0369A1]',
  yellow: 'bg-[#FEFCE8] border-[#FEF08A] text-[#A16207]',
}

const DOT_TONES = {
  blue: 'bg-[#0EA5E9]',
  yellow: 'bg-[#EAB308]',
}

const ChangeBadge = memo(function ChangeBadge({ value, tone }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-2xs font-medium whitespace-nowrap ${BADGE_TONES[tone]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_TONES[tone]}`} aria-hidden="true" />
      {value}
    </span>
  )
})

const ChangeBlock = memo(function ChangeBlock({ change }) {
  const renderVal = (v) =>
    change.kind === 'status' ? (
      <ChangeBadge value={v} tone={v === 'Processed' ? 'yellow' : 'blue'} />
    ) : (
      <span className="text-sm font-medium text-ink">{v}</span>
    )
  return (
    <div>
      {change.label && (
        <p className="mt-3 mb-2 text-2xs font-medium text-black">{change.label}</p>
      )}
      <div className={`flex items-start rounded pt-2 pr-2 pb-3 pl-3 bg-[#FAFAFA] border border-line ${!change.label ? 'mt-3' : ''}`}>
        <div className="flex flex-1 flex-col items-start gap-1">
          <span className="text-sm text-muted">From</span>
          {renderVal(change.from)}
        </div>
        <div className="flex flex-1 flex-col items-start gap-1">
          <span className="text-sm text-muted">To</span>
          {renderVal(change.to)}
        </div>
      </div>
    </div>
  )
})

function ActivityLogBase({ activity, open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-120 flex-col bg-white shadow-xl">
        <div className="flex h-17 items-center justify-between border-b border-line px-5">
          <h2 className="text-lg leading-7 font-semibold text-ink">Activity Log</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-6 w-6 place-items-center rounded-md text-muted hover:bg-[#f5f5f5]"
            aria-label="Close activity log"
          >
            <Icon name="x" className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <ol className="flex flex-col">
            {activity.map((item) => (
              <li key={item.id} className="border-b border-line p-3 last:border-0">
                <div className="flex items-start gap-3">
                  <Avatar name={item.actor} size={32} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-ink">
                        {item.title}
                      </p>
                      <span className="text-2xs whitespace-nowrap text-muted">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{item.actor}</p>
                  </div>
                </div>
                {item.change && <ChangeBlock change={item.change} />}
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  )
}

export const ActivityLog = memo(ActivityLogBase)
export default ActivityLog
