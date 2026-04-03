# Informal Economy Formalizer

A comprehensive AI-powered platform that brings shadow economies into the formal financial system by transforming informal economic signals into verifiable identities, credit profiles, and legal structures.

## 🌍 Global Impact

- **60%** of world's workers operate in informal economy
- **2B+** potential users without access to capital
- Unlocks **$16.8T** in estimated market value
- Enables access to microfinance and formal credit

## 🚀 Key Features

### Signal Ingestion Layer
- **Mobile Payment Analysis**: M-Pesa, UPI, and mobile money transaction parsing
- **WhatsApp Business Patterns**: Message frequency, catalogue analysis, customer interactions
- **Physical Signals**: GPS foot traffic, community reputation, market registration data
- **Fraud Detection**: Circular network detection, synthetic activity pattern recognition

### AI Agent Layer
- **Identity Construction**: Unified economic identity graph from heterogeneous signals
- **Formalization Workflow**: Automated navigation of country-specific regulatory pathways
- **Credit Scoring**: ML-based creditworthiness assessment with confidence scoring
- **Document Generation**: Auto-generate contracts, tax forms, and business registration documents

### Output Layer
- **Credit Profiles**: Bank-readable credit scores with evidence packages
- **Legal Documents**: Business registration, tax IDs, and contracts
- **Insurance Eligibility**: Risk profiles for micro-insurance products
- **Government Programs**: Subsidy and scheme eligibility mapping

## 📊 Dashboard Features

### For Traders/Users
- **Profile Management**: View economic identity and formalization progress
- **Credit Information**: Understand credit scores and recommendations
- **Document Portal**: Download generated documents and reports
- **Status Tracking**: Real-time progress through formalization pipeline

### For Field Agents
- **Trader Management**: Manage assigned traders and formalization queue
- **Performance Metrics**: Track completion rates and agent ratings
- **Signal Collection**: Coordinate signal data ingestion
- **Community Liaison**: Manage peer vouching and community verification

### For Administrators
- **Analytics Dashboard**: Comprehensive platform metrics and KPIs
- **Geographic Insights**: Performance by region and country
- **Risk Monitoring**: Fraud detection and data quality alerts
- **Integration Management**: Configure API connections and webhooks

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 with React 19
- **UI Components**: shadcn/ui with Tailwind CSS
- **Charts**: Recharts for data visualization
- **Styling**: Custom design tokens with oklch color system

### Backend
- **API Routes**: Next.js API routes with TypeScript
- **Type Safety**: Full TypeScript support
- **Data Visualization**: Interactive charts and analytics

### Architecture
- **Database**: Ready for PostgreSQL/Supabase integration
- **Authentication**: Extensible auth system (supports Supabase, custom)
- **API Integrations**: M-Pesa, WhatsApp Business, Tax Authorities, Lender APIs
- **Document Storage**: Federated, encrypted storage with privacy controls

## 📁 Project Structure

```
├── app/
│   ├── api/                    # Backend API routes
│   │   ├── traders/           # Trader management
│   │   ├── credit-profile/    # Credit scoring
│   │   ├── analytics/         # Analytics data
│   │   └── health/            # Health check
│   ├── dashboard/             # Main dashboard page
│   ├── traders/               # Traders management
│   │   └── [id]/             # Individual trader profile
│   ├── agents/               # Field agents management
│   ├── analytics/            # Platform analytics
│   ├── settings/             # Configuration
│   └── layout.tsx            # Root layout
├── components/
│   ├── navigation.tsx         # Top navigation
│   ├── trader-profile-card.tsx# Trader profile component
│   ├── credit-profile-card.tsx# Credit profile display
│   ├── formalization-flow.tsx # Formalization pipeline
│   ├── signal-visualization.tsx# Charts and analytics
│   └── ui/                    # shadcn/ui components
├── app/
│   ├── globals.css           # Global styles & design tokens
│   └── layout.tsx            # Root layout
└── public/                    # Static assets
```

## 🔑 Key Pages

### Home Page (`/`)
Landing page with value proposition, key capabilities, workflow overview, and CTAs

### Dashboard (`/dashboard`)
Real-time analytics, platform metrics, formalization trends, top performers, recent activity

### Traders (`/traders`)
Browse and manage trader profiles, filter by status, view signals and scores
- Individual trader pages with credit profiles and formalization progress

### Field Agents (`/agents`)
Manage field agent network, view performance metrics, ratings, managed traders

### Analytics (`/analytics`)
Advanced analytics with multiple visualizations:
- Growth trends and formalization rates
- Credit score distributions
- Geographic performance
- Business type breakdown
- Regional comparisons

### Settings (`/settings`)
Configure organization settings, API keys, integrations, data residency, notifications

## 🔌 API Endpoints

### Traders
- `GET /api/traders` - List traders with filtering
- `POST /api/traders` - Create new trader profile
- `GET /api/traders/[id]` - Get specific trader details

### Credit Profiles
- `POST /api/credit-profile` - Generate credit profile from signals
- `GET /api/credit-profile?traderId=xxx` - Retrieve existing profile

### Analytics
- `GET /api/analytics?period=month` - Get platform analytics

### Health
- `GET /api/health` - Check system health and service status

## 🎨 Design System

### Color Palette
- **Primary**: `oklch(0.38 0.197 245)` - Professional Blue
- **Accent**: `oklch(0.56 0.231 37)` - Warm Orange
- **Background**: Light with primary/accent accents
- **Dark Mode**: Deep navy with amber accents

### Typography
- **Headlines**: Geist (default)
- **Body**: Geist
- **Code**: Geist Mono

### Components
- **Cards**: For content grouping
- **Badges**: Status and tags
- **Progress Bars**: Signal scores
- **Charts**: Interactive visualizations
- **Forms**: Field and input groups

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Demo Data

The platform includes comprehensive demo data:
- 8 sample traders from multiple countries
- 5 field agents across regions
- Monthly growth analytics
- Signal analysis and scoring
- Credit profile generation

## 🔐 Security & Privacy

- **End-to-End Encryption**: All trader data encrypted
- **Federated Storage**: Regional data residency
- **Zero-Knowledge Proofs**: For credential sharing
- **Fraud Detection**: Advanced pattern analysis
- **Compliance**: GDPR, local data protection laws

## 🌐 Multi-Country Support

### Current Markets
- 🇰🇪 Kenya (M-Pesa primary)
- 🇮🇳 India (UPI integration)
- 🇵🇭 Philippines (GCash, PayMaya)
- 🇬🇭 Ghana (Mobile Money)
- 🇳🇬 Nigeria (Flutterwave, Remita)

### Regulatory Frameworks
- Country-specific credit scoring regulations
- Tax registration requirements
- Business licensing pathways
- Microfinance compliance

## 🇰🇪 Kenya-First Build Track

If you are implementing the real MVP now, start with the Kenya execution blueprint:

- `KENYA_MVP_EXECUTION_PLAN.md` - scope lock, architecture, data model, APIs, 16-week milestones, and acceptance criteria

## 📈 Roadmap

### Phase 1 (MVP)
- ✅ Core dashboard and trader management
- ✅ Credit profile generation
- ✅ Analytics and visualization
- ✅ Field agent management

### Phase 2
- Mobile app (WhatsApp + USSD)
- Real M-Pesa API integration
- ML-based fraud detection
- Advanced signal processing

### Phase 3
- Microfinance lender integration
- Insurance product eligibility
- Government subsidy mapping
- Regional expansion (10+ countries)

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Additional country/regulatory support
- Enhanced fraud detection
- Real-world data integrations
- Mobile app development

## 📝 License

[Your License Here]

## 👥 Support

For issues, features, or questions:
- Email: info@formalizerinit.org
- Docs: [Full Documentation](/)
- Issues: GitHub Issues

---

**Built to unlock capital access for billions of informal workers worldwide.**
