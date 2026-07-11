import { memo } from 'react'
import SectionCard from '../../common/SectionCard'
import DetailTable from '../../common/DetailTable'
import TonePill from '../../common/TonePill'
const columns = [
  {
    key: 'name',
    label: 'Broker Name / Code',
    render: (r) => (
      <span className="flex items-center gap-2">
        <span className="flex flex-col leading-tight">
          <span className="text-ink">{r.name}</span>
          <span className="text-2xs text-subtle">{r.code}</span>
        </span>
        <TonePill tone="gray">{r.role}</TonePill>
      </span>
    ),
  },
  { key: 'commission', label: 'Broker Commission %' },
  { key: 'fee', label: 'Referral Fee' },
  {
    key: 'po',
    label: 'PO No & Date',
    render: (r) => (
      <span className="flex items-center gap-3">
        <a href="#" className="text-[#A72C9B] hover:underline">
          {r.po}
        </a>
        <span className="text-subtle">{r.poDate}</span>
      </span>
    ),
  },
  {
    key: 'poStatus',
    label: 'PO Status',
    render: (r) => <TonePill tone="green">{r.poStatus}</TonePill>,
  },
]

function BrokerInfoSectionBase({ brokers, referralTotal }) {
  return (
    <SectionCard
      icon="users"
      title="Broker Information"
      headerRight={
        <TonePill tone="pink">Total Referral Fee: {referralTotal}</TonePill>
      }
    >
      <DetailTable columns={columns} rows={brokers} minWidth={980} />
    </SectionCard>
  )
}

export const BrokerInfoSection = memo(BrokerInfoSectionBase)
export default BrokerInfoSection
