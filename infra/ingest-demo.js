import fs from 'fs'
import path from 'path'

// Demo legal documents with mock embeddings for testing
const startupLegalDocs = [
  {
    filename: 'gdpr-compliance-guide.txt',
    content: `GDPR Compliance Guide for Startups

The General Data Protection Regulation (GDPR) applies to any organization processing personal data of EU residents, regardless of company location. For startups, compliance involves several key areas:

1. LAWFUL BASIS FOR PROCESSING
Startups must establish a lawful basis for processing personal data:
- Consent: Explicit, informed consent from data subjects
- Contract: Processing necessary for contract performance
- Legal obligation: Compliance with legal requirements
- Vital interests: Protection of life or health
- Public task: Performance of public interest tasks
- Legitimate interests: Legitimate business interests (most common for startups)

2. PRIVACY POLICY REQUIREMENTS
Your privacy policy must include:
- Identity and contact details of data controller
- Purposes and lawful basis for processing
- Categories of personal data collected
- Recipients or categories of recipients
- Data retention periods
- Data subject rights
- Right to lodge complaints with supervisory authorities
- Information about automated decision-making

3. DATA SUBJECT RIGHTS
Individuals have the right to:
- Access their personal data
- Rectify inaccurate data
- Erase data (right to be forgotten)
- Restrict processing
- Data portability
- Object to processing
- Not be subject to automated decision-making

Common startup compliance steps:
1. Conduct data mapping exercise
2. Update privacy policy and cookie policy
3. Implement consent management platform
4. Establish data subject request procedures
5. Create data breach response plan
6. Train staff on GDPR requirements
7. Review and update vendor agreements
8. Implement technical security measures`
  },
  {
    filename: 'soc2-certification-guide.txt',
    content: `SOC 2 Type II Certification Guide for SaaS Startups

SOC 2 (System and Organization Controls 2) is an auditing standard that evaluates the security, availability, processing integrity, confidentiality, and privacy of a service organization's systems.

IMPLEMENTATION STEPS:

Phase 1: Gap Assessment (Months 1-2)
- Inventory systems and processes
- Identify control gaps
- Create remediation plan
- Establish timeline and budget

Phase 2: Control Implementation (Months 3-8)
- Implement technical controls
- Document policies and procedures
- Train staff on new processes
- Establish monitoring procedures

Phase 3: Evidence Collection (Months 9-12)
- Collect evidence of operating effectiveness
- Document control testing
- Address any control deficiencies
- Prepare for audit

Phase 4: SOC 2 Audit (Month 12)
- Select qualified auditor
- Provide evidence to auditor
- Address audit findings
- Receive SOC 2 report

COST ESTIMATES:
- Small startup (< 50 employees): $50K-$100K
- Medium startup (50-200 employees): $100K-$200K
- Large startup (200+ employees): $200K-$500K

Timeline: 12-18 months from start to certification`
  },
  {
    filename: 'series-a-legal-documents.txt',
    content: `Series A Fundraising Legal Documents Guide

Series A financing involves multiple complex legal documents. Here's a comprehensive guide for startup founders:

KEY LEGAL DOCUMENTS:

1. STOCK PURCHASE AGREEMENT (SPA)
Primary transaction document containing:
- Purchase price and closing conditions
- Representations and warranties
- Covenants and agreements
- Indemnification provisions
- Closing conditions

2. INVESTOR RIGHTS AGREEMENT
Ongoing rights and obligations:
- Information and inspection rights
- Registration rights
- Right of first refusal on new securities
- Co-sale rights

3. VOTING AGREEMENT
Board and stockholder matters:
- Board composition and election
- Drag-along provisions
- Voting trusts (if applicable)

LEGAL COSTS:
- Company legal fees: $75K-$150K
- Investor legal fees: $25K-$75K
- Total transaction costs: $100K-$225K

TIMELINE:
- Term sheet negotiation: 2-4 weeks
- Legal documentation: 4-8 weeks
- Due diligence: 2-6 weeks
- Closing: 1-2 weeks
- Total process: 2-4 months`
  }
]

// Generate mock embeddings (random vectors for demo)
function generateMockEmbedding() {
  const embedding = []
  for (let i = 0; i < 1536; i++) { // OpenAI embedding dimension
    embedding.push(Math.random() * 2 - 1) // Random values between -1 and 1
  }
  return embedding
}

async function createDemoEmbeddings() {
  console.log('🚀 Creating demo legal document embeddings...')
  
  // Ensure legal-data directory exists
  const legalDataDir = path.join(process.cwd(), 'legal-data')
  const rawDir = path.join(legalDataDir, 'raw')
  
  if (!fs.existsSync(legalDataDir)) {
    fs.mkdirSync(legalDataDir)
  }
  if (!fs.existsSync(rawDir)) {
    fs.mkdirSync(rawDir)
  }

  // Write startup legal documents to files
  console.log('📝 Creating legal document files...')
  for (const doc of startupLegalDocs) {
    const filePath = path.join(rawDir, doc.filename)
    fs.writeFileSync(filePath, doc.content)
    console.log(`   ✅ Created ${doc.filename}`)
  }

  // Process documents and create mock embeddings
  console.log('🔤 Creating mock embeddings...')
  const embeddings = []
  
  for (const doc of startupLegalDocs) {
    console.log(`   Processing ${doc.filename}...`)
    
    // Split document into chunks (800 characters each)
    const chunks = doc.content.match(/.{1,800}/g) || [doc.content]
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      const mockEmbedding = generateMockEmbedding()
      
      embeddings.push({
        text: chunk.trim(),
        source: doc.filename,
        chunkIndex: i,
        vector: mockEmbedding
      })
      
      console.log(`   ✅ Created mock embedding for chunk ${i + 1}/${chunks.length} from ${doc.filename}`)
    }
  }

  // Save embeddings to JSON file
  const embeddingsPath = path.join(legalDataDir, 'embeddings.json')
  fs.writeFileSync(embeddingsPath, JSON.stringify(embeddings, null, 2))
  
  console.log(`✅ Successfully created ${embeddings.length} demo embeddings`)
  console.log(`📁 Embeddings saved to: ${embeddingsPath}`)
  console.log('🎉 Demo ingestion complete!')
  console.log('💡 To use real OpenAI embeddings, add OPENAI_API_KEY to .env.local and run: npm run ingest')
}

// Run the demo ingestion
createDemoEmbeddings().catch(console.error) 