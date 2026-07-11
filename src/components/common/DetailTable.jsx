import { memo } from 'react'
import Icon from './Icon'

/*
  Reusable read-only table used by the detail sections
  (Applicant / Disbursements / Commission / Broker).
  columns: [{ key, label, align?, sortable?, width?, render?(row) }]
  Header cells use the Figma #F9F5FF fill; rows are separated by hairlines.
*/

const alignClass = { left: 'text-left', right: 'text-right', center: 'text-center' }

function DetailTableBase({ columns, rows, minWidth = 720 }) {
  return (
    <div className="scroll-thin overflow-x-auto p-3">
      <div className="overflow-hidden rounded-card border border-line">
        <table
          className="w-full border-collapse text-sm"
          style={{ minWidth }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  className={`border-b border-line bg-head px-4 py-5 align-middle ${alignClass[col.align] ?? 'text-left'}`}
                >
                  <span
                    className={`inline-flex items-center gap-1 text-2xs font-medium text-muted ${
                      col.align === 'right' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {col.label}
                    {col.sortable !== false && (
                      <Icon
                        name="chevrons-updown"
                        className="h-3 w-3 text-muted"
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={row.id ?? r}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`border-b border-line px-4 py-[18px] whitespace-nowrap ${alignClass[col.align] ?? 'text-left'} ${
                      r === rows.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    {col.render ? (
                      col.render(row)
                    ) : (
                      <span className="text-sm text-ink">{row[col.key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const DetailTable = memo(DetailTableBase)
export default DetailTable
