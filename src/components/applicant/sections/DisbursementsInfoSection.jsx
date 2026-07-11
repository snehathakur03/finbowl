import { memo } from 'react'
import SectionCard from '../../common/SectionCard'
import DetailTable from '../../common/DetailTable'
import TonePill from '../../common/TonePill'
const columns = [
  { key: 'dbId', label: 'Disbursement ID' },
  { key: 'date', label: 'Disbursement Date' },
  {
    key: 'amount',
    label: 'Disbursement Amount',
    render: (r) => <span className="text-success-600">{r.amount}</span>,
  },
  {
    key: 'verified',
    label: 'Verified Disbursement Amount',
    render: (r) => (
      <span className={r.match ? 'text-success-600' : 'text-danger-600'}>
        {r.verified}
      </span>
    ),
  },
  { key: 'utr', label: 'UTR Number' },
  { key: 'tranche', label: 'Tranche' },
  {
    key: 'status',
    label: 'Disbursement Status',
    render: (r) => <TonePill tone="yellow">{r.status}</TonePill>,
  },
]

function DisbursementsInfoSectionBase({ disbursements }) {
  return (
    <SectionCard icon="coins-hand" title="Disbursements Information">
      <DetailTable columns={columns} rows={disbursements} minWidth={1080} />
    </SectionCard>
  )
}

export const DisbursementsInfoSection = memo(DisbursementsInfoSectionBase)
export default DisbursementsInfoSection
