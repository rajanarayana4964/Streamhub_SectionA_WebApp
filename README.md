# Streamhub Section A – Personal Finance Dashboard

## Overview

A small interactive web application built for the Streamhub QA Automation Assessment – Section A.

The application is a **Personal Finance Dashboard** that allows users to view financial summaries, analyze expenses, filter transactions, and add new income or expense transactions.

## Features

### Dashboard
- Total Income
- Total Expenses
- Current Balance
- Savings Rate
- Expense Breakdown chart
- Monthly Income vs Expense chart
- Recent Transactions

### Reports

The Reports view provides interactive filters for:

- Month
- Category
- Transaction Type

It displays filtered income, expenses, balance, transaction count, and transaction details.

### Add Transaction

Users can add a new transaction using:

- Date
- Transaction Type
- Category
- Amount
- Description

The dashboard calculations and charts update based on the added transaction.

## Technology Stack

- React
- TypeScript
- Vite
- Recharts
- CSS
- Playwright
- Node.js / npm

## Project Structure

```text
Streamhub_SectionA_WebApp/
├── public/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── tests/
│   └── dashboard.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

## Run the Application

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application in the browser at the URL shown by Vite.

## Run UI Automation Tests

Run the Playwright test:

```bash
npx playwright test
```

### Test Coverage

The Playwright test verifies that the dashboard:

- Loads successfully
- Displays the dashboard heading
- Displays Total Income
- Displays Total Expenses
- Displays Current Balance
- Displays Savings Rate
- Displays the expected financial summary values

## Assessment Coverage

This project satisfies the Section A requirements:

- ✅ Dashboard / landing view with summarized data
- ✅ Report/detail view driven by user filters
- ✅ Interactive user input form
- ✅ Charts reflecting underlying financial data
- ✅ UI automation using Playwright

## Test Result

Latest Playwright execution:

```text
1 passed
```

## Author

Rajanarayana
