import { memo } from 'react'

/*
  Pill switch (Figma "_Toggle base"): 36x20 track, 16px knob, brand-600 when on.
*/
function ToggleBase({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange?.(!checked)}
      className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${
        checked ? 'justify-end bg-brand-600' : 'justify-start bg-[#D4D4D4]'
      }`}
    >
      <span className="h-4 w-4 rounded-full bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.1)]" />
    </button>
  )
}

export const Toggle = memo(ToggleBase)
export default Toggle
