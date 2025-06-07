import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'
import { config } from 'dotenv'

config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Startup legal documents to embed
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

4. TECHNICAL AND ORGANIZATIONAL MEASURES
Implement appropriate security measures:
- Encryption of personal data
- Pseudonymization where possible
- Regular security assessments
- Staff training on data protection
- Access controls and authentication
- Incident response procedures

5. DATA PROTECTION IMPACT ASSESSMENTS (DPIA)
Required when processing is likely to result in high risk:
- Large-scale processing of special categories of data
- Systematic monitoring of public areas
- Automated decision-making with legal effects

6. DATA BREACH NOTIFICATION
- Notify supervisory authority within 72 hours
- Notify data subjects if breach poses high risk
- Maintain records of all data breaches

7. INTERNATIONAL DATA TRANSFERS
When transferring data outside the EU:
- Use adequacy decisions
- Implement appropriate safeguards (Standard Contractual Clauses)
- Binding Corporate Rules for multinational companies

8. VENDOR MANAGEMENT
Data Processing Agreements (DPAs) required with all processors:
- Define purpose and duration of processing
- Specify categories of data and data subjects
- Outline processor obligations
- Include sub-processor provisions

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

TRUST SERVICES CRITERIA (TSC):

1. SECURITY (REQUIRED)
Access Controls:
- Multi-factor authentication for all users
- Role-based access control (RBAC)
- Regular access reviews and deprovisioning
- Privileged access management

Network Security:
- Firewalls and intrusion detection systems
- Network segmentation
- VPN access for remote connections
- Regular vulnerability assessments

Data Security:
- Encryption in transit and at rest
- Data classification and handling procedures
- Secure data disposal processes
- Database security controls

2. AVAILABILITY (OPTIONAL)
System Monitoring:
- 24/7 monitoring of critical systems
- Performance monitoring and alerting
- Capacity planning and scaling
- Incident response procedures

Disaster Recovery:
- Business continuity planning
- Data backup and recovery procedures
- Recovery time objectives (RTO)
- Recovery point objectives (RPO)

3. PROCESSING INTEGRITY (OPTIONAL)
Data Processing:
- Input validation and error handling
- Automated processing controls
- Data transformation accuracy
- Processing completeness checks

4. CONFIDENTIALITY (OPTIONAL)
Data Protection:
- Non-disclosure agreements
- Data access restrictions
- Information classification
- Confidential data handling procedures

5. PRIVACY (OPTIONAL)
Privacy Controls:
- Privacy notice and consent management
- Data collection and use limitations
- Data retention and disposal
- Individual privacy rights

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

KEY POLICIES REQUIRED:
1. Information Security Policy
2. Access Control Policy
3. Change Management Policy
4. Incident Response Policy
5. Risk Management Policy
6. Vendor Management Policy
7. Data Classification Policy
8. Business Continuity Policy

COMMON STARTUP CHALLENGES:
- Limited resources for implementation
- Lack of dedicated security personnel
- Complex vendor ecosystems
- Rapid business changes
- Cost of security tooling

RECOMMENDED TOOLS:
- Identity Management: Okta, Auth0
- Monitoring: Datadog, New Relic
- Vulnerability Management: Qualys, Rapid7
- Log Management: Splunk, ELK Stack
- Documentation: Confluence, Notion

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

TERM SHEET COMPONENTS:

1. ECONOMIC TERMS
Valuation:
- Pre-money valuation
- Post-money valuation
- Price per share
- Total investment amount

Liquidation Preference:
- Non-participating preferred (most common)
- Participating preferred
- Multiple liquidation preferences
- Cap on participation

Dividend Rights:
- Cumulative vs. non-cumulative
- Dividend rate (typically 8%)
- When dividends are paid

2. CONTROL TERMS
Board Composition:
- Number of board seats
- Investor representation
- Founder representation
- Independent directors

Protective Provisions:
- Veto rights on major decisions
- Budget approval requirements
- Hiring/firing of key executives
- Changes to stock option plan

Voting Agreement:
- Drag-along rights
- Tag-along rights
- Board voting requirements

3. INVESTOR PROTECTION
Anti-Dilution Protection:
- Weighted average (broad-based preferred)
- Weighted average (narrow-based)
- Full ratchet (rare)

Information Rights:
- Monthly financial statements
- Annual budgets and operating plans
- Inspection rights
- Board meeting attendance

Registration Rights:
- Demand registration rights
- Tag-along registration rights
- S-3 registration rights
- Expenses and cutback provisions

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

4. RIGHT OF FIRST REFUSAL AGREEMENT
Transfer restrictions:
- ROFR on transfers
- Co-sale rights
- Permitted transfers

5. AMENDED CHARTER DOCUMENTS
Certificate of Incorporation amendments:
- New preferred stock terms
- Board size and composition
- Special stockholder voting requirements

CLOSING DELIVERABLES:

Company Deliverables:
- Board resolutions authorizing transaction
- Stockholder consents (if required)
- Officers' certificates
- Legal opinions
- Updated cap table
- Articles of incorporation amendments

Investor Deliverables:
- Investment funds
- Investor representations
- Accredited investor certificates

POST-CLOSING OBLIGATIONS:

Ongoing Reporting:
- Monthly financial statements
- Quarterly board packages
- Annual budget approval
- Major contract notifications

Compliance Requirements:
- Securities law compliance
- Board meeting governance
- Stockholder approval processes
- Information rights fulfillment

COMMON NEGOTIATION POINTS:

1. VALUATION AND ECONOMICS
- Pre-money valuation
- Liquidation preferences
- Anti-dilution protection
- Option pool sizing

2. BOARD CONTROL
- Board composition
- Protective provisions scope
- Voting thresholds

3. INVESTOR PROTECTIONS
- Information rights scope
- Registration rights timing
- Transfer restrictions

LEGAL COSTS:
- Company legal fees: $75K-$150K
- Investor legal fees: $25K-$75K
- Total transaction costs: $100K-$225K

TIMELINE:
- Term sheet negotiation: 2-4 weeks
- Legal documentation: 4-8 weeks
- Due diligence: 2-6 weeks
- Closing: 1-2 weeks
- Total process: 2-4 months

RED FLAGS TO AVOID:
- Participating preferred with high multiples
- Full ratchet anti-dilution
- Excessive protective provisions
- Unreasonable information rights
- Unfavorable board composition`
  }
]

async function ingestDocuments() {
  console.log('🚀 Starting legal document ingestion...')
  
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

  // Process documents and create embeddings
  console.log('🔤 Creating embeddings...')
  const embeddings = []
  
  for (const doc of startupLegalDocs) {
    console.log(`   Processing ${doc.filename}...`)
    
    // Split document into chunks (800 characters each)
    const chunks = doc.content.match(/.{1,800}/g) || [doc.content]
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      
      try {
        // Create embedding using OpenAI
        const embeddingResponse = await openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: chunk,
        })
        
        const embedding = embeddingResponse.data[0].embedding
        
        embeddings.push({
          text: chunk.trim(),
          source: doc.filename,
          chunkIndex: i,
          vector: embedding
        })
        
        console.log(`   ✅ Embedded chunk ${i + 1}/${chunks.length} from ${doc.filename}`)
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (error) {
        console.error(`   ❌ Error embedding chunk ${i + 1} from ${doc.filename}:`, error.message)
      }
    }
  }

  // Save embeddings to JSON file
  const embeddingsPath = path.join(legalDataDir, 'embeddings.json')
  fs.writeFileSync(embeddingsPath, JSON.stringify(embeddings, null, 2))
  
  console.log(`✅ Successfully created ${embeddings.length} embeddings`)
  console.log(`📁 Embeddings saved to: ${embeddingsPath}`)
  console.log('🎉 Ingestion complete!')
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  ingestDocuments().catch(console.error)
}

export default ingestDocuments 