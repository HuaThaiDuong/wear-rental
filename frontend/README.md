# RentWear frontend

React 18 + Vite interface for the clothing rental management project.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` to the backend API root when it differs from
`http://localhost:8080/api` (see `.env.example`). The category filter loads
`GET /api/categories` when the backend is available and falls back to sample
categories when it is offline.

## Current screens

- Customer catalog with search, category, size, occasion, price and rental-date filters.
- Item details, rental date selection, sample QR payment state and order history.
- Demo login/registration and editable customer profile.
- Staff order processing, item condition controls, and add/edit inventory form.
- Admin overview, demo role assignment, and category management controls.

## Demo limits / backend work still needed

Product, order and user data currently live in React state and reset on refresh.
The login form only switches demo roles; it does not authenticate users or secure
routes. The QR panel is a visual placeholder and does not initiate a payment.
The late fee uses a simple demo rate of 50,000 VND per overdue day. Real date
availability, deposit settlement, damage charges, role permissions, analytics,
and customer profile updates require corresponding backend APIs and validation.
The current backend exposes health, stores and categories; it does not yet expose
products, authentication, rentals or payments.
