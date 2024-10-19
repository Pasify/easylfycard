# Easylyf Shopping Card: Paystack Direct Debit Integration

This project integrates Paystack's direct debit API into a React application, using serverless functions on Vercel to handle secure transactions. It allows users to initialize payments via direct debit for shopping, with backend functionality secured through environment variables.

## Table of Contents

- [Easylyf Shopping Card: Paystack Direct Debit Integration](#easylyf-shopping-card-paystack-direct-debit-integration)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Environment Variables](#environment-variables)
    - [License](#license)

## Project Overview

The **Easylyf Shopping Card** project is designed to offer a seamless payment experience using Paystack's direct debit service. Users can securely initiate payments via direct debit, and the backend functionality is powered by serverless functions hosted on Vercel.

## Features

- **Paystack Integration**: Handles direct debit payments using Paystack's API.
- **React Frontend**: Interactive UI built with React and Vite.
- **Serverless Backend**: Vercel serverless functions handle secure transactions.
- **Environment Variables**: Keys and sensitive data are securely stored using environment variables.

## Technologies

- **Frontend**: React, Vite
- **Backend**: Node.js, Vercel Serverless Functions
- **Payment Gateway**: Paystack API
- **HTTP Client**: Axios
- **Environment Management**: Vercel Environment Variables

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v12 or higher)
- [Vercel CLI](https://vercel.com/docs/cli) (Optional, for local development)
- Paystack Account (for API keys)

### Environment Variables

Before running the project, create an `.env` file in your project root and add the following environment variables:

```plaintext
VITE_PAYSTACK_PUBLIC_KEY=your_public_key_here
PAYSTACK_SECRET_KEY=your_secret_key_here
```

### License

This project is licensed under the MIT License.
