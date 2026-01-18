// Avatar generation utilities

export type AvatarType = 'initials' | 'emoji' | 'pattern' | 'gradient'

// Color palettes for avatars
const COLORS = [
  'from-blue-500 to-purple-500',
  'from-green-500 to-teal-500',
  'from-orange-500 to-red-500',
  'from-pink-500 to-rose-500',
  'from-cyan-500 to-blue-500',
  'from-yellow-500 to-orange-500',
  'from-indigo-500 to-purple-500',
  'from-emerald-500 to-green-500',
]

const EMOJIS = ['🐍', '⚡', '💙', '☕', '🔵', '🦀', '⚙️', '⚛️', '🚀', '💻', '🔥', '⭐', '🎯', '🎨', '🎮', '🏆']

// Get initials from name
export function getInitials(name: string): string {
  if (!name) return '??'
  
  const parts = name.trim().split(' ')
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Get consistent color based on string (name or email)
export function getColorFromString(str: string): string {
  if (!str) return COLORS[0]
  
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return COLORS[Math.abs(hash) % COLORS.length]
}

// Get consistent emoji based on string
export function getEmojiFromString(str: string): string {
  if (!str) return EMOJIS[0]
  
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return EMOJIS[Math.abs(hash) % EMOJIS.length]
}

// Generate avatar data based on user info
export function generateAvatar(
  name: string | null,
  email: string,
  type: AvatarType = 'initials'
): {
  type: AvatarType
  value: string
  display: string
} {
  const displayName = name || email.split('@')[0]
  
  switch (type) {
    case 'emoji':
      return {
        type: 'emoji',
        value: getEmojiFromString(email),
        display: getEmojiFromString(email),
      }
    
    case 'pattern':
      // For pattern, we use a geometric pattern based on initials
      return {
        type: 'pattern',
        value: getInitials(displayName),
        display: getInitials(displayName),
      }
    
    case 'gradient':
      return {
        type: 'gradient',
        value: getColorFromString(email),
        display: getInitials(displayName),
      }
    
    case 'initials':
    default:
      return {
        type: 'initials',
        value: getColorFromString(email),
        display: getInitials(displayName),
      }
  }
}

// Get avatar component props
export function getAvatarProps(
  name: string | null,
  email: string,
  avatarType: AvatarType = 'initials',
  avatarValue?: string | null
) {
  const avatar = generateAvatar(name, email, avatarType)
  
  // If custom value is provided, use it
  if (avatarValue) {
    avatar.value = avatarValue
  }
  
  return avatar
}

// Avatar style classes
export function getAvatarClasses(type: AvatarType, value: string): string {
  const baseClasses = 'w-full h-full flex items-center justify-center font-bold'
  
  switch (type) {
    case 'emoji':
      return `${baseClasses} text-4xl`
    
    case 'gradient':
      return `${baseClasses} bg-gradient-to-br ${value} text-white text-lg`
    
    case 'pattern':
      return `${baseClasses} bg-gradient-to-br ${getColorFromString(value)} text-white text-lg`
    
    case 'initials':
    default:
      return `${baseClasses} bg-gradient-to-br ${value} text-white text-lg`
  }
}
