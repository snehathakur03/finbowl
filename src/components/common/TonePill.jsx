import { memo } from 'react'

/*
  Small status/label pill with a named colour tone (bg / border / text),
  taken from the Figma badge palette. Used across the detail page for
  Applicant / Co-Applicant / Home Loan / Processed / Paid / Aggregator etc.
*/
const TONES = {
  green: 'bg-[#F0FDF4] border-[#BBF7D0] text-[#15803D]',
  gray: 'bg-[#FAFAFA] border-[#E5E5E5] text-[#404040]',
  purple: 'bg-[#F9F5FF] border-[#E9D7FE] text-[#6941C6]',
  yellow: 'bg-[#FEFCE8] border-[#FEF08A] text-[#A16207]',
  pink: 'bg-[#FDF2F8] border-[#FBCFE8] text-[#BE185D]',
  blue: 'bg-[#F0F9FF] border-[#BAE6FD] text-[#0369A1]',
  red: 'bg-[#FEF2F2] border-[#FECACA] text-[#B91C1C]',
}

function TonePillBase({ tone = 'gray', children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-2xs font-medium whitespace-nowrap ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export const TonePill = memo(TonePillBase)
export default TonePill
