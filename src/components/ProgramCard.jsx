import React from 'react'
import { Card } from 'react-bootstrap'
import { motion } from 'framer-motion'
function ProgramCard({ title, duration, mode }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="text-center p-3">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {duration} • {mode}
          </Card.Text>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default ProgramCard