import { useCallback, useEffect, useRef, useState } from 'react'
import { DISBURSEMENTS, METRICS } from '../data/mockDisbursements'

/*
  Simulated data layer for the Disbursement table.

  Returns { status, rows, metrics, retry } where status is one of
  'loading' | 'error' | 'empty' | 'success'. The `scenario` argument
  ('success' | 'error' | 'empty') lets the UI demonstrate every state
  without real endpoints; it resolves after ~900ms via setTimeout to
  mimic a network round-trip.
*/
export function useDisbursements(scenario = 'success') {
  const [status, setStatus] = useState('loading')
  const [rows, setRows] = useState([])
  const timer = useRef(null)

  const load = useCallback(() => {
    setStatus('loading')
    setRows([])
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (scenario === 'error') {
        setStatus('error')
        return
      }
      if (scenario === 'empty') {
        setRows([])
        setStatus('empty')
        return
      }
      setRows(DISBURSEMENTS)
      setStatus('success')
    }, 900)
  }, [scenario])

  useEffect(() => {
    load()
    return () => clearTimeout(timer.current)
  }, [load])

  return { status, rows, metrics: METRICS, retry: load }
}

export default useDisbursements
