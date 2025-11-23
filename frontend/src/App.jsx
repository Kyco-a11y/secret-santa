import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, UserPlus, Trash2, Send, Sparkles, AlertCircle } from 'lucide-react'
import Snowfall from './components/Snowfall'

function App() {
  const [participants, setParticipants] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const addParticipant = (e) => {
    e.preventDefault()
    
    if (!name.trim() || !email.trim()) {
      setError('Please enter both name and email')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Check for duplicate email
    if (participants.some(p => p.email === email)) {
      setError('This email is already added')
      return
    }

    setParticipants([...participants, { name, email, id: Date.now() }])
    setName('')
    setEmail('')
    setError('')
  }

  const removeParticipant = (id) => {
    setParticipants(participants.filter(p => p.id !== id))
  }

  const assignSecretSanta = async () => {
    if (participants.length < 3) {
      setError('You need at least 3 participants for Secret Santa!')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/assign-secret-santa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participants }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to assign Secret Santa')
      }

      setSuccess(true)
      setTimeout(() => {
        setParticipants([])
        setSuccess(false)
      }, 5000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      <Snowfall />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4 animate-float">🎅</div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-2">
              Secret Santa
            </h1>
            <p className="text-gray-600">Spread the holiday cheer! 🎄</p>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-xl flex items-center gap-3"
              >
                <Sparkles className="text-green-600 flex-shrink-0" size={24} />
                <div className="text-green-800">
                  <strong>Success!</strong> Secret Santa assignments have been sent to all participants! 🎉
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
                <div className="text-red-800">{error}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Participant Form */}
          <form onSubmit={addParticipant} className="mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                <UserPlus size={20} />
                Add Participant
              </motion.button>
            </div>
          </form>

          {/* Participants List */}
          {participants.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Mail size={24} />
                Participants ({participants.length})
              </h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {participants.map((participant) => (
                    <motion.div
                      key={participant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl flex items-center justify-between group hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="font-semibold text-gray-800">{participant.name}</div>
                        <div className="text-sm text-gray-600">{participant.email}</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeParticipant(participant.id)}
                        className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Assign Button */}
          {participants.length >= 3 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={assignSecretSanta}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles size={24} />
                  </motion.div>
                  Assigning Secret Santas...
                </>
              ) : (
                <>
                  <Send size={24} />
                  Assign Secret Santa & Send Emails
                </>
              )}
            </motion.button>
          )}

          {participants.length > 0 && participants.length < 3 && (
            <div className="text-center text-gray-500 text-sm">
              Add {3 - participants.length} more participant{3 - participants.length !== 1 ? 's' : ''} to get started
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default App

