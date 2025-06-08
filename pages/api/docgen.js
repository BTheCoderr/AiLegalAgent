import { getMetricsLogger } from '../../lib/metrics.js';

// Document Generation API with Jurisdiction Support
// All documents must be approved before completion

const SUPPORTED_JURISDICTIONS = {
  'massachusetts': 'Massachusetts',
  'rhode_island': 'Rhode Island', 
  'connecticut': 'Connecticut',
  'delaware': 'Delaware',
  'california': 'California',
  'new_york': 'New York',
  'texas': 'Texas',
  'federal': 'Federal'
};

const DOCUMENT_TYPES = {
  'articles_of_incorporation': {
    name: 'Articles of Incorporation',
    description: 'Corporate formation documents',
    estimatedTime: '2-3 business days',
    basePrice: 1500
  },
  'bylaws': {
    name: 'Corporate Bylaws',
    description: 'Internal governance documents',
    estimatedTime: '1-2 business days',
    basePrice: 1200
  },
  'employment_agreement': {
    name: 'Employment Agreement',
    description: 'Standard employment contracts',
    estimatedTime: '1 business day',
    basePrice: 800
  },
  'nda': {
    name: 'Non-Disclosure Agreement',
    description: 'Confidentiality agreements',
    estimatedTime: '1 business day',
    basePrice: 500
  },
  'privacy_policy': {
    name: 'Privacy Policy',
    description: 'GDPR/CCPA compliant privacy policies',
    estimatedTime: '2-3 business days',
    basePrice: 1000
  },
  'terms_of_service': {
    name: 'Terms of Service',
    description: 'User agreement terms',
    estimatedTime: '2-3 business days',
    basePrice: 900
  },
  'investment_agreement': {
    name: 'Investment Agreement',
    description: 'Fundraising and investment documents',
    estimatedTime: '3-5 business days',
    basePrice: 2500
  },
  'ip_assignment': {
    name: 'IP Assignment Agreement',
    description: 'Intellectual property transfer documents',
    estimatedTime: '1-2 business days',
    basePrice: 750
  }
};

// Mock document generation function
function generateDocument(docType, jurisdiction, parameters) {
  const docTemplate = DOCUMENT_TYPES[docType];
  if (!docTemplate) {
    throw new Error(`Unsupported document type: ${docType}`);
  }

  const jurisdictionName = SUPPORTED_JURISDICTIONS[jurisdiction];
  if (!jurisdictionName) {
    throw new Error(`Unsupported jurisdiction: ${jurisdiction}`);
  }

  // In a real implementation, this would call a document generation service
  // For now, we'll return a mock document structure
  return {
    id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: docType,
    typeName: docTemplate.name,
    jurisdiction: jurisdiction,
    jurisdictionName: jurisdictionName,
    status: 'pending_review', // All documents start as pending review
    createdAt: new Date().toISOString(),
    estimatedCompletion: getEstimatedCompletion(docTemplate.estimatedTime),
    price: calculatePrice(docTemplate.basePrice, jurisdiction, parameters),
    parameters: parameters,
    content: generateMockContent(docType, jurisdiction, parameters),
    reviewRequired: true,
    approvalStatus: 'pending'
  };
}

function getEstimatedCompletion(estimatedTime) {
  const now = new Date();
  const businessDays = parseInt(estimatedTime.split('-')[0]);
  
  // Add business days (assuming 5-day work week)
  let completionDate = new Date(now);
  let daysAdded = 0;
  
  while (daysAdded < businessDays) {
    completionDate.setDate(completionDate.getDate() + 1);
    
    // Skip weekends
    if (completionDate.getDay() !== 0 && completionDate.getDay() !== 6) {
      daysAdded++;
    }
  }
  
  return completionDate.toISOString();
}

function calculatePrice(basePrice, jurisdiction, parameters) {
  let price = basePrice;
  
  // Jurisdiction-based pricing adjustments (prioritizing your local markets)
  const jurisdictionMultipliers = {
    'massachusetts': 1.0,      // Your primary market
    'rhode_island': 1.0,       // Your primary market  
    'connecticut': 1.05,       // Your primary market
    'delaware': 1.1,
    'california': 1.2,
    'new_york': 1.15,
    'texas': 0.95,
    'federal': 1.3
  };
  
  price *= jurisdictionMultipliers[jurisdiction] || 1.0;
  
  // Complexity adjustments based on parameters
  if (parameters.complexity === 'complex') {
    price *= 1.5;
  } else if (parameters.complexity === 'simple') {
    price *= 0.8;
  }
  
  if (parameters.urgent === true) {
    price *= 1.25;
  }
  
  return Math.round(price);
}

function generateMockContent(docType, jurisdiction, parameters) {
  const companyName = parameters.companyName || 'Example Corp';
  const jurisdictionName = SUPPORTED_JURISDICTIONS[jurisdiction];
  
  // Generate sample content based on document type
  const contentTemplates = {
    'articles_of_incorporation': `
ARTICLES OF INCORPORATION
${companyName}

State of ${jurisdictionName}

ARTICLE I - NAME
The name of the corporation is ${companyName}.

ARTICLE II - PURPOSES
The purpose of the Corporation is to engage in any lawful activity for which corporations may be organized under the General Corporation Law of ${jurisdictionName}.

ARTICLE III - STOCK
The total number of shares of stock that the Corporation shall have authority to issue is 10,000,000 shares...

[This is a mock document. In production, this would be a complete legal document.]
    `,
    'nda': `
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of [DATE] by and between ${companyName}, a ${jurisdictionName} corporation ("Company"), and [RECIPIENT NAME] ("Recipient").

1. CONFIDENTIAL INFORMATION
For purposes of this Agreement, "Confidential Information" means any and all information disclosed by Company to Recipient...

[This is a mock document. In production, this would be a complete legal document.]
    `,
    'privacy_policy': `
PRIVACY POLICY
${companyName}

Effective Date: [DATE]
Last Updated: [DATE]

This Privacy Policy describes how ${companyName} ("we," "us," or "our") collects, uses, and shares information about you when you use our services.

1. INFORMATION WE COLLECT
We collect information you provide directly to us, such as when you create an account...

[This document is GDPR and CCPA compliant for ${jurisdictionName} jurisdiction.]

[This is a mock document. In production, this would be a complete legal document.]
    `
  };
  
  return contentTemplates[docType] || `Mock ${docType} document content for ${companyName} in ${jurisdictionName} jurisdiction.`;
}

export default async function handler(req, res) {
  const startTime = Date.now();
  const metricsLogger = getMetricsLogger();
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { docType, jurisdiction, parameters = {} } = req.body;

    // Validate required fields
    if (!docType) {
      return res.status(400).json({ error: 'Document type is required' });
    }

    if (!jurisdiction) {
      return res.status(400).json({ error: 'Jurisdiction is required' });
    }

    // Validate document type
    if (!DOCUMENT_TYPES[docType]) {
      return res.status(400).json({ 
        error: 'Invalid document type',
        supportedTypes: Object.keys(DOCUMENT_TYPES)
      });
    }

    // Validate jurisdiction
    if (!SUPPORTED_JURISDICTIONS[jurisdiction]) {
      return res.status(400).json({ 
        error: 'Invalid jurisdiction',
        supportedJurisdictions: Object.keys(SUPPORTED_JURISDICTIONS)
      });
    }

    // Generate the document
    const document = generateDocument(docType, jurisdiction, parameters);
    
    // Log metrics
    const latency = Date.now() - startTime;
    await metricsLogger.logDocumentGenerated(docType, jurisdiction, 'pending_review');

    // In a real implementation, you would:
    // 1. Store the document in your database
    // 2. Queue it for attorney review
    // 3. Send notifications to relevant parties
    
    res.status(200).json({
      success: true,
      document: document,
      message: 'Document generated successfully and queued for review',
      notice: 'This document requires attorney approval before completion',
      supportedTypes: Object.keys(DOCUMENT_TYPES),
      supportedJurisdictions: Object.keys(SUPPORTED_JURISDICTIONS)
    });

  } catch (error) {
    console.error('Document generation error:', error);
    
    const latency = Date.now() - startTime;
    await metricsLogger.logEvent('docgen_error', {
      error: error.message,
      latency_ms: latency
    });

    res.status(500).json({ 
      error: 'Failed to generate document',
      details: error.message
    });
  }
} 