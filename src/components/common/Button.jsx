import { memo } from 'react'
import Icon from './Icon'

/*
  Button matching the Figma "Buttons/Button" component (size sm, 36px tall).
  variant: "primary"  -> brand fill (#7F56D9)
           "secondary"-> white w/ skeuomorphic border+shadow
*/
const VARIANTS = {
  primary:
    'bg-brand-600 text-white shadow-skeu hover:bg-[#7248cf] active:bg-[#6a41c6]',
  secondary:
    'bg-white text-ink-soft border border-line-strong shadow-skeu hover:bg-[#fafafa]',
}

function ButtonBase({
  children,
  variant = 'secondary',
  iconLeft,
  iconRight,
  className = '',
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`inline-flex h-9 items-center justify-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/60 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {iconLeft && (
        <Icon
          name={iconLeft}
          className={`h-5 w-5 ${variant === 'primary' ? 'text-white/70' : 'text-[#a3a3a3]'}`}
        />
      )}
      {children && <span className="px-0.5">{children}</span>}
      {iconRight && (
        <Icon
          name={iconRight}
          className={`h-5 w-5 ${variant === 'primary' ? 'text-white/70' : 'text-[#a3a3a3]'}`}
        />
      )}
    </button>
  )
}

export const Button = memo(ButtonBase)
export default Button
