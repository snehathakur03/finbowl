import { memo } from 'react'
import SectionCard from '../../common/SectionCard'
const FileCard = memo(function FileCard({ name, size }) {
  return (
    <div className="flex min-w-[240px] flex-1 items-center gap-3 rounded-lg border border-line bg-white p-3">
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded border border-line-strong">
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-[2px] bg-danger-600 px-1 text-[8px] leading-3 font-bold text-white">
          PDF
        </span>
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-ink-soft">{name}</span>
        <span className="text-sm text-muted">{size}</span>
      </span>
    </div>
  )
})

function DocumentsSectionBase({ documents }) {
  return (
    <SectionCard icon="file" title="Documents">
      <div className="flex flex-wrap gap-3 p-5">
        {documents.map((d) => (
          <FileCard key={d.id} {...d} />
        ))}
      </div>
    </SectionCard>
  )
}

export const DocumentsSection = memo(DocumentsSectionBase)
export default DocumentsSection
