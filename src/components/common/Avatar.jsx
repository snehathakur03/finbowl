import { memo, useState } from 'react'

/*
  Round avatar with a subtle ring (Figma "Avatar wrapper", 0.5px inner border).
  Falls back to coloured initials when no image / the image fails to load,
  so the table still reads correctly without the Untitled-UI PNG assets.
*/
const BG_COLORS = [
  '#EAE0FF',
  '#D1E3D9',
  '#FDE7EF',
  '#E0ECFF',
  '#FFE9D6',
  '#E7E5F6',
]
const FG_COLORS = [
  '#6941C6',
  '#15803D',
  '#BE185D',
  '#1D4ED8',
  '#C2410C',
  '#4338CA',
]

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

function colorIndex(name = '') {
  let sum = 0
  for (let i = 0; i < name.length; i += 1) sum += name.charCodeAt(i)
  return sum % BG_COLORS.length
}

/* Deterministic placeholder photo per name (initials fallback if it fails). */
export function avatarSrc(name = '') {
  let sum = 0
  for (let i = 0; i < name.length; i += 1) sum += name.charCodeAt(i)
  return `https://i.pravatar.cc/64?img=${(sum % 70) + 1}`
}

function AvatarBase({ name, src, size = 20 }) {
  const [broken, setBroken] = useState(false)
  const idx = colorIndex(name)
  const dimension = { width: size, height: size }

  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-[0.5px] ring-black/15"
      style={dimension}
    >
      {src && !broken ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center font-medium"
          style={{
            background: BG_COLORS[idx],
            color: FG_COLORS[idx],
            fontSize: Math.max(9, size * 0.42),
          }}
        >
          {initials(name)}
        </span>
      )}
    </span>
  )
}

export const Avatar = memo(AvatarBase)
export default Avatar
