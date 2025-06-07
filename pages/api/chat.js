import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'
import cosine from 'cosine-similarity'

// Initialize OpenAI only if API key is available
let openai = null
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

// Load embeddings data (created by the ingest script)
let embeddings = []
try {
  const embeddingsPath = path.join(process.cwd(), 'legal-data', 'embeddings.json')
  if (fs.existsSync(embeddingsPath)) {
    embeddings = JSON.parse(fs.readFileSync(embeddingsPath, 'utf8'))
  }
} catch (error) {
  console.log('No embeddings file found, using startup legal knowledge base')
}

// Startup-specific legal knowledge base
const startupLegalKnowledge = {
  gdpr: {
    title: "GDPR Compliance for Startups",
    content: `GDPR compliance for startups involves:
    1. Privacy Policy: Clear, accessible privacy policy explaining data collection
    2. Consent Management: Explicit consent for data processing 
    3. Data Protection Officer: Required if processing large amounts of personal data
    4. Right to be Forgotten: Users can request data deletion
    5. Data Breach Notification: Must notify authorities within 72 hours
    6. Privacy by Design: Build privacy into your product from the start
    7. Cookie Consent: Clear opt-in for non-essential cookies
    8. Data Processing Agreements: With all third-party processors`
  },
  soc2: {
    title: "SOC 2 Type II Certification",
    content: `SOC 2 compliance requires:
    1. Security Controls: Access controls, encryption, network security
    2. Availability Controls: System uptime, disaster recovery
    3. Processing Integrity: Accurate, complete processing
    4. Confidentiality Controls: Data classification, access restrictions
    5. Privacy Controls: Data collection, use, retention policies
    6. Risk Assessment: Regular security assessments
    7. Vendor Management: Due diligence on third parties
    8. Incident Response: Documented incident handling procedures
    9. Change Management: Controlled software/system changes
    10. Monitoring: Continuous security monitoring`
  },
  fundraising: {
    title: "Series A Legal Documents",
    content: `Key legal documents for Series A fundraising:
    1. Term Sheet: Non-binding agreement outlining deal terms
    2. Stock Purchase Agreement: Binding agreement for share purchase
    3. Investor Rights Agreement: Investor protections and rights
    4. Voting Agreement: Board composition and voting rights
    5. Right of First Refusal Agreement: Transfer restrictions
    6. Amended Articles of Incorporation: Updated company charter
    7. Board Consent Resolutions: Formal board approvals
    8. Legal Opinion: Attorney opinion on transaction legality
    9. Disclosure Schedules: Company representations and warranties
    10. Employment Agreements: Key employee retention`
  },
  privacy: {
    title: "Privacy Policy Template",
    content: `Privacy policy must include:
    1. Data Collection: What personal data you collect
    2. Purpose: Why you collect and use the data
    3. Legal Basis: GDPR lawful basis for processing
    4. Data Sharing: Who you share data with
    5. Data Retention: How long you keep data
    6. User Rights: Access, rectification, deletion rights
    7. International Transfers: Data transfers outside EU
    8. Cookies: Use of cookies and tracking technologies
    9. Contact Information: How to contact about privacy
    10. Updates: How you'll notify of policy changes`
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, history = [] } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Search for relevant knowledge
    const relevantKnowledge = findRelevantKnowledge(message.toLowerCase())

    // Create context from relevant knowledge
    let context = ''
    if (relevantKnowledge.length > 0) {
      context = relevantKnowledge.map(item => `${item.title}:\n${item.content}`).join('\n\n')
    }

    // Create system prompt for startup legal assistant
    const systemPrompt = `You are an AI Legal Compliance Assistant specializing in startup legal matters. You help venture-backed startups navigate complex legal requirements including GDPR, SOC 2, privacy policies, fundraising documents, employment law, and intellectual property.

Key guidelines:
- Focus on startup-specific legal challenges
- Provide practical, actionable guidance
- Reference relevant regulations and compliance frameworks
- Suggest next steps and professional resources when needed
- Always include a disclaimer about not providing legal advice
- Be concise but comprehensive in your responses

${context ? `Relevant knowledge base:\n${context}\n\n` : ''}

Respond as a knowledgeable legal assistant with startup expertise.`

    // Prepare conversation history
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-5).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    // Get response from OpenAI or use demo mode
    let response
    
    if (openai) {
      // Use real OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 800,
        temperature: 0.7,
      })
      response = completion.choices[0].message.content
    } else {
      // Demo mode - provide helpful startup legal responses
      response = generateDemoResponse(message, relevantKnowledge)
    }

    // Add disclaimer
    const responseWithDisclaimer = `${response}

⚠️ **Important Disclaimer**: This response is for informational purposes only and does not constitute legal advice. For specific legal matters, please consult with qualified attorneys who specialize in startup law.`

    res.status(200).json({ response: responseWithDisclaimer })

  } catch (error) {
    console.error('Chat API Error:', error)
    res.status(500).json({ 
      error: 'Failed to process request',
      message: 'Please try again or contact support if the issue persists.'
    })
  }
}

function generateDemoResponse(query, relevantKnowledge) {
  const lowerQuery = query.toLowerCase()
  
  // Demo responses based on common startup legal questions
  if (lowerQuery.includes('gdpr') || lowerQuery.includes('data protection')) {
    return `**GDPR Compliance for Startups**

To make your startup GDPR compliant, you need to focus on these key areas:

1. **Establish a Lawful Basis**: Most startups use "legitimate interests" as their lawful basis for processing personal data.

2. **Create a Privacy Policy**: Your privacy policy must include:
   - What data you collect and why
   - How long you retain data
   - User rights (access, deletion, portability)
   - Contact information for data protection inquiries

3. **Implement Data Subject Rights**: Users must be able to:
   - Access their data
   - Request deletion (right to be forgotten)
   - Export their data (portability)

4. **Security Measures**: Implement encryption, access controls, and regular security assessments.

5. **Data Breach Procedures**: You must notify authorities within 72 hours of a breach.

**Next Steps**: Conduct a data mapping exercise, update your privacy policy, and implement a consent management system.`
  }
  
  if (lowerQuery.includes('soc 2') || lowerQuery.includes('security compliance')) {
    return `**SOC 2 Type II Certification Guide**

SOC 2 certification is crucial for SaaS startups selling to enterprise customers. Here's your roadmap:

**Timeline**: 12-18 months from start to certification

**Phase 1: Gap Assessment (Months 1-2)**
- Inventory your systems and current security controls
- Identify gaps in your security framework
- Create a remediation plan

**Phase 2: Implementation (Months 3-8)**
- Deploy required security controls (MFA, access management, monitoring)
- Document all policies and procedures
- Train your team on new processes

**Phase 3: Evidence Collection (Months 9-12)**
- Collect evidence of control effectiveness
- Address any deficiencies
- Prepare for the audit

**Estimated Costs**:
- Small startup (<50 employees): $50K-$100K
- Medium startup (50-200 employees): $100K-$200K

**Key Controls**: Access management, encryption, incident response, and change management.`
  }
  
  if (lowerQuery.includes('fundraising') || lowerQuery.includes('series a') || lowerQuery.includes('term sheet')) {
    return `**Series A Fundraising Legal Documents**

For your Series A round, you'll need these key legal documents:

**Core Documents**:
1. **Term Sheet**: Non-binding outline of deal terms
2. **Stock Purchase Agreement**: Main transaction document
3. **Investor Rights Agreement**: Ongoing investor protections
4. **Voting Agreement**: Board composition and voting rights

**Key Terms to Negotiate**:
- **Valuation**: Pre-money and post-money valuation
- **Liquidation Preference**: Usually 1x non-participating preferred
- **Anti-dilution**: Weighted average broad-based preferred
- **Board Composition**: Typically 2 founders, 1-2 investors, 1 independent

**Timeline & Costs**:
- Process: 2-4 months total
- Legal fees: $75K-$150K for company side
- Due diligence: 2-6 weeks

**Red Flags to Avoid**: Participating preferred with high multiples, full ratchet anti-dilution, excessive protective provisions.`
  }
  
  if (lowerQuery.includes('privacy policy')) {
    return `**Privacy Policy for SaaS Startups**

Your privacy policy must include these essential elements:

**Required Sections**:
1. **Data Collection**: What personal data you collect (email, usage data, etc.)
2. **Purpose**: Why you collect and use the data
3. **Legal Basis**: Your GDPR lawful basis (usually legitimate interests)
4. **Data Sharing**: Who you share data with (analytics, hosting providers)
5. **Data Retention**: How long you keep different types of data
6. **User Rights**: How users can access, correct, or delete their data

**SaaS-Specific Considerations**:
- Customer data vs. end-user data
- International data transfers (if using AWS, Google Cloud)
- Cookies and tracking technologies
- Data processing agreements with customers

**Tools**: Use privacy policy generators like Termly or iubenda as a starting point, then have a lawyer review.

**Updates**: Notify users of material changes and update your "Last Modified" date.`
  }
  
  // Default response for other queries
  return `**AI Legal Compliance Assistant**

I can help you with startup legal matters including:

- **GDPR & Privacy Compliance**: Data protection, privacy policies, user rights
- **SOC 2 Certification**: Security controls, audit preparation, enterprise sales
- **Fundraising**: Series A documents, term sheets, investor negotiations
- **Corporate Formation**: Delaware C-Corp, bylaws, board resolutions
- **Employment Law**: Equity plans, employment agreements, contractor vs. employee
- **Intellectual Property**: Trademarks, patents, IP assignments

Please ask me a specific question about any of these topics, and I'll provide detailed guidance tailored to startups.

**Popular Questions**:
- "How do I make my startup GDPR compliant?"
- "What are SOC 2 Type II requirements?"
- "What legal documents do I need for Series A?"
- "How do I structure employee equity?"

*This is a demo mode. For real AI responses, add your OpenAI API key to the environment variables.*`
}

function findRelevantKnowledge(query) {
  const relevant = []
  
  // Simple keyword matching for startup legal topics
  if (query.includes('gdpr') || query.includes('privacy') || query.includes('data protection')) {
    relevant.push(startupLegalKnowledge.gdpr)
    if (query.includes('privacy policy')) {
      relevant.push(startupLegalKnowledge.privacy)
    }
  }
  
  if (query.includes('soc 2') || query.includes('soc2') || query.includes('security compliance')) {
    relevant.push(startupLegalKnowledge.soc2)
  }
  
  if (query.includes('fundraising') || query.includes('series a') || query.includes('term sheet') || query.includes('investor')) {
    relevant.push(startupLegalKnowledge.fundraising)
  }
  
  if (query.includes('privacy policy') && !relevant.some(item => item.title.includes('Privacy Policy'))) {
    relevant.push(startupLegalKnowledge.privacy)
  }
  
  return relevant
} 