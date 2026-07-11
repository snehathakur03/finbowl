import { memo } from 'react'
import SectionCard from '../../common/SectionCard'
import DetailTable from '../../common/DetailTable'
import TonePill from '../../common/TonePill'
const columns = [
  { key: 'name', label: 'Name' },
  {
    key: 'type',
    label: 'Type',
    render: (r) => <TonePill tone={r.tone}>{r.type}</TonePill>,
  },
  {
    key: 'email',
    label: 'Email ID',
    render: (r) => <span className="text-ink">{r.email}</span>,
  },
  { key: 'phone', label: 'Phone Number' },
]

function ApplicantInfoSectionBase({ applicants }) {
  return (
    <SectionCard icon="users-check" title="Applicant Information">
      <DetailTable columns={columns} rows={applicants} minWidth={760} />
    </SectionCard>
  )
}

export const ApplicantInfoSection = memo(ApplicantInfoSectionBase)
export default ApplicantInfoSection
