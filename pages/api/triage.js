import { getMetricsLogger } from '../../lib/metrics.js';

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

    // Classify the legal query into categories
    const classification = classifyLegalQuery(query.toLowerCase())
    
    // Log metrics
    const latency = Date.now() - startTime;
    await metricsLogger.logTriageRequest(query, {
      category: classification.category,
      confidence: classification.confidence,
      urgency: classification.urgency,
      estimatedCost: classification.estimatedCost
    }, latency);

    res.status(200).json({
      query,
      classification: classification.category,
      confidence: classification.confidence,
      subcategory: classification.subcategory,
      urgency: classification.urgency,
      recommendedAction: classification.recommendedAction,
      estimatedCost: classification.estimatedCost
    })

  } catch (error) {
    console.error('Triage API Error:', error)
    
    // Log error metrics
    const latency = Date.now() - startTime;
    await metricsLogger.logEvent('triage_error', {
      error: error.message,
      latency_ms: latency
    });
    
    res.status(500).json({ 
      error: 'Failed to classify query',
      message: 'Please try again or contact support if the issue persists.'
    })
  }
}

function classifyLegalQuery(query) {
  // GDPR & Privacy Compliance
  if (query.includes('gdpr') || query.includes('privacy policy') || query.includes('data protection') || 
      query.includes('ccpa') || query.includes('personal data') || query.includes('consent')) {
    return {
      category: 'Privacy & Data Protection',
      subcategory: query.includes('gdpr') ? 'GDPR Compliance' : 
                   query.includes('ccpa') ? 'CCPA Compliance' : 'Privacy Policy',
      confidence: 0.95,
      urgency: query.includes('breach') || query.includes('violation') ? 'High' : 'Medium',
      recommendedAction: 'Schedule privacy compliance consultation',
      estimatedCost: '$2,500 - $15,000'
    }
  }

  // SOC 2 & Security Compliance
  if (query.includes('soc 2') || query.includes('soc2') || query.includes('security audit') ||
      query.includes('penetration test') || query.includes('compliance framework')) {
    return {
      category: 'Security & Compliance',
      subcategory: query.includes('soc') ? 'SOC 2 Certification' : 'Security Audit',
      confidence: 0.93,
      urgency: query.includes('audit') || query.includes('due diligence') ? 'High' : 'Medium',
      recommendedAction: 'Connect with security compliance expert',
      estimatedCost: '$50,000 - $200,000'
    }
  }

  // Fundraising & Investment
  if (query.includes('fundraising') || query.includes('series a') || query.includes('term sheet') ||
      query.includes('investor') || query.includes('valuation') || query.includes('due diligence')) {
    return {
      category: 'Fundraising & Investment',
      subcategory: query.includes('series a') ? 'Series A' :
                   query.includes('seed') ? 'Seed Round' : 'General Fundraising',
      confidence: 0.91,
      urgency: query.includes('closing') || query.includes('deadline') ? 'High' : 'Medium',
      recommendedAction: 'Schedule fundraising legal consultation',
      estimatedCost: '$75,000 - $150,000'
    }
  }

  // Employment & Equity
  if (query.includes('employee') || query.includes('equity') || query.includes('stock option') ||
      query.includes('vesting') || query.includes('employment agreement') || query.includes('contractor')) {
    return {
      category: 'Employment & Equity',
      subcategory: query.includes('equity') || query.includes('stock') ? 'Equity Plans' : 'Employment Law',
      confidence: 0.88,
      urgency: query.includes('termination') || query.includes('lawsuit') ? 'High' : 'Low',
      recommendedAction: 'Review employment documentation',
      estimatedCost: '$5,000 - $25,000'
    }
  }

  // Intellectual Property
  if (query.includes('trademark') || query.includes('patent') || query.includes('copyright') ||
      query.includes('ip') || query.includes('intellectual property') || query.includes('infringement')) {
    return {
      category: 'Intellectual Property',
      subcategory: query.includes('trademark') ? 'Trademark' :
                   query.includes('patent') ? 'Patent' : 'General IP',
      confidence: 0.86,
      urgency: query.includes('infringement') || query.includes('lawsuit') ? 'High' : 'Medium',
      recommendedAction: 'Consult with IP attorney',
      estimatedCost: '$3,000 - $50,000'
    }
  }

  // Corporate Governance
  if (query.includes('incorporation') || query.includes('bylaws') || query.includes('board') ||
      query.includes('corporate governance') || query.includes('delaware') || query.includes('c-corp')) {
    return {
      category: 'Corporate Formation & Governance',
      subcategory: query.includes('incorporation') ? 'Formation' : 'Governance',
      confidence: 0.84,
      urgency: 'Low',
      recommendedAction: 'Schedule corporate consultation',
      estimatedCost: '$2,000 - $10,000'
    }
  }

  // Contracts & Commercial
  if (query.includes('contract') || query.includes('agreement') || query.includes('terms of service') ||
      query.includes('customer agreement') || query.includes('vendor') || query.includes('commercial')) {
    return {
      category: 'Contracts & Commercial',
      subcategory: query.includes('customer') ? 'Customer Agreements' : 'General Contracts',
      confidence: 0.82,
      urgency: query.includes('dispute') || query.includes('breach') ? 'High' : 'Low',
      recommendedAction: 'Contract review and drafting',
      estimatedCost: '$1,500 - $8,000'
    }
  }

  // Regulatory & Industry-Specific
  if (query.includes('fda') || query.includes('finra') || query.includes('healthcare') ||
      query.includes('financial services') || query.includes('regulatory') || query.includes('licensing')) {
    return {
      category: 'Regulatory & Compliance',
      subcategory: 'Industry-Specific Regulation',
      confidence: 0.79,
      urgency: 'Medium',
      recommendedAction: 'Specialized regulatory consultation',
      estimatedCost: '$10,000 - $100,000'
    }
  }

  // Default classification
  return {
    category: 'General Legal',
    subcategory: 'Unclassified',
    confidence: 0.60,
    urgency: 'Medium',
    recommendedAction: 'Schedule general legal consultation to determine specific needs',
    estimatedCost: '$500 - $5,000'
  }
} 