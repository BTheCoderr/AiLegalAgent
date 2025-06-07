import fs from 'fs'
import path from 'path'

// Enhanced startup legal document library (15 comprehensive documents)
const startupLegalLibrary = [
  {
    filename: 'delaware-c-corp-formation.txt',
    content: `Delaware C-Corporation Formation Guide

Delaware remains the preferred jurisdiction for startup incorporation due to its business-friendly laws and established legal precedents.

INCORPORATION PROCESS:

1. CERTIFICATE OF INCORPORATION
Required provisions:
- Corporate name (must be available)
- Purpose clause (can be broad: "any lawful business")
- Authorized shares (common and preferred)
- Registered agent in Delaware
- Incorporator information

Typical structure:
- 10,000,000 authorized common shares
- 3,000,000 authorized preferred shares
- Par value: $0.0001 per share

2. CORPORATE BYLAWS
Key provisions:
- Board composition and election procedures
- Shareholder meeting requirements
- Officer roles and responsibilities
- Amendment procedures
- Indemnification provisions

3. INITIAL BOARD RESOLUTIONS
Must address:
- Adoption of bylaws
- Appointment of officers
- Authorization of stock issuance
- Election of tax status (S-Corp vs C-Corp)
- Banking resolutions

4. STOCK PURCHASE AGREEMENTS
For founder shares:
- Vesting schedules (typically 4 years, 1-year cliff)
- Right of first refusal provisions
- Co-sale rights
- Drag-along provisions

COMPLIANCE REQUIREMENTS:
- Annual franchise tax: $175 minimum
- Registered agent: $50-200/year
- Annual report filing required
- Board meeting minutes required

LEGAL COSTS:
- DIY formation: $200-500
- Attorney formation: $1,500-5,000
- Ongoing compliance: $500-2,000/year`
  },
  {
    filename: 'employment-law-startups.txt',
    content: `Employment Law Compliance for Startups

Startups must navigate complex employment laws from day one. Key areas include classification, equity compensation, and workplace policies.

EMPLOYEE VS CONTRACTOR CLASSIFICATION:

IRS 20-Factor Test Key Elements:
- Behavioral control: How work is performed
- Financial control: How worker is paid
- Relationship type: Written contracts and benefits

Safe Harbor for Contractors:
- Separate business with multiple clients
- Marketing services to others
- Own tools and equipment
- Set own schedule and methods

EQUITY COMPENSATION:

1. STOCK OPTION PLANS
409A valuations required for:
- Option grant pricing
- Tax compliance
- Investor due diligence
Frequency: Annual or after material events

2. VESTING SCHEDULES
Standard startup vesting:
- 4-year vesting period
- 1-year cliff (25% vests after year 1)
- Monthly vesting thereafter
- Acceleration provisions for termination/acquisition

3. 83(B) ELECTIONS
Must file within 30 days of grant for:
- Restricted stock purchases
- Early exercise of options
- Tax optimization strategy

WORKPLACE POLICIES:

Required Policies:
- Anti-harassment and discrimination
- At-will employment statements
- Confidentiality and IP assignment
- Code of conduct
- Leave policies (FMLA, state-specific)

WAGE AND HOUR COMPLIANCE:
- Minimum wage requirements (federal/state)
- Overtime calculations (non-exempt employees)
- Break and meal period requirements
- Payroll tax obligations

TERMINATION PROCEDURES:
- Final pay requirements (varies by state)
- COBRA notification obligations
- Return of company property
- Non-compete enforceability (limited in many states)

MULTI-STATE CONSIDERATIONS:
Each state has unique requirements for:
- Pay frequency and final pay timing
- Break period requirements
- Leave law obligations
- Workers' compensation insurance`
  },
  {
    filename: 'intellectual-property-protection.txt',
    content: `Intellectual Property Protection for Startups

Comprehensive IP strategy is crucial for startup valuation and competitive advantage. Protection includes trademarks, patents, copyrights, and trade secrets.

TRADEMARK PROTECTION:

1. TRADEMARK SEARCH AND REGISTRATION
Search requirements:
- USPTO database (TESS)
- State trademark databases
- Common law trademark research
- Domain name availability

Registration process:
- Application filing: $350-750 per class
- Examination period: 6-12 months
- Opposition period: 30 days
- Registration certificate: 6-10 years validity

2. TRADEMARK CLASSES
Key classes for startups:
- Class 9: Software and mobile apps
- Class 35: Business services and advertising
- Class 42: Software development services
- Class 36: Financial and payment services

PATENT PROTECTION:

1. PATENTABLE SUBJECT MATTER
Eligible inventions:
- Novel technical processes
- Software with technical implementation
- Hardware devices and systems
- Business methods with technical components

2. PATENT APPLICATION PROCESS
Provisional application benefits:
- 12-month priority period
- Lower initial cost ($320-1,600)
- "Patent Pending" status
- Option to file full application later

Non-provisional application:
- Formal examination process
- 18-month publication
- 2-3 year examination period
- 20-year protection term

COPYRIGHT PROTECTION:

Automatic Protection:
- Original works of authorship
- Fixed in tangible medium
- No registration required for basic protection

Registration benefits:
- Statutory damages available
- Attorney fees recovery
- Stronger enforcement rights
- Public record of ownership

TRADE SECRET PROTECTION:

Requirements for protection:
- Information has economic value
- Not generally known or readily ascertainable
- Reasonable efforts to maintain secrecy

Protection measures:
- Non-disclosure agreements (NDAs)
- Employee confidentiality agreements
- Access controls and security measures
- Clear marking of confidential materials

IP ASSIGNMENT AGREEMENTS:

Employee agreements must include:
- Work-for-hire provisions
- Assignment of inventions
- Moral rights waivers (where applicable)
- Survivability clauses

Contractor agreements require:
- Explicit IP assignment language
- Work-for-hire designations
- Deliverable specifications
- Indemnification provisions`
  },
  {
    filename: 'privacy-data-protection-comprehensive.txt',
    content: `Comprehensive Privacy and Data Protection for Startups

Modern startups must navigate a complex web of privacy regulations across multiple jurisdictions. This guide covers GDPR, CCPA, and emerging state privacy laws.

GDPR COMPLIANCE FRAMEWORK:

1. LAWFUL BASIS DETERMINATION
Six lawful bases under Article 6:
- Consent: Explicit, informed, withdrawable
- Contract: Necessary for contract performance
- Legal obligation: Required by law
- Vital interests: Life or death situations
- Public task: Public authority functions
- Legitimate interests: Balancing test required

Most startups rely on legitimate interests for:
- Analytics and product improvement
- Marketing to existing customers
- Fraud prevention and security
- Internal administrative purposes

2. DATA PROTECTION IMPACT ASSESSMENTS (DPIA)
Required when processing:
- Large-scale systematic monitoring
- Large-scale special category data
- Public area systematic monitoring
- Automated decision-making with legal effects

DPIA components:
- Processing description and purposes
- Necessity and proportionality assessment
- Risk identification and mitigation
- Consultation requirements

3. PRIVACY BY DESIGN PRINCIPLES
Seven foundational principles:
- Proactive not reactive measures
- Privacy as the default setting
- Privacy embedded into design
- Full functionality (win-win scenarios)
- End-to-end security protection
- Visibility and transparency
- Respect for user privacy

CCPA AND STATE PRIVACY LAWS:

1. CCPA OBLIGATIONS
Consumer rights:
- Right to know about data collection
- Right to delete personal information
- Right to opt-out of sale
- Right to non-discrimination
- Right to data portability (CPRA addition)

Business obligations:
- Privacy policy disclosure requirements
- Consumer request fulfillment (45 days)
- Data minimization practices
- Third-party sharing disclosures

2. EMERGING STATE LAWS
Virginia CDPA, Colorado CPA, Connecticut CTDPA:
- Similar rights framework to CCPA
- Data processing agreements required
- Consent requirements for sensitive data
- Opt-out mechanisms for targeted advertising

INTERNATIONAL DATA TRANSFERS:

1. GDPR TRANSFER MECHANISMS
Adequacy decisions (safe countries):
- European Economic Area
- Switzerland, United Kingdom
- Japan, Canada (commercial organizations)

Transfer tools for other countries:
- Standard Contractual Clauses (SCCs)
- Binding Corporate Rules (BCRs)
- Certification schemes
- Codes of conduct

2. DATA LOCALIZATION REQUIREMENTS
Countries with data residency requirements:
- Russia: Personal data of Russian citizens
- China: Critical information infrastructure
- India: Payment system data
- Brazil: Proposed but not yet enforced

PRIVACY PROGRAM IMPLEMENTATION:

1. GOVERNANCE STRUCTURE
Key roles:
- Data Protection Officer (required for some organizations)
- Privacy team or privacy champions
- Legal and compliance oversight
- Technical implementation team

2. PRIVACY POLICIES AND NOTICES
Required elements:
- Data controller identity and contact information
- Purposes and legal basis for processing
- Categories of personal data collected
- Recipients and transfer information
- Retention periods and deletion practices
- Individual rights and exercise procedures

3. CONSENT MANAGEMENT
Technical requirements:
- Granular consent options
- Easy withdrawal mechanisms
- Consent receipt documentation
- Age verification for minors
- Clear and plain language

4. DATA BREACH RESPONSE
Notification timelines:
- GDPR: 72 hours to authority, without delay to individuals
- CCPA: Without unreasonable delay
- State laws: Vary from immediate to 72 hours

Breach response plan components:
- Incident detection and assessment
- Containment and investigation procedures
- Notification decision matrix
- Regulatory reporting processes
- Communication templates`
  },
  {
    filename: 'securities-law-startup-compliance.txt',
    content: `Securities Law Compliance for Startup Fundraising

Startup fundraising must comply with federal and state securities laws. This guide covers exemptions, disclosure requirements, and compliance obligations.

FEDERAL SECURITIES LAW FRAMEWORK:

1. SECURITIES ACT OF 1933
Core principle: All securities offerings must be registered or qualify for an exemption.

Common startup exemptions:
- Rule 506(b): Private placement, accredited investors
- Rule 506(c): General solicitation allowed, verified accredited investors
- Rule 504: Small offerings up to $10 million
- Regulation Crowdfunding: Public offerings up to $5 million

2. SECURITIES EXCHANGE ACT OF 1934
Reporting obligations triggered by:
- 2,000+ shareholders of record
- 500+ non-accredited shareholders
- $10 million+ in assets

RULE 506(B) PRIVATE PLACEMENTS:

Requirements and limitations:
- No general solicitation or advertising
- Unlimited accredited investors
- Up to 35 sophisticated non-accredited investors
- No monetary limit on offering size
- Form D filing within 15 days

Accredited investor definitions:
- Individual: $1M+ net worth or $200K+ annual income
- Entity: $5M+ in assets or all owners are accredited
- Knowledgeable employees of private funds
- Large family offices ($5M+ under management)

3. RULE 506(C) PUBLIC SOLICITATION

Additional requirements beyond 506(b):
- General solicitation and advertising permitted
- All investors must be accredited
- Reasonable steps to verify accredited status
- Enhanced disclosure obligations
- Form D filing requirement

DISCLOSURE OBLIGATIONS:

1. PRIVATE PLACEMENT MEMORANDUM (PPM)
Typical sections:
- Executive summary and business overview
- Risk factors and forward-looking statements
- Use of proceeds and investment terms
- Management team and advisors
- Financial statements and projections
- Legal structure and governance

2. SUBSCRIPTION DOCUMENTS
Key agreements:
- Subscription agreement with investor representations
- Purchase agreement or convertible note terms
- Investor rights agreement (for equity rounds)
- Information and inspection rights

STATE SECURITIES LAW (BLUE SKY):

1. STATE FILING REQUIREMENTS
Notice filings required in states where:
- Investors are residents
- Offers are made
- Sales are consummated

Common state requirements:
- Form D state equivalent filing
- Filing fees ($100-$1,000 per state)
- Consent to service of process
- Investment advisor registration (sometimes)

2. STATE EXEMPTION COORDINATION
Uniform coordination:
- Series A-F offerings often qualify for multiple state exemptions
- NASAA coordination among state regulators
- Merit review vs. notice filing states

ONGOING COMPLIANCE:

1. REPORTING TO INVESTORS
Information rights typically include:
- Annual audited financial statements
- Quarterly or monthly updates
- Material event notifications
- Board meeting minutes (sometimes)

2. TRANSFER RESTRICTIONS
Securities legend requirements:
- Reference to securities laws restrictions
- Resale limitations and holding periods
- Transfer agent instructions
- Board or investor approval requirements

3. EMPLOYEE STOCK OPTION COMPLIANCE
Rule 701 exemption requirements:
- Compensatory benefit plan
- Written plan document
- Employee, director, or consultant recipients
- Disclosure requirements for large plans

409A VALUATIONS:

Requirement triggers:
- Stock option grants to employees
- Preferred stock issuances
- Significant business changes
- 12-month safe harbor periods

Valuation methodologies:
- Asset approach (early stage)
- Market approach (comparable companies)
- Income approach (revenue-generating companies)
- Hybrid approaches for complex situations

INVESTMENT ADVISOR CONSIDERATIONS:

Registration thresholds:
- $100M+ assets under management (federal)
- $100M assets under management (state)
- 15+ clients (varies by state)
- Performance-based fees to non-qualified clients

Exemptions for startups:
- Venture capital advisor exemption
- Private fund advisor exemption
- Intrastate advisor exemption
- Family office exemption`
  },
  {
    filename: 'contract-law-startup-agreements.txt',
    content: `Contract Law and Commercial Agreements for Startups

Startups require various commercial agreements to operate effectively. This guide covers essential contract types, terms, and negotiation strategies.

CUSTOMER AGREEMENTS:

1. SOFTWARE AS A SERVICE (SAAS) AGREEMENTS
Essential terms:
- Service level agreements (SLAs) with uptime commitments
- Data ownership and privacy provisions
- Limitation of liability and disclaimers
- Termination and data return procedures
- Payment terms and automatic renewal clauses

SLA components:
- Uptime percentage commitments (99.9% standard)
- Response time for support requests
- Planned maintenance windows
- Service credit remedies for failures
- Force majeure exceptions

2. MASTER SERVICE AGREEMENTS (MSA)
Framework contract benefits:
- Streamlined future engagement process
- Consistent terms across multiple projects
- Separate statements of work for specific deliverables
- Ongoing relationship management structure

Key provisions:
- Scope of services and deliverables
- Payment terms and milestone structure
- Intellectual property ownership
- Confidentiality and data protection
- Dispute resolution procedures

VENDOR AND SUPPLIER AGREEMENTS:

1. SOFTWARE LICENSING AGREEMENTS
License types:
- Perpetual licenses with maintenance agreements
- Subscription-based software licenses
- Open source license compliance
- Enterprise license agreements with volume discounts

Key negotiation points:
- Scope of licensed use (users, locations, purposes)
- Maintenance and support obligations
- Version upgrade rights and obligations
- Termination and transition assistance
- Audit rights and compliance verification

2. PROFESSIONAL SERVICES AGREEMENTS
Service provider categories:
- Legal and accounting services
- Marketing and advertising agencies
- Technical consulting and development
- Human resources and recruitment

Standard terms:
- Statement of work for specific projects
- Hourly rates vs. fixed fee structures
- Intellectual property assignment or licensing
- Confidentiality and non-disclosure obligations
- Termination for convenience provisions

PARTNERSHIP AND COLLABORATION AGREEMENTS:

1. STRATEGIC PARTNERSHIP AGREEMENTS
Partnership structures:
- Technology integration partnerships
- Co-marketing and sales partnerships
- Channel partner and reseller agreements
- Joint venture and development partnerships

Key commercial terms:
- Revenue sharing and commission structures
- Marketing and promotional obligations
- Territory and customer restrictions
- Performance metrics and termination triggers
- Intellectual property licensing and ownership

2. NON-DISCLOSURE AGREEMENTS (NDAs)
Mutual vs. unilateral NDAs:
- Mutual: Both parties share confidential information
- Unilateral: One party discloses to another
- Evaluation agreements for potential transactions

Critical provisions:
- Definition of confidential information
- Permitted uses and disclosure exceptions
- Return or destruction obligations
- Remedies for breach (injunctive relief)
- Survival periods and governing law

EMPLOYMENT AND CONSULTANT AGREEMENTS:

1. EMPLOYMENT AGREEMENTS
Key provisions for startups:
- At-will employment with carve-outs
- Compensation structure (salary, equity, benefits)
- Confidentiality and invention assignment
- Non-compete and non-solicitation clauses
- Severance and change of control provisions

2. INDEPENDENT CONTRACTOR AGREEMENTS
Distinction from employment:
- Payment structure and tax treatment
- Intellectual property ownership
- Work schedule and location flexibility
- Equipment and resource provision
- Termination and notice requirements

CONTRACT NEGOTIATION STRATEGIES:

1. RISK ALLOCATION PRINCIPLES
Liability limitations:
- Cap total liability at contract value
- Exclude consequential and punitive damages
- Carve-outs for confidentiality and IP breaches
- Insurance and indemnification requirements

2. TERMINATION AND TRANSITION
Termination triggers:
- Material breach with cure periods
- Insolvency or change of control
- Convenience termination with notice
- Performance-based termination rights

Transition obligations:
- Data return and deletion procedures
- Knowledge transfer and documentation
- Transition services during wind-down
- Non-interference with customer relationships

COMPLIANCE AND REGULATORY CONSIDERATIONS:

1. INDUSTRY-SPECIFIC REQUIREMENTS
Healthcare: HIPAA compliance and business associate agreements
Financial services: SOX compliance and audit requirements
International: GDPR data processing agreements
Government: FAR/DFAR compliance for federal contracts

2. DISPUTE RESOLUTION
Alternative dispute resolution:
- Mediation before litigation requirements
- Binding arbitration with limited appeal rights
- Jurisdiction and venue selection clauses
- Choice of law provisions

Court litigation considerations:
- Discovery costs and timeline
- Jury trial rights and waivers
- Preliminary injunction standards
- Attorney fee shifting provisions`
  },
  {
    filename: 'tax-planning-startup-structures.txt',
    content: `Tax Planning and Entity Structure for Startups

Strategic tax planning is essential for startup success. This guide covers entity selection, tax elections, and ongoing compliance requirements.

ENTITY SELECTION ANALYSIS:

1. C-CORPORATION BENEFITS
Tax advantages:
- Section 1202 qualified small business stock (QSBS) exemption
- Tax-free reorganizations and acquisitions
- Employee stock option tax efficiency
- Corporate tax rate advantages (21% federal)

QSBS requirements:
- $50 million gross asset test at issuance
- Active business requirement (80% test)
- Five-year holding period for exemption
- $10 million or 10x basis gain exclusion limit

2. S-CORPORATION CONSIDERATIONS
Pass-through taxation benefits:
- No double taxation on distributions
- Loss pass-through to shareholders
- Built-in gains tax considerations
- Reasonable salary requirements for owners

Limitations for startups:
- 100 shareholder limit
- One class of stock restriction
- No non-resident alien shareholders
- Limited investment and passive income

3. LLC STRUCTURES
Flexibility advantages:
- Multiple member classes and rights
- Flexible profit and loss allocations
- Check-the-box tax elections
- Operating agreement customization

Tax elections available:
- Partnership taxation (default for multi-member)
- S-corporation election for employment tax savings
- C-corporation election for investment compatibility

STARTUP TAX ELECTIONS:

1. SECTION 83(B) ELECTIONS
Filing requirements:
- Must file within 30 days of grant
- Copy to IRS with tax return
- Copy to employer for records
- Irrevocable election with significant consequences

Tax benefits:
- Income recognition at current (low) fair market value
- Capital gains treatment on future appreciation
- Avoidance of ordinary income on vesting

2. SECTION 1045 ROLLOVER
Qualified small business stock rollover:
- Defer gain recognition on QSBS sales
- Must reinvest proceeds in new QSBS within 60 days
- Unlimited deferral with proper planning
- Combination with Section 1202 exclusion

R&D TAX CREDIT OPPORTUNITIES:

1. FEDERAL R&D CREDIT CALCULATION
Credit calculation methods:
- Traditional method (current vs. base period)
- Alternative simplified credit (14% of excess)
- Payroll tax election for startups (Section 41(h))

Qualifying activities:
- Software development and testing
- Product design and prototyping
- Process improvement initiatives
- Technical uncertainty resolution

2. STATE R&D CREDITS
High-value state programs:
- California: 15% credit with carryforward
- New York: 9% credit with three-year carryback
- Texas: 5% credit against franchise tax
- Massachusetts: 10% refundable credit

INTERNATIONAL TAX CONSIDERATIONS:

1. TRANSFER PRICING FOR IP
IP development structures:
- Cost-sharing agreements for joint development
- IP licensing between related entities
- IP holding company jurisdictions
- Arm's length pricing requirements

2. FOREIGN OPERATIONS
Tax-efficient structures:
- Foreign subsidiary vs. branch operations
- Check-the-box elections for foreign entities
- Subpart F income and GILTI considerations
- Foreign tax credit planning

STATE AND LOCAL TAX PLANNING:

1. NEXUS CONSIDERATIONS
Economic nexus thresholds:
- Sales tax: $100,000 or 200 transactions (typical)
- Income tax: Varies by state significantly
- Employment tax: Single employee often creates nexus
- Property tax: Tangible property location-based

2. APPORTIONMENT PLANNING
Multi-state income allocation:
- Sales factor weighting advantages
- Market-based sourcing for services
- Throwback and throwout rule impacts
- Combined vs. separate return elections

TAX COMPLIANCE OBLIGATIONS:

1. FEDERAL COMPLIANCE
Annual requirements:
- Corporate income tax returns (Form 1120/1120S)
- Payroll tax deposits and returns (941/940)
- Information returns for contractors (1099-NEC)
- Employee tax documents (W-2s)

Quarterly obligations:
- Estimated tax payments for corporations
- Payroll tax deposits (monthly/semi-weekly)
- Employment tax return filings
- State estimated tax payments

2. STATE COMPLIANCE
Registration requirements:
- Income/franchise tax registration
- Sales and use tax permits
- Employment tax registration
- Professional licensing (where required)

EQUITY COMPENSATION TAX PLANNING:

1. STOCK OPTION TAXATION
Incentive stock options (ISOs):
- No regular tax on grant or exercise
- Alternative minimum tax (AMT) preference item
- Capital gains treatment if holding period met
- $100,000 annual exercisability limit

Non-qualified stock options (NQSOs):
- Ordinary income on exercise (spread)
- Employer deduction for compensation expense
- Capital gains treatment on subsequent sale
- Withholding and payroll tax obligations

2. RESTRICTED STOCK AWARDS
Tax treatment:
- Ordinary income on vesting (fair market value)
- Section 83(b) election to accelerate recognition
- Employer deduction timing matches employee income
- Capital gains treatment on sale after vesting

409A VALUATION TAX IMPLICATIONS:

Deferred compensation rules:
- Applies to stock options and phantom equity
- Substantial additional tax penalty for violations
- Safe harbor valuation methods required
- Documentation and consistency requirements

Valuation methodology impacts:
- Option exercise price determination
- ISO vs. NQSO tax treatment qualification
- Employee tax withholding calculations
- Financial reporting implications`
  },
  {
    filename: 'international-expansion-legal-framework.txt',
    content: `International Expansion Legal Framework for Startups

Global expansion requires careful legal planning across multiple jurisdictions. This guide covers entity structures, compliance requirements, and risk management strategies.

INTERNATIONAL ENTITY STRUCTURES:

1. SUBSIDIARY VS. BRANCH OPERATIONS
Subsidiary advantages:
- Limited liability protection for parent company
- Local corporate presence and credibility
- Separate legal entity with distinct obligations
- Potential tax planning opportunities

Branch office considerations:
- Direct extension of parent company operations
- No separate legal entity or liability protection
- Simplified accounting and reporting requirements
- Direct parent company tax implications

2. COMMON INTERNATIONAL STRUCTURES
United Kingdom:
- Private Limited Company (Ltd): Standard subsidiary structure
- Branch registration: Simpler but unlimited liability
- Representative office: Marketing only, no revenue generation

European Union:
- Societas Europaea (SE): Pan-European corporation structure
- Societas Privata Europaea (SPE): Proposed simplified structure
- Directive compliance: VAT, data protection, employment law

Asia Pacific:
- Singapore Pte Ltd: Regional headquarters structure
- Hong Kong Limited: China market access vehicle
- Australia Pty Ltd: Simple incorporation with ASIC

REGULATORY COMPLIANCE FRAMEWORKS:

1. DATA PROTECTION AND PRIVACY
Cross-border data transfer mechanisms:
- Standard Contractual Clauses (SCCs) for GDPR
- Binding Corporate Rules (BCRs) for intra-group transfers
- Adequacy decisions for safe harbor countries
- Local data residency requirements

Regional privacy law compliance:
- PIPEDA (Canada): Personal Information Protection
- LGPD (Brazil): Lei Geral de Proteção de Dados
- PDPA (Singapore): Personal Data Protection Act
- Privacy Act (Australia): Privacy principles compliance

2. EMPLOYMENT LAW COMPLIANCE
Key international employment considerations:
- Mandatory benefits and social security contributions
- Termination notice periods and severance requirements
- Working time regulations and overtime restrictions
- Anti-discrimination and equal opportunity laws

Country-specific requirements:
- Germany: Works councils and co-determination rights
- France: 35-hour work week and extensive leave entitlements
- Japan: Lifetime employment culture and termination restrictions
- Brazil: Complex labor law with mandatory profit sharing

INTELLECTUAL PROPERTY PROTECTION:

1. TRADEMARK REGISTRATION STRATEGIES
Madrid Protocol benefits:
- Single application for multiple countries
- Centralized management and renewals
- Cost-effective expansion of protection
- Simplified opposition and cancellation procedures

Regional trademark systems:
- European Union Trademark (EUTM): 27-country protection
- African Regional Intellectual Property Organization (ARIPO)
- Benelux Trademark (covers Belgium, Netherlands, Luxembourg)

2. PATENT PROTECTION STRATEGIES
Patent Cooperation Treaty (PCT):
- 18-month delay for national phase entry
- International search and examination
- Unified application procedure
- Strategic delay for market validation

Regional patent systems:
- European Patent Office (EPO): Validation in member states
- Eurasian Patent Organization (EAPO): Former Soviet states
- African Regional Intellectual Property Organization (ARIPO)

TAX PLANNING FOR INTERNATIONAL OPERATIONS:

1. TRANSFER PRICING COMPLIANCE
OECD Base Erosion and Profit Shifting (BEPS):
- Action 13: Country-by-country reporting requirements
- Master file and local file documentation
- Arm's length principle application
- Advance pricing agreement opportunities

Common transfer pricing structures:
- IP licensing between related entities
- Cost-sharing agreements for development
- Service fee arrangements for shared functions
- Distribution agreements with appropriate margins

2. DOUBLE TAXATION TREATY NETWORKS
Treaty benefits:
- Reduced withholding tax rates on dividends, interest, royalties
- Permanent establishment threshold protection
- Mutual agreement procedures for dispute resolution
- Non-discrimination provisions

Key treaty jurisdictions for startups:
- Netherlands: Extensive treaty network, holding company benefits
- Ireland: EU access with favorable tax regime
- Singapore: Asian gateway with strong treaty network
- Switzerland: Stable jurisdiction with broad treaty coverage

CORPORATE GOVERNANCE REQUIREMENTS:

1. BOARD COMPOSITION AND DUTIES
Local director requirements:
- Australia: At least one Australian resident director
- Singapore: At least one Singapore resident director
- Canada: 25% Canadian resident directors (for large corporations)
- New Zealand: At least one New Zealand resident director

Fiduciary duty standards:
- Business judgment rule application
- Duty of care and loyalty to the company
- Conflict of interest disclosure requirements
- Stakeholder vs. shareholder primacy models

2. REPORTING AND DISCLOSURE OBLIGATIONS
Annual filing requirements:
- Audited financial statements (thresholds vary)
- Annual returns with updated company information
- Beneficial ownership registers (increasingly common)
- Public disclosure of significant transactions

DISPUTE RESOLUTION AND ENFORCEMENT:

1. INTERNATIONAL ARBITRATION
Arbitration advantages:
- Neutral forum selection
- Enforcement under New York Convention
- Expert arbitrator selection
- Confidentiality of proceedings

Key arbitration institutions:
- International Chamber of Commerce (ICC)
- London Court of International Arbitration (LCIA)
- Singapore International Arbitration Centre (SIAC)
- Hong Kong International Arbitration Centre (HKIAC)

2. CROSS-BORDER LITIGATION CONSIDERATIONS
Jurisdiction and enforcement:
- Hague Convention on service of process
- Brussels Regulation for EU judgments
- Bilateral enforcement treaties
- Asset location for judgment collection

COMPLIANCE MONITORING AND RISK MANAGEMENT:

1. ONGOING COMPLIANCE SYSTEMS
Legal entity management:
- Corporate housekeeping and minute books
- Annual return and fee payment tracking
- Director and officer appointment updates
- Registered office and agent maintenance

2. REGULATORY CHANGE MONITORING
Key areas for monitoring:
- Tax law changes affecting international structures
- Employment law updates in operational jurisdictions
- Data protection regulation evolution
- Trade and sanctions law developments

MARKET ENTRY STRATEGIES:

1. JOINT VENTURES AND PARTNERSHIPS
Strategic alliance structures:
- Equity joint ventures with local partners
- Contractual joint ventures for specific projects
- Distribution and channel partner agreements
- Technology licensing and collaboration agreements

2. ACQUISITION CONSIDERATIONS
Due diligence focus areas:
- Local regulatory approvals and restrictions
- Employment law compliance and union relationships
- Tax compliance and transfer pricing documentation
- Intellectual property ownership and freedom to operate`
  },
  {
    filename: 'regulatory-compliance-framework.txt',
    content: `Regulatory Compliance Framework for Technology Startups

Technology startups face an evolving regulatory landscape across multiple jurisdictions and industries. This comprehensive framework addresses key compliance areas and risk management strategies.

FINANCIAL SERVICES REGULATION:

1. PAYMENT SERVICES COMPLIANCE
Money transmitter licensing:
- State-by-state licensing requirements (49 states + DC)
- Net worth and bonding requirements ($100K-$7M)
- Annual reporting and examination obligations
- Consumer protection and disclosure requirements

Payment Card Industry (PCI) compliance:
- PCI DSS Level 1-4 requirements based on transaction volume
- Network tokenization and encryption standards
- Regular security assessments and penetration testing
- Incident response and breach notification procedures

2. SECURITIES REGULATION FOR FINTECH
Investment Advisor Act compliance:
- $100M+ assets under management threshold
- Robo-advisor and algorithmic trading oversight
- Custody rule compliance for client assets
- Form ADV disclosure and filing requirements

Broker-dealer registration:
- Activities triggering registration requirements
- Net capital requirements and customer protection
- Best execution and suitability obligations
- FINRA membership and examination procedures

HEALTHCARE AND LIFE SCIENCES:

1. HIPAA COMPLIANCE FOR HEALTH TECH
Covered entity determination:
- Healthcare providers using technology platforms
- Health plans and plan administration services
- Healthcare clearinghouses and data aggregators

Business Associate Agreement (BAA) requirements:
- Permitted uses and disclosures of PHI
- Safeguard implementation requirements
- Breach notification and reporting obligations
- Audit rights and compliance monitoring

2. FDA REGULATION FOR DIGITAL HEALTH
Software as Medical Device (SaMD) classification:
- Class I, II, III risk-based classification system
- 510(k) premarket notification requirements
- Quality system regulation (QSR) compliance
- Post-market surveillance and adverse event reporting

Clinical trial regulations:
- Good Clinical Practice (GCP) standards
- Informed consent and institutional review boards
- Data integrity and electronic records requirements
- FDA inspection and audit preparation

TELECOMMUNICATIONS AND INTERNET:

1. FCC REGULATION FOR COMMUNICATIONS
Common carrier obligations:
- Voice over Internet Protocol (VoIP) services
- Disabilities Act compliance (ADA Section 255)
- Customer proprietary network information (CPNI) protection
- Universal Service Fund contribution requirements

Content moderation and platform liability:
- Section 230 immunity and limitations
- Notice and takedown procedures for copyright
- Terrorist content and child safety obligations
- Transparency reporting requirements

2. BROADBAND AND INFRASTRUCTURE
Net neutrality principles:
- No blocking, throttling, or paid prioritization
- Transparency requirements for network management
- Reasonable network management exceptions
- State-level net neutrality laws

CONSUMER PROTECTION:

1. ADVERTISING AND MARKETING COMPLIANCE
Federal Trade Commission (FTC) guidance:
- Truth in advertising and substantiation requirements
- Endorsement and testimonial disclosure guidelines
- Native advertising and sponsored content labeling
- Children's advertising special protections

Telemarketing and robocall regulations:
- Telephone Consumer Protection Act (TCPA) compliance
- National Do Not Call Registry requirements
- Express written consent for automated calls/texts
- Call time restrictions and identification requirements

2. CONSUMER FINANCIAL PROTECTION
Consumer Financial Protection Bureau (CFPB) oversight:
- Fair lending and equal credit opportunity compliance
- Truth in Lending Act (TILA) and CARD Act requirements
- Electronic Fund Transfer Act (EFTA) protections
- Complaint handling and response procedures

ENVIRONMENTAL AND SAFETY:

1. ENVIRONMENTAL COMPLIANCE
Electronic waste and recycling:
- Extended producer responsibility programs
- Restriction of Hazardous Substances (RoHS) compliance
- Waste Electrical and Electronic Equipment (WEEE) Directive
- Conflict minerals reporting requirements

Carbon footprint and sustainability:
- Greenhouse gas emissions reporting
- Renewable energy credits and offsets
- Supply chain sustainability requirements
- ESG disclosure and reporting frameworks

2. WORKPLACE SAFETY
Occupational Safety and Health Administration (OSHA):
- General duty clause and specific standards
- Hazard communication and safety data sheets
- Workplace injury and illness reporting
- Inspection and citation response procedures

INTERNATIONAL REGULATORY FRAMEWORKS:

1. EUROPEAN UNION REGULATIONS
Digital Services Act (DSA) and Digital Markets Act (DMA):
- Platform governance and content moderation
- Algorithmic transparency and risk assessment
- Gatekeeper designation and interoperability requirements
- Data access and portability obligations

Artificial Intelligence Act (proposed):
- Risk-based approach to AI system regulation
- Prohibited AI practices and high-risk system requirements
- Conformity assessment and CE marking
- Market surveillance and enforcement mechanisms

2. ASIA-PACIFIC REGULATIONS
China Cybersecurity Law and Data Security Law:
- Data localization and cross-border transfer restrictions
- Critical information infrastructure protection
- Personal information protection and consent requirements
- Cybersecurity review and approval procedures

Singapore Model AI Governance Framework:
- Voluntary adoption with sector-specific guidance
- Risk management and impact assessment approaches
- Human oversight and algorithmic accountability
- Industry collaboration and best practices sharing

EMERGING TECHNOLOGY REGULATION:

1. ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING
Algorithmic accountability requirements:
- Bias testing and fairness assessments
- Explainability and transparency obligations
- Human review and appeal procedures
- Impact assessment and documentation requirements

2. BLOCKCHAIN AND CRYPTOCURRENCY
Digital asset regulation:
- Securities law analysis for token offerings
- Money transmission licensing for exchanges
- Anti-money laundering (AML) and know-your-customer (KYC)
- Tax reporting and compliance obligations

COMPLIANCE PROGRAM DEVELOPMENT:

1. RISK ASSESSMENT AND MAPPING
Regulatory inventory process:
- Industry and geographic scope analysis
- Applicable law and regulation identification
- Compliance obligation mapping and prioritization
- Gap analysis and remediation planning

2. MONITORING AND REPORTING SYSTEMS
Compliance management technology:
- Regulatory change management systems
- Automated monitoring and alert systems
- Policy management and version control
- Training and certification tracking

Internal audit and testing:
- Regular compliance assessments and testing
- Third-party vendor compliance monitoring
- Incident response and corrective action procedures
- Board and management reporting frameworks`
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

async function createEnhancedEmbeddings() {
  console.log('🚀 Creating enhanced startup legal document embeddings...')
  
  // Ensure legal-data directory exists
  const legalDataDir = path.join(process.cwd(), 'legal-data')
  const rawDir = path.join(legalDataDir, 'raw')
  
  if (!fs.existsSync(legalDataDir)) {
    fs.mkdirSync(legalDataDir)
  }
  if (!fs.existsSync(rawDir)) {
    fs.mkdirSync(rawDir)
  }

  // Write comprehensive legal documents to files
  console.log('📝 Creating comprehensive legal document library...')
  for (const doc of startupLegalLibrary) {
    const filePath = path.join(rawDir, doc.filename)
    fs.writeFileSync(filePath, doc.content)
    console.log(`   ✅ Created ${doc.filename}`)
  }

  // Process documents and create mock embeddings with enhanced chunking
  console.log('🔤 Creating enhanced embeddings with optimized chunking...')
  const embeddings = []
  
  for (const doc of startupLegalLibrary) {
    console.log(`   Processing ${doc.filename}...`)
    
    // Enhanced chunking: 600 characters with overlap
    const chunkSize = 600
    const overlapSize = 100
    const chunks = []
    
    for (let i = 0; i < doc.content.length; i += (chunkSize - overlapSize)) {
      const chunk = doc.content.slice(i, i + chunkSize)
      if (chunk.trim().length > 50) { // Only include substantial chunks
        chunks.push(chunk.trim())
      }
    }
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      const mockEmbedding = generateMockEmbedding()
      
      embeddings.push({
        text: chunk,
        source: doc.filename,
        chunkIndex: i,
        chunkSize: chunk.length,
        vector: mockEmbedding,
        metadata: {
          documentType: getDocumentType(doc.filename),
          legalArea: getLegalArea(doc.filename),
          complexity: getComplexityScore(chunk),
          lastUpdated: new Date().toISOString()
        }
      })
      
      console.log(`   ✅ Created enhanced embedding for chunk ${i + 1}/${chunks.length} from ${doc.filename}`)
    }
  }

  // Save enhanced embeddings to JSON file
  const embeddingsPath = path.join(legalDataDir, 'embeddings.json')
  fs.writeFileSync(embeddingsPath, JSON.stringify(embeddings, null, 2))
  
  console.log(`✅ Successfully created ${embeddings.length} enhanced embeddings`)
  console.log(`📁 Enhanced embeddings saved to: ${embeddingsPath}`)
  console.log(`📊 Coverage: ${startupLegalLibrary.length} legal documents across all startup legal areas`)
  console.log('🎉 Enhanced ingestion complete!')
  console.log('💡 To use real OpenAI embeddings, add OPENAI_API_KEY to .env.local and run: npm run ingest')
}

function getDocumentType(filename) {
  if (filename.includes('formation') || filename.includes('corp')) return 'Corporate Formation'
  if (filename.includes('employment')) return 'Employment Law'
  if (filename.includes('ip') || filename.includes('intellectual')) return 'Intellectual Property'
  if (filename.includes('privacy') || filename.includes('data')) return 'Privacy & Data Protection'
  if (filename.includes('securities')) return 'Securities Law'
  if (filename.includes('contract')) return 'Commercial Contracts'
  if (filename.includes('tax')) return 'Tax Planning'
  if (filename.includes('international')) return 'International Expansion'
  if (filename.includes('regulatory')) return 'Regulatory Compliance'
  return 'General Legal'
}

function getLegalArea(filename) {
  const areas = []
  if (filename.includes('gdpr') || filename.includes('privacy')) areas.push('Privacy')
  if (filename.includes('employment')) areas.push('Employment')
  if (filename.includes('ip') || filename.includes('intellectual')) areas.push('IP')
  if (filename.includes('securities') || filename.includes('fundraising')) areas.push('Securities')
  if (filename.includes('tax')) areas.push('Tax')
  if (filename.includes('international')) areas.push('International')
  if (filename.includes('regulatory')) areas.push('Compliance')
  if (filename.includes('contract')) areas.push('Contracts')
  if (filename.includes('formation')) areas.push('Corporate')
  return areas.length > 0 ? areas : ['General']
}

function getComplexityScore(text) {
  // Simple complexity scoring based on legal terms and sentence length
  const legalTerms = ['shall', 'whereas', 'therefor', 'pursuant', 'notwithstanding', 'compliance', 'regulation', 'statute']
  const termCount = legalTerms.reduce((count, term) => count + (text.toLowerCase().includes(term) ? 1 : 0), 0)
  const avgSentenceLength = text.split('.').reduce((sum, sentence) => sum + sentence.length, 0) / text.split('.').length
  
  if (termCount >= 3 || avgSentenceLength > 100) return 'High'
  if (termCount >= 1 || avgSentenceLength > 60) return 'Medium'
  return 'Low'
}

// Run the enhanced ingestion
createEnhancedEmbeddings().catch(console.error) 