/*
  Mock data for the Disbursement screen (metrics + a generated table dataset
  large enough to fill 10 pages of pagination).
*/

export const METRICS = [
  { id: 'count', label: 'Total Disbursements', value: '8' },
  { id: 'amount', label: 'Total Disbursed Amount', value: '₹3,62,50,000' },
  { id: 'submitted', label: 'Submitted', value: '24' },
  { id: 'verified', label: 'Verified', value: '31' },
  { id: 'processed', label: 'Processed', value: '33' },
  { id: 'audited', label: 'Audited', value: '12' },
]

/* Column order matches the Figma table exactly (checkbox is rendered separately). */
export const COLUMNS = [
  { key: 'date', label: 'Disbursement Date', sortable: true, variant: 'text', width: 'w-40' },
  { key: 'id', label: 'Loan ID', sortable: true, variant: 'link', width: 'w-36' },
  { key: 'status', label: 'Status', sortable: true, variant: 'status', width: 'w-32' },
  { key: 'applicant', label: 'Applicant Name', sortable: true, variant: 'text', width: 'w-44' },
  { key: 'bank', label: 'Bank Name', sortable: true, variant: 'text', width: 'w-44' },
  { key: 'sanctioned', label: 'Sanctioned Amt', sortable: true, variant: 'amount', width: 'w-40', align: 'right' },
  { key: 'verified', label: 'Verified', sortable: true, variant: 'verified', width: 'w-40', align: 'right' },
  { key: 'referral', label: 'Referral %', sortable: false, variant: 'text', width: 'w-28', align: 'right' },
  { key: 'creditExec', label: 'Credit Executive', sortable: true, variant: 'avatar', width: 'w-52' },
  { key: 'bankExec', label: 'Bank Executive', sortable: true, variant: 'avatar', width: 'w-52' },
]

const STATUSES = ['submitted', 'verified', 'audited', 'draft']
const APPLICANTS = [
  'Aarav Sharma', 'Isha Verma', 'Rohan Mehta', 'Priya Nair', 'Kabir Singh',
  'Ananya Iyer', 'Vivaan Gupta', 'Diya Joshi', 'Arjun Reddy', 'Sara Khan',
  'Ishaan Malhotra', 'Aisha Sheikh', 'Vihaan Rao', 'Myra Patel', 'Reyansh Jain',
]
const BANKS = [
  'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'State Bank of India', 'Kotak Mahindra',
  'Yes Bank', 'IDFC First Bank', 'Federal Bank', 'Punjab National Bank', 'Canara Bank',
]
const EXECS = [
  'Preethi Sharma', 'Amit Sharma', 'Florence Shaw', 'Natali Craig', 'Eduard Franz',
  'Katy Fuller', 'Kyla Clay', 'Courtney Turner', 'Orlando Diggs', 'Olivia Rhye',
]
const BANK_EXECS = [
  'Siddharth Kulkarni', 'Tanvi Menon', 'Deepa Pillai', 'Suresh Babu', 'Rahul Varma',
  'Pooja Saxena', 'Manish Tiwari', 'Kavita Desai', 'Ankit Pandey', 'Ritika Mishra',
]
const REFERRALS = ['0.5000%', '0.7500%', '1.0000%', '1.2500%', '1.5000%']

const inr = (n) =>
  `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const amt = (n) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const pad = (n) => String(n).padStart(2, '0')

/* Deterministic generator → 100 rows (10 pages × 10 rows). */
function generate(count = 100) {
  const rows = []
  for (let i = 0; i < count; i += 1) {
    const sanctioned = 100000 + ((i * 137) % 100) * 1000
    const status = STATUSES[i % STATUSES.length]
    const mismatch = i % 9 === 0
    const verified = mismatch ? sanctioned + 25000 : sanctioned
    const day = pad(((i * 3) % 28) + 1)
    const month = pad(((i * 2) % 12) + 1)
    const year = 2024 + (i % 4)
    const shortYear = String(year).slice(-2)
    const sequence = String((i % 999) + 1).padStart(3, '0')
    const running = String(1001 + i)
    rows.push({
      seed: i,
      id: `LN${sequence}-${shortYear}-${running}`,
      date: `${day}/${month}/${year}`,
      status,
      applicant: APPLICANTS[i % APPLICANTS.length],
      bank: BANKS[i % BANKS.length],
      sanctioned: amt(sanctioned),
      verified: status === 'submitted' ? '--' : inr(verified),
      match: !mismatch,
      referral: REFERRALS[i % REFERRALS.length],
      creditExec: EXECS[i % EXECS.length],
      bankExec: BANK_EXECS[(i * 7 + 3) % BANK_EXECS.length],
    })
  }
  return rows
}

export const DISBURSEMENTS = generate(100)

/* Column keys visible per built-in saved view; a view not listed here shows all columns. */
export const SAVED_VIEW_COLUMNS = {
  'my-loan-view': COLUMNS.map((c) => c.key),
  'priority-loans': ['date', 'id', 'status', 'applicant', 'sanctioned', 'verified'],
  'submitted-loans': ['date', 'id', 'status', 'applicant', 'bank', 'sanctioned'],
  'draft-applications': ['date', 'id', 'status', 'applicant', 'creditExec', 'bankExec'],
}

/* Row status filter per built-in saved view; a view not listed here shows every row. */
export const SAVED_VIEW_STATUS_FILTER = {
  'submitted-loans': 'submitted',
  'draft-applications': 'draft',
}
