import { memo } from 'react'
import SectionCard from '../../common/SectionCard'
import DetailTable from '../../common/DetailTable'
import TonePill from '../../common/TonePill'
const columns = [
  { key: 'party', label: 'Party Name (Used Code)' },
  { key: 'sub', label: 'Sub-Code Commission (Net)%' },
  { key: 'gross', label: 'Gross Commission %' },
  {
    key: 'amount',
    label: 'Commission Amount',
    render: (r) => <span className="text-success-600">{r.amount}</span>,
  },
  {
    key: 'invoice',
    label: 'Invoice No',
    render: (r) => (
      <a href="#" className="text-[#2965AB] hover:underline">
        {r.invoice}
      </a>
    ),
  },
  {
    key: 'invoiceStatus',
    label: 'Invoice Status',
    render: (r) => <TonePill tone="green">{r.invoiceStatus}</TonePill>,
  },
]

function CommissionSectionBase({ commissions, commissionTotal }) {
  return (
    <SectionCard
      icon="coins-hand"
      title="Commission"
      headerRight={
        <TonePill tone="green">Total Commission : {commissionTotal}</TonePill>
      }
    >
      <DetailTable columns={columns} rows={commissions} minWidth={980} />
    </SectionCard>
  )
}

export const CommissionSection = memo(CommissionSectionBase)
export default CommissionSection
