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

// Get avatar component props - simplified version
export function getAvatarProps(
  nameOrEmail: string,
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md',
  customValue?: string | null
) {
  // Extract name from email if it looks like an email
  const displayName = nameOrEmail?.includes('@') 
    ? nameOrEmail.split('@')[0] 
    : nameOrEmail || 'User'
  
  const email = nameOrEmail?.includes('@') ? nameOrEmail : `${nameOrEmail}@example.com`
  
  // Use initials type by default
  const avatar = generateAvatar(displayName, email, 'initials')
  
  return {
    content: avatar.display,
    type: avatar.type,
    value: avatar.value,
    size
  }
}

// Avatar style classes - updated signature
export function getAvatarClasses(avatar: { type: AvatarType; value: string; size?: string }): string {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-2xl'
  }
  
  const size = avatar.size || 'md'
  const baseClasses = `${sizeClasses[size as keyof typeof sizeClasses]} rounded-full flex items-center justify-center font-bold`
  
  switch (avatar.type) {
    case 'emoji':
      return `${baseClasses} text-4xl bg-secondary`
    
    case 'gradient':
      return `${baseClasses} bg-gradient-to-br ${avatar.value} text-white`
    
    case 'pattern':
      return `${baseClasses} bg-gradient-to-br ${getColorFromString(avatar.value)} text-white`
    
    case 'initials':
    default:
      return `${baseClasses} bg-gradient-to-br ${avatar.value} text-white`
  }
}
