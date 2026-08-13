# 🚚 ZapShift — Parcel Delivery Management System

ZapShift is a full-stack parcel delivery platform built with the MERN stack. It connects senders, riders, and admins in one system — from booking a pickup, to assigning a rider, to real-time delivery tracking, all the way through to payment and payout.

## 🔗 Live Links

- **Live Site:** https://zapshift-app.surge.sh
- **Server API:** https://zap-shift-server-side-three.vercel.app
- **Server Repo:** https://github.com/FahimFaysalNirjhar/zap-shift-server-side

## 🔑 Admin Credentials

Use the following credentials to log in and explore the **Admin Dashboard**:

| Field    | Value               |
| -------- | ------------------- |
| Email    | `admin@example.com` |
| Role     | `admin`             |
| Password | `123456@Qa`         |

> This is a demo account seeded for reviewers/graders to explore admin-only features (rider approval, user management, parcel/rider assignment, platform-wide stats).

## ✨ Key Features

- 🔐 **Role-based access control** — separate dashboards and permissions for `user`, `rider`, and `admin` roles, enforced on both frontend routing and backend middleware.
- 📦 **Parcel booking & management** — users can create, view, and pay for parcel deliveries, with a live cost calculator based on parcel type, weight, and district.
- 💳 **Stripe payment integration** — secure checkout sessions with automatic tracking ID generation and payment history.
- 🛵 **Rider workflow** — admins assign available riders by district; riders accept/reject deliveries and update status through pickup and delivery.
- 📍 **Real-time parcel tracking** — a public tracking page (no login required) shows a full timeline of a parcel's journey from booking to delivery.
- 📊 **Dashboards with data visualization** — admin and user/rider dashboards built with Recharts, showing parcel status breakdowns, rider availability, and earnings.
- 💰 **Automated rider payouts** — delivery payout calculated per parcel based on same-district vs. cross-district delivery.
- 📱 **Fully responsive** — dedicated mobile card layouts alongside desktop tables across all dashboard views.

## 🛠️ Tech Stack

**Frontend**

- React + Vite
- Tailwind CSS + DaisyUI
- TanStack Query (React Query)
- React Router
- Recharts
- SweetAlert2
- React Icons
- Firebase Authentication

**Backend**

- Node.js + Express
- MongoDB (native driver)
- Firebase Admin SDK (token verification)
- Stripe (payments)

**Deployment**

- Frontend: Surge
- Backend: Vercel (serverless)

## 📂 Project Structure (high level)

```
zap-shift-client/     # React frontend
zap-shift-server-side/ # Express + MongoDB backend
```

## 🚀 Getting Started Locally

### Backend

```bash
cd zap-shift-server-side
npm install
# add a .env file with DB_USER, DB_PASSWORD, STRIPE_SECRET, SITE_DOMAIN, FB_SERVICE_KEY
node index.js
```

### Frontend

```bash
cd zap-shift-client
npm install
npm run dev
```

## 👤 Author

**Fahim Faysal**
MERN Stack Developer

- GitHub: [FahimFaysalNirjhar](https://github.com/FahimFaysalNirjhar)
- LinkedIn: [Fahim Faysal](https://www.linkedin.com/in/fahim-faysal-a62b91153/)
