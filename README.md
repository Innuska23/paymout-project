# Payment Form Component

This is a React component for a payment form, which includes card number, expiration date, CVV input, and integrates with a payment API. The component is built using `react-hook-form` for form validation, and `zod` for schema validation.

## Features
- Payment form with card input fields (Card Number, Expiration Date, CVV).
- Integration with `react-hook-form` and `zod` for form validation.
- Apple Pay button as a payment method.
- Tooltip with CVV information.
- Error handling and form submission.
- Processing state while payment is being processed.

## Dependencies
- `react`: React library for building the UI.
- `react-hook-form`: Library for handling form validation.
- `zod`: Schema validation library for the form.
- `@hookform/resolvers`: A library for integrating `zod` with `react-hook-form`.
- `@types/react`: Type definitions for React.

##
![Payment Page](./src/shared//assets/payment.png)

## Installation

To use this component, follow the steps below:

### 1. Install dependencies

```bash
npm install react-hook-form zod @hookform/resolvers react-icons @types/react
