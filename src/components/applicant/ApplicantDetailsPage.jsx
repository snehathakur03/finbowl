import { memo, useCallback, useMemo, useRef, useState } from 'react'
import Icon from '../common/Icon'
import Button from '../common/Button'
import Toggle from '../common/Toggle'
import TonePill from '../common/TonePill'
import SummaryTiles from './SummaryTiles'
import VerticalTabs from './VerticalTabs'
import ActivityLog from './ActivityLog'
import ApplicantInfoSection from './sections/ApplicantInfoSection'
import LoanDetailsSection from './sections/LoanDetailsSection'
import DisbursementsInfoSection from './sections/DisbursementsInfoSection'
import CommissionSection from './sections/CommissionSection'
import BrokerInfoSection from './sections/BrokerInfoSection'
import NotesSection from './sections/NotesSection'
import DocumentsSection from './sections/DocumentsSection'
import { TABS, buildApplicantDetail } from '../../data/mockApplicant'

/* Header row: loan id + breadcrumb + Archive / Activity Logs / Edit Loan. */
const DetailHeader = memo(function DetailHeader({ loan, onBack, onOpenActivity }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-ink">{loan.id}</h1>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 text-2xs font-medium"
        >
          <span className="text-subtle">RMS</span>
          <Icon name="chevron-right" className="h-4 w-4 text-line-strong" />
          <button
            type="button"
            onClick={onBack}
            className="text-subtle hover:text-brand-700"
          >
            Disbursement
          </button>
          <Icon name="chevron-right" className="h-4 w-4 text-line-strong" />
          <span className="text-brand-700">{loan.applicant}</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Button iconLeft="archive">Archive</Button>
        <Button iconLeft="clock-refresh" onClick={onOpenActivity}>
          Activity Logs
        </Button>
        <Button variant="primary" iconLeft="edit">
          Edit Loan
        </Button>
      </div>
    </div>
  )
})

function ApplicantDetailsPageBase({ loan: row, onBack }) {
  const [summaryOn, setSummaryOn] = useState(true)
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [activityOpen, setActivityOpen] = useState(false)
  const sectionRefs = useRef({})

  const detail = useMemo(() => buildApplicantDetail(row), [row])
  const { loan, summary, applicants, loanDetails, disbursements, commissions, commissionTotal, brokers, referralTotal, notes, documents, activity } = detail

  const registerRef = useCallback(
    (label) => (el) => {
      sectionRefs.current[label] = el
    },
    [],
  )

  const selectTab = useCallback((label) => {
    setActiveTab(label)
    sectionRefs.current[label]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-[1632px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <DetailHeader
        loan={loan}
        onBack={onBack}
        onOpenActivity={() => setActivityOpen(true)}
      />

      {/* Main card */}
      <section className="flex flex-col gap-5 rounded-card border border-line bg-white p-5 shadow-card">
        {/* Card header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-ink">
                {loan.applicant}
              </h2>
              <TonePill tone={loan.statusTone}>{loan.status}</TonePill>
            </div>
            <p className="text-sm text-muted">{loan.type}</p>
          </div>
          <label className="flex items-center gap-2">
            <Toggle
              checked={summaryOn}
              onChange={setSummaryOn}
              label="Summary Tiles"
            />
            <span className="text-sm font-medium text-ink-soft">
              Summary Tiles
            </span>
          </label>
        </div>

        {summaryOn && <SummaryTiles summary={summary} />}

        <div className="h-px w-full bg-line" />

        {/* Tabs + sections */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="lg:sticky lg:top-2">
            <VerticalTabs active={activeTab} onSelect={selectTab} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div ref={registerRef('Applicant Information')}>
              <ApplicantInfoSection applicants={applicants} />
            </div>
            <div ref={registerRef('Loan Details')}>
              <LoanDetailsSection loanDetails={loanDetails} />
            </div>
            <div ref={registerRef('Disbursements Information')}>
              <DisbursementsInfoSection disbursements={disbursements} />
            </div>
            <div ref={registerRef('Commission')}>
              <CommissionSection commissions={commissions} commissionTotal={commissionTotal} />
            </div>
            <div ref={registerRef('Broker Information')}>
              <BrokerInfoSection brokers={brokers} referralTotal={referralTotal} />
            </div>
            <div ref={registerRef('Additional Information')}>
              <NotesSection notes={notes} />
            </div>
            <DocumentsSection documents={documents} />
          </div>
        </div>
      </section>

      <ActivityLog
        activity={activity}
        open={activityOpen}
        onClose={() => setActivityOpen(false)}
      />
    </div>
  )
}

export const ApplicantDetailsPage = memo(ApplicantDetailsPageBase)
export default ApplicantDetailsPage
