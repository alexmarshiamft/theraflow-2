# Theraflow

**All-in-One EHR, Banking, Payroll & Tax Software for Healthcare Practices**

Theraflow is a HIPAA-compliant platform that unifies Electronic Health Records, practice banking, payroll management, and tax preparation into a single, seamless workflow.

## Features

- 🏥 **EHR Module** — Patient records, appointments, clinical notes
- 🏦 **Banking Module** — Account overview, transactions, ACH transfers
- 💼 **Payroll Module** — Employee management, payroll runs, pay stubs
- 📋 **Tax Module** — Tax preparation, quarterly filings, document vault
- 🔒 **HIPAA Compliant** — End-to-end encryption, audit logs, role-based access

## Tech Stack

- [Next.js 15](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) icons

## Getting Started

```bash
npm install
npm run dev
```

### Environment Variables

To run the application with the Amazon Chime telehealth integration, you must add your AWS credentials to a `.env.local` file in the root directory:

```env
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## License

Proprietary — All rights reserved.
