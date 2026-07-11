import { memo } from 'react'
/*
  Row of 5 summary tiles (Figma "Metric item"). The last tile (Net Income) is
  highlighted green. Reflows on narrower viewports via flex-wrap.
*/
const Tile = memo(function Tile({ label, value, highlight }) {
  return (
    <div
      className={`flex min-w-[190px] flex-1 flex-col gap-2 rounded-card border p-5 shadow-xs ${
        highlight ? 'border-[#BBF7D0] bg-[#F0FDF4]' : 'border-line bg-white'
      }`}
    >
      <span className="truncate text-sm font-medium text-muted">{label}</span>
      <span
        className={`text-2xl leading-8 font-medium tabular-nums whitespace-nowrap ${
          highlight ? 'text-success-600' : 'text-ink'
        }`}
      >
        {value}
      </span>
    </div>
  )
})

function SummaryTilesBase({ summary }) {
  return (
    <div className="flex flex-wrap gap-4">
      {summary.map((t) => (
        <Tile key={t.id} {...t} />
      ))}
    </div>
  )
}

export const SummaryTiles = memo(SummaryTilesBase)
export default SummaryTiles
