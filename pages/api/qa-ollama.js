import fs from 'fs'
import path from 'path'
import { getMetricsLogger } from '../../lib/metrics.js'

// Load enhanced embeddings data
let embeddingsData = null
try {
  const embeddingsPath = path.join(process.cwd(), 'legal-data', 'embeddings.json')
  if (fs.existsSync(embeddingsPath)) {
    embeddingsData = JSON.parse(fs.readFileSync(embeddingsPath, 'utf8'))
    console.log(`Loaded ${embeddingsData.length} enhanced legal document embeddings`)
  }
} catch (error) {
  console.error('Error loading embeddings:', error)
}

// Enhanced cosine similarity calculation
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

// Enhanced keyword-based search for legal queries
function enhancedKeywordSearch(query, topK = 3) {
  if (!embeddingsData) return []
  
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2)
  
  // Enhanced legal concept mapping
  const legalConceptMap = {
    // Corporate formation
    'delaware': ['delaware', 'corporation', 'formation', 'incorporation', 'c-corp'],
    'corporation': ['delaware', 'c-corp', 'incorporation', 'formation', 'bylaws'],
    'formation': ['incorporation', 'delaware', 'c-corp', 'certificate', 'entity'],
    'incorporation': ['delaware', 'formation', 'corporation', 'bylaws', 'certificate'],
    'llc': ['limited', 'liability', 'company', 'formation', 'operating'],
    
    // Employment law
    'employment': ['employee', 'contractor', 'equity', 'vesting', 'stock'],
    'employee': ['employment', 'equity', 'stock', 'option', 'compensation'],
    'equity': ['stock', 'option', 'vesting', 'employee', 'compensation'],
    'vesting': ['equity', 'stock', 'employee', 'option', 'schedule'],
    'stock': ['equity', 'option', 'employee', 'vesting', 'plan'],
    
    // IP protection
    'intellectual': ['property', 'patent', 'trademark', 'copyright', 'ip'],
    'property': ['intellectual', 'ip', 'patent', 'trademark', 'copyright'],
    'patent': ['intellectual', 'property', 'invention', 'uspto', 'application'],
    'trademark': ['intellectual', 'property', 'brand', 'uspto', 'registration'],
    'copyright': ['intellectual', 'property', 'work', 'protection', 'dmca'],
    
    // Privacy and data
    'privacy': ['gdpr', 'data', 'protection', 'ccpa', 'policy'],
    'gdpr': ['privacy', 'data', 'protection', 'european', 'regulation'],
    'data': ['privacy', 'protection', 'gdpr', 'ccpa', 'breach'],
    'protection': ['privacy', 'data', 'gdpr', 'security', 'compliance'],
    'ccpa': ['privacy', 'data', 'california', 'consumer', 'protection'],
    
    // Securities and fundraising  
    'securities': ['fundraising', 'investment', 'series', 'compliance', 'sec'],
    'fundraising': ['securities', 'investment', 'series', 'investor', 'round'],
    'series': ['fundraising', 'securities', 'investment', 'round', 'preferred'],
    'investment': ['fundraising', 'securities', 'series', 'investor', 'capital'],
    'investor': ['investment', 'fundraising', 'securities', 'accredited', 'agreement'],
    
    // Contracts
    'contract': ['agreement', 'commercial', 'saas', 'terms', 'service'],
    'agreement': ['contract', 'commercial', 'terms', 'service', 'license'],
    'saas': ['contract', 'agreement', 'software', 'service', 'subscription'],
    'terms': ['contract', 'agreement', 'service', 'conditions', 'usage'],
    'nda': ['confidentiality', 'agreement', 'non-disclosure', 'proprietary', 'information'],
    
    // Tax and compliance
    'tax': ['planning', 'structure', 'entity', 'compliance', 'deduction'],
    'compliance': ['regulatory', 'soc', 'gdpr', 'framework', 'audit'],
    'regulatory': ['compliance', 'framework', 'fintech', 'healthcare', 'sec'],
    'audit': ['compliance', 'financial', 'review', 'examination', 'soc'],
    
    // International
    'international': ['expansion', 'global', 'foreign', 'overseas', 'cross-border'],
    'expansion': ['international', 'global', 'foreign', 'market', 'subsidiary']
  }
  
  // Score each chunk based on keyword relevance
  const scoredChunks = embeddingsData.map(chunk => {
    let score = 0
    const chunkText = chunk.text.toLowerCase()
    
    // Direct keyword matches (highest weight)
    queryWords.forEach(word => {
      const directMatches = (chunkText.match(new RegExp(`\\b${word}\\b`, 'g')) || []).length
      score += directMatches * 5
      
      // Concept expansion matches (medium weight)
      if (legalConceptMap[word]) {
        legalConceptMap[word].forEach(concept => {
          const conceptMatches = (chunkText.match(new RegExp(`\\b${concept}\\b`, 'g')) || []).length
          score += conceptMatches * 2
        })
      }
    })
    
    // Boost score based on document type relevance
    if (chunk.metadata) {
      const docType = chunk.metadata.documentType || ''
      const legalArea = chunk.metadata.legalArea || []
      
      // Document type boosting
      if (queryLower.includes('formation') && docType.includes('Corporate')) score += 10
      if (queryLower.includes('employment') && docType.includes('Employment')) score += 10
      if (queryLower.includes('privacy') && docType.includes('Privacy')) score += 10
      if (queryLower.includes('securities') && docType.includes('Securities')) score += 10
      if (queryLower.includes('contract') && docType.includes('Contracts')) score += 10
      if (queryLower.includes('tax') && docType.includes('Tax')) score += 10
      if (queryLower.includes('intellectual') && docType.includes('Intellectual')) score += 10
      if (queryLower.includes('international') && docType.includes('International')) score += 10
      if (queryLower.includes('regulatory') && docType.includes('Regulatory')) score += 10
    }
    
    return {
      ...chunk,
      similarity: Math.min(score / 20, 1) // Normalize to 0-1 range
    }
  })
  
  return scoredChunks
    .filter(chunk => chunk.similarity > 0.1)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
}

// Enhanced retrieval with source metadata
function enhancedRetrieval(query, topK = 3) {
  if (!embeddingsData) {
    return {
      chunks: [],
      sources: [],
      confidence: 0
    }
  }

  // Use enhanced keyword search
  const relevantChunks = enhancedKeywordSearch(query, topK)
  
  // Extract unique sources with metadata
  const sources = []
  const seenSources = new Set()
  
  relevantChunks.forEach(chunk => {
    if (!seenSources.has(chunk.source)) {
      seenSources.add(chunk.source)
      sources.push({
        filename: chunk.source,
        documentType: chunk.metadata?.documentType || 'Legal Document',
        legalArea: chunk.metadata?.legalArea || ['General'],
        complexity: chunk.metadata?.complexity || 'Medium',
        relevanceScore: chunk.similarity
      })
    }
  })

  // Calculate overall confidence based on top similarities
  const confidence = relevantChunks.length > 0 
    ? relevantChunks.reduce((sum, chunk) => sum + chunk.similarity, 0) / relevantChunks.length
    : 0

  return {
    chunks: relevantChunks,
    sources: sources.slice(0, 3), // Top 3 sources
    confidence: Math.round(confidence * 100)
  }
}

// Call Ollama API for response generation
async function callOllama(prompt) {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.1:8b',
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.3,
          num_predict: 600,
          top_p: 0.9
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`)
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error('Ollama API Error:', error)
    throw new Error('Failed to generate response with local AI')
  }
}

// Generate enhanced responses using Ollama
async function generateOllamaResponse(query, retrievalResult) {
  const { chunks, sources, confidence } = retrievalResult
  
  if (chunks.length === 0) {
    const fallbackPrompt = `You are an expert legal assistant specializing in startup law. A user asked: "${query}"

Since I don't have specific information about this topic in my knowledge base, provide general guidance about startup legal matters. Be helpful but recommend consulting with qualified attorneys for specific advice.

Focus on:
- General startup legal principles
- Common considerations for this type of question
- When to seek professional legal help
- Practical next steps

Keep your response professional, practical, and under 400 words.`

    try {
      const response = await callOllama(fallbackPrompt)
      return {
        answer: response + `\n\n⚠️ **Legal Disclaimer**: This information is for educational purposes only and does not constitute legal advice. Consult qualified attorneys for specific legal matters affecting your startup.`,
        sources: [],
        confidence: 0
      }
    } catch (error) {
      return {
        answer: `I'm currently experiencing technical difficulties with the AI system. However, I can provide general guidance that for questions about "${query}", I recommend:

1. Consulting with a qualified startup attorney
2. Reviewing relevant legal documentation
3. Checking with legal aid organizations if cost is a concern
4. Researching state-specific requirements for your jurisdiction

For immediate help, try rephrasing your question or contact our expert network.

⚠️ **Legal Disclaimer**: This information is for educational purposes only and does not constitute legal advice.`,
        sources: [],
        confidence: 0
      }
    }
  }

  // Combine relevant chunks into context
  const context = chunks.slice(0, 3).map(chunk => chunk.text).join('\n\n')
  
  const prompt = `You are an expert legal assistant specializing in startup law. Answer the user's question based on the provided legal document context. Be specific, practical, and actionable.

User Question: ${query}

Legal Document Context:
${context}

Instructions:
- Focus on startup-specific guidance
- Provide step-by-step recommendations when appropriate
- Mention specific legal requirements and compliance obligations
- Suggest professional consultation for complex matters
- Be concise but comprehensive (under 400 words)
- Use professional legal language but keep it accessible

Answer:`

  try {
    const response = await callOllama(prompt)
    
    // Add metadata about sources
    const topArea = sources[0]?.legalArea?.[0] || 'Legal'
    const topDoc = sources[0]?.documentType || 'Legal Document'
    
    let enhancedAnswer = response
    
    enhancedAnswer += `\n\n**Source Analysis:**\n`
    enhancedAnswer += `- Legal Area: **${topArea}** law for startups\n`
    enhancedAnswer += `- Document Type: ${topDoc}\n`
    enhancedAnswer += `- Complexity Level: ${sources[0]?.complexity || 'Medium'}\n`
    
    if (confidence >= 70) {
      enhancedAnswer += `- High confidence response (${confidence}% match)\n`
    } else if (confidence >= 40) {
      enhancedAnswer += `- Moderate confidence response (${confidence}% match)\n`
    } else {
      enhancedAnswer += `- Lower confidence response (${confidence}% match) - consider consulting an attorney\n`
    }

    enhancedAnswer += `\n\n⚠️ **Legal Disclaimer**: This information is for educational purposes only and does not constitute legal advice. Consult qualified attorneys for specific legal matters affecting your startup.`

    return {
      answer: enhancedAnswer,
      sources,
      confidence
    }
  } catch (error) {
    console.error('Error generating Ollama response:', error)
    
    // Fallback to enhanced demo response
    const topArea = sources[0]?.legalArea?.[0] || 'Legal'
    const topDoc = sources[0]?.documentType || 'Legal Document'
    
    let answer = `Based on my analysis of startup legal documents, here's what you need to know about ${query}:\n\n`
    
    // Add context-based answer
    answer += context.substring(0, 600) + (context.length > 600 ? '...' : '')
    
    answer += `\n\n**Key Takeaways:**\n`
    answer += `- This falls under **${topArea}** law for startups\n`
    answer += `- Document type: ${topDoc}\n`
    answer += `- Complexity level: ${sources[0]?.complexity || 'Medium'}\n`
    answer += `- AI system temporarily unavailable - showing document excerpts\n`
    
    answer += `\n\n⚠️ **Legal Disclaimer**: This information is for educational purposes only and does not constitute legal advice. Consult qualified attorneys for specific legal matters affecting your startup.`

    return {
      answer,
      sources,
      confidence
    }
  }
}

export default async function handler(req, res) {
  const startTime = Date.now();
  const metricsLogger = getMetricsLogger();
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { query } = req.body

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required' })
    }

    console.log(`Processing Ollama QA query: "${query}"`)

    // Enhanced retrieval with source citations
    const retrievalResult = enhancedRetrieval(query)
    
    // Generate response using Ollama
    const finalResponse = await generateOllamaResponse(query, retrievalResult)

    // Log query for analytics
    console.log(`Ollama QA Response generated - Confidence: ${finalResponse.confidence}%, Sources: ${finalResponse.sources.length}`)

    // Log metrics
    const latency = Date.now() - startTime;
    await metricsLogger.logQARequest(query, finalResponse, latency);

    res.status(200).json({
      query,
      ...finalResponse,
      timestamp: new Date().toISOString(),
      processingMode: 'Ollama Local AI (Llama 3.1 8B)'
    })

  } catch (error) {
    console.error('Ollama QA API Error:', error)
    
    // Log error metrics
    const latency = Date.now() - startTime;
    await metricsLogger.logEvent('qa_error', {
      error: error.message,
      latency_ms: latency,
      ai_provider: 'ollama'
    });
    
    res.status(500).json({ 
      error: 'Failed to process query',
      message: 'Local AI system temporarily unavailable. Please try again.'
    })
  }
} 