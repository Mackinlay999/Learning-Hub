import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa'
import '../style/ChatBot.css'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you?', sender: 'bot' },
  ])
  const [input, setInput] = useState('')

  useEffect(() => {
    if (isOpen) {
      setMessages([{ text: 'Hello! How can I assist you?', sender: 'bot' }])
    }
  }, [isOpen])

  const handleSend = () => {
    if (input.trim() === '') return

    setMessages([...messages, { text: input, sender: 'user' }])

    setTimeout(() => {
      setMessages([
        ...messages,
        { text: input, sender: 'user' },
        {
          text: "Thank you for your query! We'll get back to you.",
          sender: 'bot',
        },
      ])
    }, 1000)

    setInput('')
  }

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <motion.div
          className="chatbot-icon"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
        >
          <FaRobot />
        </motion.div>
      ) : (
        <motion.div
          className="chatbot-box"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="chatbot-header">
            <span>Chat Assistant</span>
            <FaTimes className="chat-close-btn" onClick={() => setIsOpen(false)} />
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`chatbot-message ${msg.sender}`}
                initial={{ opacity: 0, x: msg.sender === 'user' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <FaPaperPlane className="chatbot-send-btn" onClick={handleSend} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ChatBot
