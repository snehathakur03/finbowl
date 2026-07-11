import { useCallback, useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggle = useCallback(() => {
    setDrawerOpen((prev) => !prev)
  }, [])

  const close = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  return (
    <div className="flex w-full overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-72 shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={close}
          />

          {/* Drawer */}
          <div className="relative h-full w-72 bg-white shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 min-w-0 flex-col">

        {/* Top Bar */}
        <TopBar onToggleSidebar={toggle} />

        {/* IMPORTANT FIX: min-w-0 prevents overflow */}
        <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto bg-canvas">
          {children}
        </main>

      </div>
    </div>
  )
}