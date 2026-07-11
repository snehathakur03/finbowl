import { memo } from 'react'
import SectionCard from '../../common/SectionCard'
function NotesSectionBase({ notes }) {
  return (
    <SectionCard icon="file" title="Notes / Additional Information">
      <p className="max-w-4xl px-5 py-4 text-md leading-6 text-ink">{notes}</p>
    </SectionCard>
  )
}

export const NotesSection = memo(NotesSectionBase)
export default NotesSection
