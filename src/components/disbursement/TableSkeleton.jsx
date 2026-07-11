import { memo } from 'react'
import { COLUMNS } from '../../data/mockDisbursements'

/*
  Loading state: mirrors the table's column layout with shimmer bars so the
  transition to real data doesn't shift the layout.
*/
function TableSkeletonBase({ rows = 8 }) {
  return (
    <div className="scroll-thin overflow-x-auto rounded-card border border-line shadow-xs">
      <table className="w-full table-fixed border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-14 border-b border-line bg-head px-4 py-5" />
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`${col.width} border-b border-line bg-head px-4 py-5 text-left`}
              >
                <span className="skeleton block h-3 w-16" />
              </th>
            ))}
            <th className="w-16 border-b border-line bg-head px-3 py-5" />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} className={r % 2 === 1 ? 'bg-zebra' : 'bg-white'}>
              <td className="border-b border-line px-4 py-[18px]">
                <span className="skeleton mx-auto block h-4 w-4" />
              </td>
              {COLUMNS.map((col) => (
                <td
                  key={col.key}
                  className={`${col.width} border-b border-line px-4 py-[18px]`}
                >
                  <span
                    className="skeleton block h-3.5"
                    style={{ width: `${55 + ((r + col.key.length) % 4) * 12}%` }}
                  />
                </td>
              ))}
              <td className="border-b border-line px-3 py-[18px]">
                <span className="skeleton mx-auto block h-4 w-4" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const TableSkeleton = memo(TableSkeletonBase)
export default TableSkeleton
