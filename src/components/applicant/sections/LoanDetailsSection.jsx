import { memo } from 'react'
import SectionCard from '../../common/SectionCard'
import TonePill from '../../common/TonePill'
const ACCENT = { green: 'text-success-600', red: 'text-danger-600' }

const Field = memo(function Field({ label, value, pill, accent }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-muted">{label}</span>
      {pill ? (
        <span>
          <TonePill tone={pill}>{value}</TonePill>
        </span>
      ) : (
        <span className={`text-md font-medium ${accent ? ACCENT[accent] : 'text-ink'}`}>
          {value}
        </span>
      )}
    </div>
  )
})

const Grid = memo(function Grid({ items }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
      {items.map((f) => (
        <Field key={f.label} {...f} />
      ))}
    </div>
  )
})

function LoanDetailsSectionBase({ loanDetails }) {
  const { primary, sanction, team } = loanDetails
  return (
    <SectionCard icon="bank-note" title="Loan Details">
      <div className="flex flex-col gap-6 p-5">
        <Grid items={primary} />

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-ink">Sanction Details:</p>
          <Grid items={sanction} />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-ink">Team Details:</p>
          <Grid items={team} />
        </div>
      </div>
    </SectionCard>
  )
}

export const LoanDetailsSection = memo(LoanDetailsSectionBase)
export default LoanDetailsSection
