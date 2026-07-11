import { useCallback, useEffect, useState } from 'react'
import AppLayout from './components/layout/AppLayout'
import DisbursementPage from './components/disbursement/DisbursementPage'
import ApplicantDetailsPage from './components/applicant/ApplicantDetailsPage'

/*
  Lightweight view switching (no router dependency): the Disbursement list and
  the Applicant/Loan detail page. Clicking a Loan ID opens the detail view;
  the detail breadcrumb returns to the list. The location hash (#detail) keeps
  the current view shareable/refresh-safe.
*/
const viewFromHash = () =>
  window.location.hash === '#detail' ? 'detail' : 'list'

export default function App() {
  const [view, setView] = useState(viewFromHash)
  const [selectedLoan, setSelectedLoan] = useState(null)

  useEffect(() => {
    const onHash = () => setView(viewFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const openDetail = useCallback((row) => {
    setSelectedLoan(row)
    window.location.hash = 'detail'
    setView('detail')
  }, [])
  const openList = useCallback(() => {
    window.location.hash = ''
    setView('list')
  }, [])

  return (
    <AppLayout>
      {view === 'list' ? (
        <DisbursementPage onOpenLoan={openDetail} />
      ) : (
        <ApplicantDetailsPage loan={selectedLoan} onBack={openList} />
      )}
    </AppLayout>
  )
}
