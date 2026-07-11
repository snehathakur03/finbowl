import { memo } from 'react'
import Badge from './Badge'

/*
  Maps a disbursement status -> Figma badge palette (bg / border / text + dot).
  Rounded-md pill with a coloured dot, matching the "Status" column.
*/
const TONES = {
  success: {
    className: 'bg-[#F0FDF4] border-[#BBF7D0] text-[#15803D]',
    dot: 'bg-[#22C55E]',
  },
  info: {
    className: 'bg-[#F0F9FF] border-[#BAE6FD] text-[#0369A1]',
    dot: 'bg-[#0EA5E9]',
  },
  brand: {
    className: 'bg-[#F9F5FF] border-[#E9D7FE] text-[#6941C6]',
    dot: 'bg-[#9E77ED]',
  },
  warning: {
    className: 'bg-[#FEFCE8] border-[#FEF08A] text-[#A16207]',
    dot: 'bg-[#EAB308]',
  },
  neutral: {
    className: 'bg-[#FAFAFA] border-[#E5E5E5] text-[#404040]',
    dot: 'bg-[#737373]',
  },
}

/* Human label + tone for each disbursement lifecycle status. */
const STATUS_META = {
  submitted: { label: 'Submitted', tone: 'success' }, 
  verified: { label: 'Verified', tone: 'info' },      
  audited: { label: 'Audited', tone: 'brand' },       
  draft: { label: 'Draft', tone: 'neutral' },        
}

function StatusBadgeBase({ status }) {
  const meta = STATUS_META[status] ?? { label: status, tone: 'neutral' }
  const tone = TONES[meta.tone]
  return (
    <Badge rounded="md" className={tone.className} dotClassName={tone.dot}>
      {meta.label}
    </Badge>
  )
}

export const StatusBadge = memo(StatusBadgeBase)
export default StatusBadge
