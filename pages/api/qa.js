import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'
import { getMetricsLogger } from '../../lib/metrics.js'

// Initialize OpenAI only if API key is available
let openai = null
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

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

// Enhanced semantic search with metadata filtering
function findRelevantChunks(queryEmbedding, topK = 5, minSimilarity = 0.3) {
  if (!embeddingsData || !queryEmbedding) return []

  const similarities = embeddingsData.map(chunk => ({
    ...chunk,
    similarity: cosineSimilarity(queryEmbedding, chunk.vector)
  }))

  return similarities
    .filter(chunk => chunk.similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
}

// Enhanced keyword-based search for demo mode
function enhancedKeywordSearch(query, topK = 3) {
  if (!embeddingsData) return []
  
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2)
  
  // Enhanced keyword mapping based on document content
  const conceptMap = {
    // Corporate formation
    'delaware': ['delaware', 'corporation', 'formation', 'incorporation'],
    'corporation': ['delaware', 'c-corp', 'incorporation', 'formation'],
    'formation': ['incorporation', 'delaware', 'c-corp', 'certificate'],
    'incorporation': ['delaware', 'formation', 'corporation', 'bylaws'],
    
    // Employment law
    'employment': ['employee', 'contractor', 'equity', 'vesting'],
    'employee': ['employment', 'equity', 'stock', 'option'],
    'equity': ['stock', 'option', 'vesting', 'employee'],
    'vesting': ['equity', 'stock', 'employee', 'option'],
    
    // IP protection
    'intellectual': ['property', 'patent', 'trademark', 'copyright'],
    'property': ['intellectual', 'ip', 'patent', 'trademark'],
    'patent': ['intellectual', 'property', 'invention', 'uspto'],
    'trademark': ['intellectual', 'property', 'brand', 'uspto'],
    
    // Privacy and data
    'privacy': ['gdpr', 'data', 'protection', 'ccpa'],
    'gdpr': ['privacy', 'data', 'protection', 'european'],
    'data': ['privacy', 'protection', 'gdpr', 'ccpa'],
    'protection': ['privacy', 'data', 'gdpr', 'security'],
    
    // Securities and fundraising  
    'securities': ['fundraising', 'investment', 'series', 'compliance'],
    'fundraising': ['securities', 'investment', 'series', 'investor'],
    'series': ['fundraising', 'securities', 'investment', 'round'],
    'investment': ['fundraising', 'securities', 'series', 'investor'],
    
    // Contracts
    'contract': ['agreement', 'commercial', 'saas', 'terms'],
    'agreement': ['contract', 'commercial', 'terms', 'service'],
    'saas': ['contract', 'agreement', 'software', 'service'],
    
    // Tax and compliance
    'tax': ['planning', 'structure', 'entity', 'compliance'],
    'compliance': ['regulatory', 'soc', 'gdpr', 'framework'],
    'regulatory': ['compliance', 'framework', 'fintech', 'healthcare'],
    
    // International
    'international': ['expansion', 'global', 'foreign', 'overseas'],
    'expansion': ['international', 'global', 'foreign', 'market']
  }
  
  // Score each chunk based on keyword relevance
  const scoredChunks = embeddingsData.map(chunk => {
    let score = 0
    const chunkText = chunk.text.toLowerCase()
    
    // Direct keyword matches (highest weight)
    queryWords.forEach(word => {
      const directMatches = (chunkText.match(new RegExp(word, 'g')) || []).length
      score += directMatches * 3
      
      // Concept expansion matches (medium weight)
      if (conceptMap[word]) {
        conceptMap[word].forEach(concept => {
          const conceptMatches = (chunkText.match(new RegExp(concept, 'g')) || []).length
          score += conceptMatches * 1.5
        })
      }
    })
    
    // Boost score based on document type relevance
    if (chunk.metadata) {
      const docType = chunk.metadata.documentType || ''
      const legalArea = chunk.metadata.legalArea || []
      
      // Document type boosting
      if (queryLower.includes('formation') && docType.includes('Corporate')) score += 5
      if (queryLower.includes('employment') && docType.includes('Employment')) score += 5
      if (queryLower.includes('privacy') && docType.includes('Privacy')) score += 5
      if (queryLower.includes('securities') && docType.includes('Securities')) score += 5
      if (queryLower.includes('contract') && docType.includes('Contracts')) score += 5
      if (queryLower.includes('tax') && docType.includes('Tax')) score += 5
      if (queryLower.includes('intellectual') && docType.includes('Intellectual')) score += 5
      if (queryLower.includes('international') && docType.includes('International')) score += 5
      if (queryLower.includes('regulatory') && docType.includes('Regulatory')) score += 5
    }
    
    return {
      ...chunk,
      similarity: Math.min(score / 10, 1) // Normalize to 0-1 range
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

  // Use enhanced keyword search for demo mode
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

// Generate enhanced responses with source citations
function generateEnhancedResponse(query, retrievalResult) {
  const { chunks, sources, confidence } = retrievalResult
  
  if (chunks.length === 0) {
    return {
      answer: `I don't have specific information about "${query}" in my current knowledge base. However, I can provide general guidance on startup legal matters. Please try rephrasing your question or ask about:

- GDPR and privacy compliance
- SOC 2 certification requirements  
- Fundraising and securities law
- Employment law and equity compensation
- Intellectual property protection
- Contract law and commercial agreements
- Tax planning and entity structures
- International expansion legal requirements
- Regulatory compliance frameworks

For specific legal advice, I recommend consulting with a qualified startup attorney.`,
      sources: [],
      confidence: 0
    }
  }

  // Combine relevant chunks into context
  const context = chunks.slice(0, 3).map(chunk => chunk.text).join('\n\n')
  
  // Generate response based on context
  const topArea = sources[0]?.legalArea?.[0] || 'Legal'
  const topDoc = sources[0]?.documentType || 'Legal Document'
  
  let answer = `Based on my analysis of startup legal documents, here's what you need to know about ${query}:\n\n`
  
  // Add context-based answer
  answer += context.substring(0, 800) + (context.length > 800 ? '...' : '')
  
  answer += `\n\n**Key Takeaways:**\n`
  answer += `- This falls under **${topArea}** law for startups\n`
  answer += `- Document type: ${topDoc}\n`
  answer += `- Complexity level: ${sources[0]?.complexity || 'Medium'}\n`
  
  if (confidence >= 70) {
    answer += `- High confidence response (${confidence}% match)\n`
  } else if (confidence >= 40) {
    answer += `- Moderate confidence response (${confidence}% match)\n`
  } else {
    answer += `- Lower confidence response (${confidence}% match) - consider consulting an attorney\n`
  }

  return {
    answer,
    sources,
    confidence
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

    console.log(`Processing QA query: "${query}"`)

    // Enhanced retrieval with source citations
    const retrievalResult = enhancedRetrieval(query)
    
    let finalResponse

    if (openai && retrievalResult.chunks.length > 0) {
      // Use OpenAI for real responses
      const context = retrievalResult.chunks.slice(0, 3).map(chunk => chunk.text).join('\n\n')
      
      const systemPrompt = `You are an expert legal assistant specializing in startup law. Answer the user's question based on the provided legal document context. Be specific, practical, and actionable.

Context from legal documents:
${context}

Guidelines:
- Focus on startup-specific guidance
- Provide step-by-step recommendations when appropriate
- Mention specific legal requirements and compliance obligations
- Suggest professional consultation for complex matters
- Be concise but comprehensive`

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        max_tokens: 600,
        temperature: 0.3
      })

      finalResponse = {
        answer: completion.choices[0].message.content,
        sources: retrievalResult.sources,
        confidence: retrievalResult.confidence
      }
    } else {
      // Demo mode enhanced response
      finalResponse = generateEnhancedResponse(query, retrievalResult)
    }

    // Add legal disclaimer
    finalResponse.answer += `\n\n⚠️ **Legal Disclaimer**: This information is for educational purposes only and does not constitute legal advice. Consult qualified attorneys for specific legal matters affecting your startup.`

    // Log query for analytics
    console.log(`QA Response generated - Confidence: ${finalResponse.confidence}%, Sources: ${finalResponse.sources.length}`)

    // Log metrics
    const latency = Date.now() - startTime;
    await metricsLogger.logQARequest(query, finalResponse, latency);

    res.status(200).json({
      query,
      ...finalResponse,
      timestamp: new Date().toISOString(),
      processingMode: openai ? 'AI-Enhanced' : 'Demo Mode'
    })

  } catch (error) {
    console.error('QA API Error:', error)
    
    // Log error metrics
    const latency = Date.now() - startTime;
    await metricsLogger.logEvent('qa_error', {
      error: error.message,
      latency_ms: latency
    });
    
    res.status(500).json({ 
      error: 'Failed to process query',
      message: 'Please try again or contact support if the issue persists.'
    })
  }
} 