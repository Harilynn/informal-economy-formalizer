# Kenya MVP Execution Plan

## Objective
Build a production MVP for Kenya that converts M-Pesa transaction history into a lender-readable credit dossier.

## Scope Lock (MVP)
- Country: Kenya only
- Input signal: M-Pesa statements (PDF/SMS export)
- Output: credit profile + evidence dossier PDF
- Channel: WhatsApp onboarding flow
- Primary users: micro-traders and field officers

Out of scope for MVP:
- Multi-country regulations
- USSD flow (phase 2)
- Full identity graph across all signal types
- Insurance/government program matching

## Success Metrics
- Parser accuracy: >90% field-level extraction on 500 statements
- Model quality: AUC >= 0.72 on held-out test set
- Delivery speed: dossier generated in <= 90 seconds (P95)
- UX success: >= 40/50 users complete onboarding without assistance
- Institutional acceptance: 3 MFIs accept dossier format for review

## System Architecture (MVP)

### 1) Ingestion Layer
- WhatsApp inbound webhook receives statement upload and consent event
- File stored in secure object storage (Kenya region)
- OCR/parser pipeline extracts transactions and metadata
- Rule-based feature extraction computes behavioral signals

### 2) Scoring Layer
- Feature store aggregates user-month level vectors
- XGBoost model predicts repayment proxy score
- Confidence score computed from data coverage + consistency
- Fraud heuristics run before final score release

### 3) Output Layer
- LLM generates concise underwriting narrative
- Dossier builder creates standardized PDF package
- Results pushed to field-officer dashboard and user WhatsApp link

### 4) Compliance & Privacy Baseline
- Explicit consent capture and timestamping
- Country-resident storage for raw documents
- PII encryption at rest and in transit
- Audit trail for every scoring and document event

## Suggested Tech Stack for This MVP

### Product Channels
- WhatsApp bot: Meta WhatsApp Cloud API (or Twilio wrapper)
- Field dashboard: Next.js + Tailwind (current repo base)

### Backend Services
- API: Next.js route handlers (initial) or FastAPI microservice for parsing/model
- Queue: Redis + BullMQ for async parsing/scoring jobs
- Storage: S3-compatible bucket in-country region
- Database: PostgreSQL

### ML + Document AI
- Parsing: OCR (Tesseract or Document AI) + template/rule parser
- Model: XGBoost
- Narrative: GPT-4o or Claude API with strict structured prompt
- PDF generation: server-side template engine (HTML->PDF)

### Observability
- Tracing and logs: OpenTelemetry + centralized logs
- Product metrics: event instrumentation for funnel and latency

## Data Model (Minimal)

### users
- id (uuid)
- phone_e164
- consent_status
- consent_timestamp
- created_at

### statements
- id (uuid)
- user_id
- source_type (pdf|sms)
- storage_url
- parse_status
- parsed_at

### transactions
- id (uuid)
- statement_id
- txn_timestamp
- amount_kes
- direction (in|out)
- counterparty_hash
- category

### features
- id (uuid)
- user_id
- window_start
- window_end
- tx_frequency
- income_regularity
- merchant_diversity
- trend_growth
- data_coverage

### scores
- id (uuid)
- user_id
- model_version
- credit_score
- risk_band
- confidence_score
- fraud_flag
- created_at

### dossiers
- id (uuid)
- user_id
- score_id
- pdf_url
- summary_text
- generated_at

## API Contracts (MVP)

### POST /api/onboarding/whatsapp/webhook
- Receives consent and file events
- Enqueues parse job

### POST /api/statements/parse
- Parses uploaded document
- Persists transactions + parse quality report

### POST /api/features/compute
- Computes feature vector for user window

### POST /api/scores/generate
- Runs model and fraud checks
- Stores score + confidence

### POST /api/dossiers/generate
- Produces narrative + PDF
- Returns signed retrieval URL

### GET /api/dossiers/:id
- Returns dossier metadata and access link

## 16-Week Delivery Plan

### Weeks 1-4: Ingestion and Parsing
- Implement WhatsApp upload flow + consent capture
- Build PDF/SMS parser and transaction normalizer
- Add parser QA harness with gold-labeled samples
- Exit criteria: 500 statements processed, >90% extraction accuracy

### Weeks 5-8: Scoring Model
- Build feature pipeline and training dataset format
- Train baseline XGBoost model
- Add score calibration and confidence logic
- Exit criteria: AUC >= 0.72, stable inference service

### Weeks 9-12: Dossier Generation
- Define MFI-friendly report schema
- Implement narrative + evidence renderer
- Add PDF generation and retrieval links
- Exit criteria: 3 MFIs approve format for pilot review

### Weeks 13-16: Field Deployment
- End-to-end WhatsApp flow hardening
- Latency and reliability optimization
- Pilot in Gikomba with 50 traders
- Exit criteria: 40/50 traders self-complete

## Hard Problem Controls (MVP-level)

### Signal spoofing
- Detect circular transfer loops by counterparty graph motifs
- Flag abrupt synthetic behavior shifts with time-series checks
- Apply manual review threshold for suspicious profiles

### Consent and trust
- Use SACCO/NGO-branded onboarding templates
- Keep consent language button-based and multilingual
- Provide clear revoke-consent workflow

### Regulatory variability
- Keep Kenya-only policy module in MVP
- Log every decision artifact for external audit

### Cold start
- Produce score confidence floor when sparse data exists
- Route low-confidence profiles to vouching-first workflow

## Build Order for This Repository
1. Add backend persistence (Postgres + migrations)
2. Replace mock trader APIs with statement/transaction APIs
3. Add async job worker for parse/score/dossier tasks
4. Introduce model inference service boundary
5. Add WhatsApp webhook and consent UI states
6. Add dossier viewer and download workflow in dashboard

## Immediate Next Sprint (7 Days)
- Day 1: Finalize data schema and migration scripts
- Day 2: Create statement upload endpoint + storage integration
- Day 3: Implement first-pass parser and parse report
- Day 4: Build feature extraction service
- Day 5: Add scoring endpoint using placeholder model
- Day 6: Generate first dossier PDF template
- Day 7: Integrate dashboard status tracking and QA checks

## Risks to Track Weekly
- Parser accuracy drift by statement format changes
- Label quality and model overfitting risk
- WhatsApp delivery failures and webhook retries
- PII handling and consent audit gaps
- MFI report acceptance delays

## Definition of MVP Done
- Real user can submit M-Pesa history via WhatsApp
- System extracts signals, computes score, and generates dossier
- Field officer can view and download dossier in dashboard
- End-to-end flow completes in <= 90 seconds at P95
- Privacy, consent, and audit requirements are enforced
