/*
  Mock data for the Applicant / Loan Details page, derived deterministically
  from the clicked Disbursement row so every Loan ID shows distinct details.
*/

export const TABS = [
  'Applicant Information',
  'Loan Details',
  'Disbursements Information',
  'Commission',
  'Broker Information',
  'Additional Information',
]

const CO_APPLICANTS = [
  'Priya Sharma', 'Neha Gupta', 'Karan Malhotra', 'Simran Kaur', 'Vikram Rao',
]
const SOURCES = ['Ramesh Kumar', 'Anjali Mehta', 'Ravi Patel', 'Sneha Iyer', 'Karthik Nair']
const CONNECTORS = ['Amit Sharma', 'Ravi Patel', 'Sita Verma', 'Deepak Joshi', 'Meera Nair']
const BRANCHES = ['Adyar Branch', 'Andheri Branch', 'Koramangala Branch', 'Sector 18 Branch', 'Salt Lake Branch']
const STATUS_LABELS = {
  submitted: 'Submitted',
  verified: 'Verified',
  audited: 'Audited',
  draft: 'Draft',
}
const STATUS_TONE = {
  submitted: 'green',
  verified: 'blue',
  audited: 'purple',
  draft: 'gray',
}

const rupee = (n) =>
  `₹${Math.round(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function activityTime(dateStr, seed) {
  const [day, month] = String(dateStr ?? '20/05/2026').split('/').map(Number)
  const monthName = MONTHS[(month || 5) - 1]
  const hour24 = (8 + (seed % 10)) % 24
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
  const minute = (seed * 7) % 60
  const period = hour24 >= 12 ? 'PM' : 'AM'
  return `${day} ${monthName} (${hour12}:${String(minute).padStart(2, '0')} ${period})`
}

const parseAmount = (value) => Number(String(value).replace(/[^0-9.]/g, '')) || 0

function seededPick(list, seed, offset = 0) {
  return list[(seed + offset) % list.length]
}

export function buildApplicantDetail(row) {
  const seed = row?.seed ?? 0
  const sanctionedAmount = parseAmount(row?.sanctioned) || 480000
  const status = row?.status ?? 'processed'
  const statusLabel = STATUS_LABELS[status] ?? 'Processed'
  const statusTone = STATUS_TONE[status] ?? 'yellow'

  const loan = {
    id: `Loan - ${row?.id ?? '2026-04892'}`,
    applicant: row?.applicant ?? 'Rahul Verma',
    status: statusLabel,
    statusTone,
    type: seed % 2 === 0 ? 'Home Loan' : 'Personal Loan',
  }

  const disbursedAmount = sanctionedAmount * 9
  const commissionAmount = sanctionedAmount * 0.109
  const referralAmount = sanctionedAmount * 0.039
  const netIncome = commissionAmount + referralAmount

  const summary = [
    { id: 'sanctioned', label: 'Total Sanctioned Amount', value: rupee(sanctionedAmount) },
    { id: 'disbursed', label: 'Total Disbursement Amount', value: rupee(disbursedAmount) },
    { id: 'commission', label: 'Commission Income', value: rupee(commissionAmount) },
    { id: 'referral', label: 'Referral Fee', value: rupee(referralAmount) },
    { id: 'net', label: 'Net Income', value: rupee(netIncome), highlight: true },
  ]

  const applicants = [
    {
      id: 'a1',
      name: loan.applicant,
      type: 'Applicant',
      tone: 'green',
      email: `${loan.applicant.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      phone: `+91 9${String(800000000 + seed * 137).slice(0, 9)}`,
    },
    {
      id: 'a2',
      name: seededPick(CO_APPLICANTS, seed, 1),
      type: 'Co-Applicant',
      tone: 'gray',
      email: `${seededPick(CO_APPLICANTS, seed, 1).toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      phone: `+91 9${String(123456780 + seed * 91).slice(0, 9)}`,
    },
  ]

  const loanDetails = {
    primary: [
      { label: 'Loan ID', value: row?.id ?? 'LN001-24-1001' },
      { label: 'Loan Type', value: loan.type, pill: 'purple' },
      { label: 'Bank', value: `${row?.bank ?? 'HDFC Bank'} - (${seededPick(BRANCHES, seed)})` },
      { label: 'Stage', value: statusLabel },
    ],
    sanction: [
      { label: 'Sanctioned Date', value: row?.date ?? '22/11/2024' },
      { label: 'Loan Sanctioned Amount', value: rupee(sanctionedAmount), accent: 'green' },
      {
        label: 'Verified Sanctioned Amount',
        value: row?.verified && row.verified !== '--' ? row.verified : rupee(sanctionedAmount),
        accent: row?.match === false ? 'red' : 'green',
      },
    ],
    team: [
      { label: 'Bank Executive Name', value: row?.bankExec ?? 'Amit Sharma' },
      { label: 'Credit Executive Details', value: row?.creditExec ?? 'Preethi Sharma' },
      { label: 'Source', value: seededPick(SOURCES, seed) },
    ],
  }

  const disbursements = Array.from({ length: 3 }).map((_, i) => {
    const chunk = sanctionedAmount * (3 + i) / 10
    const mismatch = (seed + i) % 5 === 0
    return {
      id: `${row?.id ?? 'DB0001'}-${i}`,
      dbId: row?.id ?? 'DB0001',
      date: row?.date ?? '22-11-2024',
      amount: rupee(chunk),
      verified: rupee(mismatch ? chunk + sanctionedAmount * 0.05 : chunk),
      match: !mismatch,
      utr: String(426715893247 + seed * 3 + i),
      tranche: i === 2 ? 'Full' : 'Partial',
      status: statusLabel,
    }
  })

  const commissionPct = 0.75 + (seed % 5) * 0.1
  const commissions = [
    {
      id: 'c1',
      party: row?.bankExec ?? 'Amit Sharma',
      sub: `${commissionPct.toFixed(4)}%`,
      gross: `${(commissionPct * 1.4).toFixed(4)}%`,
      amount: rupee(commissionAmount * 0.55),
      invoice: `RMS-INV-2026-${String(100 + seed).padStart(5, '0')}`,
      invoiceStatus: 'Paid',
    },
    {
      id: 'c2',
      party: seededPick(CONNECTORS, seed, 2),
      sub: `${(commissionPct + 0.1).toFixed(4)}%`,
      gross: `${(commissionPct * 1.6).toFixed(4)}%`,
      amount: rupee(commissionAmount * 0.45),
      invoice: `RMS-INV-2026-${String(101 + seed).padStart(5, '0')}`,
      invoiceStatus: 'Paid',
    },
  ]
  const commissionTotal = rupee(commissionAmount)

  const brokers = [
    {
      id: 'b1',
      name: seededPick(CONNECTORS, seed),
      code: `CON-${String(1 + (seed % 9)).padStart(3, '0')}`,
      role: 'Aggregator',
      commission: `${commissionPct.toFixed(4)}%`,
      fee: rupee(referralAmount * 0.6),
      po: `RMS-PO-2026-${String(200 + seed).padStart(5, '0')}`,
      poDate: row?.date ?? '22-11-2024',
      poStatus: 'Paid',
    },
    {
      id: 'b2',
      name: seededPick(CONNECTORS, seed, 3),
      code: `CON-${String(2 + (seed % 9)).padStart(3, '0')}`,
      role: 'Sub-connector',
      commission: `${(commissionPct + 0.15).toFixed(4)}%`,
      fee: rupee(referralAmount * 0.4),
      po: `RMS-PO-2026-${String(201 + seed).padStart(5, '0')}`,
      poDate: row?.date ?? '23-11-2024',
      poStatus: 'Paid',
    },
  ]
  const referralTotal = rupee(referralAmount)

  const notes = `${loan.applicant} applied for a ${loan.type.toLowerCase()} via ${row?.bank ?? 'HDFC Bank'} for ₹${Math.round(
    sanctionedAmount,
  ).toLocaleString('en-IN')}. Documents verified successfully and income proof has been submitted. Current stage: ${statusLabel}.`

  const documents = [
    { id: 'd1', name: 'Invoices.pdf', size: '800 KB' },
    { id: 'd2', name: 'Sanction-Letter.pdf', size: '640 KB' },
    { id: 'd3', name: 'KYC-Documents.pdf', size: '1.2 MB' },
    { id: 'd4', name: 'Income-Proof.pdf', size: '900 KB' },
  ]

  const activity = [
    {
      id: 'act1',
      actor: row?.creditExec ?? 'Amit Sharma',
      title: 'Loan Created',
      time: activityTime(row?.date, seed),
    },
    {
      id: 'act2',
      actor: row?.creditExec ?? 'Amit Sharma',
      title: 'Status Updated',
      time: activityTime(row?.date, seed + 1),
      change: { label: null, from: 'Verified', to: statusLabel, kind: 'status' },
    },
    {
      id: 'act3',
      actor: row?.bankExec ?? 'Amit Sharma',
      title: 'Updated',
      time: activityTime(row?.date, seed + 2),
      change: {
        label: 'Disbursed Amount',
        from: rupee(disbursedAmount * 0.9),
        to: rupee(disbursedAmount),
        kind: 'text',
      },
    },
  ]

  return {
    loan,
    summary,
    applicants,
    loanDetails,
    disbursements,
    commissions,
    commissionTotal,
    brokers,
    referralTotal,
    notes,
    documents,
    activity,
  }
}
