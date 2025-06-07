# AI Legal Agents for Startups

AI-powered legal compliance platform for venture-backed startups. Automate GDPR, SOC 2, privacy policies, and access expert legal guidance starting at $199/month.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (free tier available)
- Supabase account (free tier available)

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd AiLegalAgent

# Install dependencies
npm install
```

### 2. Environment Setup

Copy the environment template and fill in your values:

```bash
cp env.example .env.local
```

Edit `.env.local` with your API keys:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration (free tier)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application Configuration
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your_random_secret_here
```

### 3. Set Up Supabase Database

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. In the SQL editor, run:

```sql
-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  plan text DEFAULT 'free',
  trial_expires_at timestamptz DEFAULT (now() + interval '7 days')
);

-- Legal cases/consultations table
CREATE TABLE cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  case_type text,
  status text DEFAULT 'open',
  title text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chat messages table
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  case_id uuid REFERENCES cases(id),
  message_type text, -- 'user' or 'ai'
  content text,
  created_at timestamptz DEFAULT now()
);
```

### 4. Create Legal Knowledge Base

Generate embeddings for the legal documents:

```bash
npm run ingest
```

This will:
- Create legal document files in `legal-data/raw/`
- Generate OpenAI embeddings
- Save embeddings to `legal-data/embeddings.json`

### 5. Start Development Server

```bash
npm run dev
```

Your platform will be available at `http://localhost:3002`

## 🏗️ Architecture

### Free-Tier Stack
- **Frontend**: Next.js on Vercel (free tier)
- **Database**: Supabase (free tier - 500k rows)
- **Vector Search**: In-memory JSON with cosine similarity
- **AI**: OpenAI GPT-4o-mini (free credits)
- **Embeddings**: OpenAI text-embedding-ada-002
- **Styling**: Tailwind CSS

### Key Components

```
├── pages/
│   ├── index.js          # Landing page with premium pricing
│   ├── chat.js           # AI Legal Compliance Assistant
│   ├── experts.js        # Expert lawyer network
│   └── api/
│       └── chat.js       # Chat API with RAG
├── components/           # Reusable UI components
├── styles/              
│   └── globals.css       # Tailwind + custom styles
├── infra/
│   └── ingest.js         # Vector embedding creation
├── legal-data/
│   ├── raw/              # Source legal documents
│   └── embeddings.json   # Vector embeddings
└── lib/                  # Utility functions
```

## 🎯 Features

### Landing Page
- ✅ Premium pricing tiers ($199-$1,299/month)
- ✅ Startup-focused testimonials (Y Combinator, Techstars)
- ✅ Partner logos (VCs and accelerators)
- ✅ Modern, conversion-optimized design

### AI Legal Assistant
- ✅ Startup-specific legal knowledge base
- ✅ GDPR, SOC 2, privacy policy guidance
- ✅ Fundraising document assistance
- ✅ Vector search with RAG (Retrieval Augmented Generation)
- ✅ Chat history and context awareness

### Expert Network
- ✅ Premium lawyer profiles ($300-650/hour)
- ✅ Specialization filtering
- ✅ Verified expert badges
- ✅ Booking system integration

## 🔧 Customization

### Adding New Legal Documents

1. Add documents to `infra/ingest.js`:

```javascript
const newDoc = {
  filename: 'new-legal-guide.txt',
  content: `Your legal content here...`
}
startupLegalDocs.push(newDoc)
```

2. Regenerate embeddings:
```bash
npm run ingest
```

### Updating Expert Profiles

Edit the `experts` array in `pages/experts.js`:

```javascript
const newExpert = {
  name: 'Expert Name',
  hourlyRate: '$500',
  specializations: ['GDPR', 'SOC 2'],
  // ... other fields
}
```

### Modifying Pricing Tiers

Update `pricingTiers` in `pages/index.js`:

```javascript
const newTier = {
  name: 'Custom',
  price: '$999',
  features: ['Feature 1', 'Feature 2'],
  // ... other fields
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Alternative: Netlify

1. Build the project: `npm run build`
2. Deploy `out/` folder to Netlify
3. Configure environment variables

## 📊 Analytics & Monitoring

### Free Options
- Vercel Analytics (free tier)
- Google Analytics 4
- Supabase real-time dashboard

### Recommended Upgrades
- PostHog for product analytics
- Sentry for error tracking
- LogRocket for user session replay

## 🔒 Security

- Environment variables for API keys
- CORS configuration for API routes
- Input validation and sanitization
- Rate limiting on API endpoints
- Supabase Row Level Security (RLS)

## 💰 Cost Optimization

### Free Tier Limits
- **Vercel**: 100GB bandwidth, 1000 serverless function invocations
- **Supabase**: 500MB database, 50MB file storage, 2 million edge function invocations
- **OpenAI**: $5 free credits for new accounts

### Scaling Strategy
1. Start with free tiers
2. Upgrade Supabase when hitting 500k rows (~$25/month)
3. Add Vercel Pro for team features (~$20/month)
4. Implement usage-based OpenAI billing

## 🤝 Support

- [OpenAI Documentation](https://platform.openai.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📝 License

MIT License - see LICENSE file for details.

---

**Ready to scale your legal operations with AI?** 🚀

This platform transforms traditional pro bono legal services into a premium AI-powered platform for venture-backed startups. Built with modern, scalable technology and positioned to capture the $100k+ MRR opportunity in the startup legal market. 