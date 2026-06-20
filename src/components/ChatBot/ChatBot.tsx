import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import type { ChatMessageType, ChatContext } from './types'
import { getReply } from './chatEngine'
import ChatMessage from './ChatMessage'

interface ChatBotProps {
  context: ChatContext
}

let msgId = 0

function timeGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

const systemGreeting: ChatMessageType = {
  id: 'sys-0',
  role: 'bot',
  text: `${timeGreeting()}! Welcome to InspectIC. I can help you explore inspection records — ask about a specific part, manufacturer, status counts, or the overall dashboard.`,
  timestamp: Date.now(),
}

export default function ChatBot({ context }: ChatBotProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageType[]>([systemGreeting])
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    const userMsg: ChatMessageType = {
      id: `msg-${++msgId}`,
      role: 'user',
      text,
      timestamp: Date.now(),
    }
    const botMsg: ChatMessageType = {
      id: `msg-${++msgId}`,
      role: 'bot',
      text: getReply(text, context),
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-red text-white shadow-[0_4px_16px_rgba(200,58,38,0.35)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: open ? 'none' : 'flex' }}
      >
        <MessageCircle size={22} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed bottom-6 right-6 z-50 flex w-[380px] flex-col rounded-[20px] bg-black/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              style={{ maxHeight: '520px' }}
            >
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-red/20">
                    <MessageCircle size={15} className="text-primary-red" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">InspectIC Assistant</p>
                    {context.selectedRecord && (
                      <p className="text-[11px] text-white/50 truncate max-w-[240px]">
                        Viewing: {context.selectedRecord.partNumber}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-white/70 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" style={{ maxHeight: '340px' }}>
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
              </div>

              <div className="border-t border-white/5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend()
                    }}
                    placeholder="Ask about this record..."
                    className="flex-1 rounded-[12px] bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/30 transition-colors focus:border-primary-red/40 focus:bg-white/[0.07]"
                  />
                  <motion.button
                    onClick={handleSend}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-primary-red text-white"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
