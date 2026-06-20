import { Bot, User } from 'lucide-react'
import type { ChatMessageType } from './types'

interface ChatMessageProps {
  message: ChatMessageType
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'bot'

  return (
    <div className={`flex gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          isBot ? 'bg-primary-red/20' : 'bg-white/10'
        }`}
      >
        {isBot ? (
          <Bot size={14} className="text-primary-red" />
        ) : (
          <User size={14} className="text-white/70" />
        )}
      </div>
      <div
        className={`max-w-[85%] rounded-[12px] px-3.5 py-2.5 text-sm leading-relaxed ${
          isBot
            ? 'bg-white/5 text-white/90 border border-white/5'
            : 'bg-primary-red/20 text-primary-red/90 border border-primary-red/10'
        }`}
      >
        {message.text.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  )
}
