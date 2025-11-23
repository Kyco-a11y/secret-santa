import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 7,
      opacity: Math.random() * 0.6 + 0.4,
      fontSize: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-white"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.fontSize}px`,
            opacity: flake.opacity,
          }}
          initial={{ y: -20 }}
          animate={{
            y: '100vh',
            x: [0, 50, -50, 0],
          }}
          transition={{
            duration: flake.animationDuration,
            repeat: Infinity,
            delay: flake.delay,
            ease: 'linear',
          }}
        >
          ❄
        </motion.div>
      ))}
    </div>
  )
}

export default Snowfall

