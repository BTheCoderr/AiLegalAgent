// Basic analytics logging endpoint for tracking query usage and feedback
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { 
      query, 
      response, 
      confidence, 
      sources, 
      feedback, 
      processingMode,
      userId = 'anonymous',
      sessionId = null
    } = req.body

    // Create analytics record
    const analyticsRecord = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      userId,
      sessionId,
      query: {
        text: query,
        length: query?.length || 0,
        wordCount: query?.split(/\s+/).length || 0
      },
      response: {
        confidence,
        sourceCount: sources?.length || 0,
        processingMode,
        responseLength: response?.length || 0
      },
      feedback: {
        helpful: feedback?.helpful || null,
        submittedAt: feedback?.helpful !== null ? new Date().toISOString() : null
      },
      metadata: {
        userAgent: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        referer: req.headers.referer
      }
    }

    // In a real app, this would save to Supabase or other database
    // For now, we'll log to console and simulate storage
    console.log('📊 Analytics Record:', JSON.stringify(analyticsRecord, null, 2))

    // Simulate database save with success/failure
    const success = Math.random() > 0.1 // 90% success rate

    if (success) {
      res.status(200).json({ 
        success: true, 
        recordId: analyticsRecord.id,
        message: 'Query logged successfully'
      })
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to log query'
      })
    }

  } catch (error) {
    console.error('Analytics logging error:', error)
    res.status(500).json({ 
      error: 'Failed to log analytics',
      message: 'Internal server error'
    })
  }
}

function generateId() {
  return 'analytics_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
} 