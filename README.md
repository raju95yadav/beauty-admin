# 📊 Glam Beauty - Admin Management Console

> Centralized Administrative Portal for Real-Time Inventory Control, Catalog Publishing, and Order Fulfillment Operations.  
> Direct administrative cockpit orchestrating data and operations across the ecosystem:
> - 💄 **Customer Storefront**: [beauty-glam](https://github.com/raju95yadav/beauty-glam)
> - ⚙️ **Core Backend Service**: [beauty-back](https://github.com/raju95yadav/beauty-back)

---

## 📋 Table of Contents

1. [🌟 Project Overview](#-project-overview)
2. [🏗️ Core Architecture & Technology Roles](#️-core-architecture--technology-roles)
3. [🛠️ Environment Setup Documentation](#️-environment-setup-documentation)
4. [🚀 Installation & Deployment Guide](#-installation--deployment-guide)
5. [🔐 Administrative Access & Security Flow](#-administrative-access--security-flow)
6. [📡 Admin API Consumer Reference](#-admin-api-consumer-reference)
7. [🧪 Testing & Verification](#-testing--verification)
8. [💻 Live Demonstration Guide](#-live-demonstration-guide)
9. [🎓 Academic & Project Information](#-academic--project-information)

---

## 🌟 Project Overview

**Glam Beauty Admin Console** (`beauty-admin`) is a specialized, high-security enterprise single-page application engineered for beauty e-commerce operations managers, catalog merchandisers, and warehouse fulfillment coordinators. Designed with React 18, Vite 5, and Tailwind CSS, the console gives administrators deep operational observability and real-time execution capabilities across the entire Glam Beauty platform.

The console provides instantaneous catalog publishing with multi-part Cloudinary image upload streaming, real-time inventory adjustments, multi-stage order dispatch lifecycle tracking (from warehouse bay allocation to courier handover), and executive analytics visualizations powered by Recharts.

### Core Objectives

- **📈 Real-Time Executive Telemetry**: Instant aggregation of monthly gross revenues, order quantities, customer acquisitions, category distribution pie charts, and sales velocity area charts.
- **💄 Product Management Studio**: Fluid multi-attribute cosmetic product publishing, real-time inventory thresholds, inline price tier adjustments, and instant image preview pipelines.
- **🚚 End-to-End Fulfillment Board**: Interactive dispatch table enabling single-click order stage transitions (`Processing` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`) with automated tracking logs and courier partner metadata.
- **⚠️ Proactive Inventory Safeguards**: Real-time identification of low-stock (`stock <= 5`) and out-of-stock SKUs, coupled with quick-restock modal dialogs to prevent supply interruptions.
- **🛡️ Rigid RBAC & Client Hardening**: JWT signature decode audits on route entry, automated session timeouts, and automatic eviction upon encountering unauthorized `401/403` API responses.

---

## 🏗️ Core Architecture & Technology Roles

The client architecture follows a modular layout separating view controllers, reusable data visualization widgets, theme state providers, and centralized API interceptors:

```
src/
├── components/          # Reusable UI widgets, layout drawers, and route guards
│   ├── Layout.jsx       # Persistent administrative sidebar, header, and breadcrumbs
│   ├── ProtectedRoute.jsx # Client-side JWT role decoding & expiry validation guard
│   └── ui/              # Modal dialogs, action buttons, table wrappers, loaders
├── context/             # ThemeContext (Persistent Dark/Light Mode state manager)
├── pages/               # Primary administrative views
│   ├── Dashboard.jsx    # Metric KPI cards, revenue charts, and quick-restock modals
│   ├── AddProduct.jsx   # Multi-part product creation studio with image drag-and-drop
│   ├── ManageProducts.jsx # Inventory data grid with inline filters, edits, and deletions
│   ├── Orders.jsx       # Fulfillment board with timeline updates and status mutators
│   ├── Users.jsx        # Customer registry with administrative deletion capabilities
│   ├── Settings.jsx     # Admin credential updates and system parameters
│   └── Login.jsx        # Privileged credential login screen with password reveal
└── services/            # Axios instance configured with JWT injection & 401 interceptors
```

### Technology Matrix & Core Roles

| Technology / Library | Version | Core Architectural Role |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Core view library facilitating declarative component rendering, custom hooks, and state lifecycles. |
| **Vite** | `^5.4.1` | Optimized build engine providing lightning-fast HMR and production rollups. |
| **Tailwind CSS** | `^3.4.11` | Utility-first CSS styling engine configured with dark mode class switching and custom brand aesthetics. |
| **Recharts** | `^3.8.0` | Composable SVG charting library rendering responsive revenue AreaCharts and category PieCharts. |
| **React Router DOM** | `^6.26.2` | SPA routing orchestrating authenticated nested layouts, parameters, and route guards. |
| **Axios** | `^1.7.7` | HTTP client with automatic Bearer token injection and global 401 error rejection interceptors. |
| **jwt-decode** | `^4.0.0` | Client-side JWT inspection decoding token claims, role verification, and epoch expiry checks. |
| **Framer Motion** | `^11.5.4` | Animation framework orchestrating modal transitions, slide-over panels, and toast alerts. |
| **React CountUp** | `^6.5.3` | Smooth numerical count-up easing for financial and quantity metric cards on initial mount. |
| **Lucide React** | `^0.441.0` | Clean, accessible vector icon toolkit tailored for administrative interfaces. |

---

## 🛠️ Environment Setup Documentation

### Prerequisites

Ensure your system meets the baseline operational criteria:

- **Operating System**: Windows 10/11, macOS Monterey+, or Linux (Ubuntu 20.04+ LTS)
- **Node.js**: `v18.18.0` or higher (`v20.x` or `v22.x` LTS recommended)
- **Package Manager**: `npm` (`v9.x` or higher)
- **RAM / CPU Recommendations**: Minimum 4 GB RAM (8 GB recommended for simultaneous client/backend dev environments)
- **Active Backend Service**: A reachable instance of `beauty-back` (`http://localhost:5000` or deployed API URL)

### Environment Variables

Configure `.env` in the root of `beauty-admin`:

| Variable Name | Required | Sample Value | Purpose |
| :--- | :---: | :--- | :--- |
| `VITE_API_URL` | **Yes** | `http://localhost:5000/api` | Base REST endpoint for the backend API (`beauty-back`). |

### Environment Verification Commands

Confirm your environment before initializing the server:

```bash
# Verify Node runtime
node --version
# Expected: v18.18.0+

# Verify NPM toolchain
npm --version
# Expected: 9.x+

# Test connectivity to backend service
curl -I http://localhost:5000/api/admin/stats
```

---

## 🚀 Installation & Deployment Guide

Follow these steps to configure, link, and launch the admin console:

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/raju95yadav/beauty-admin.git

# Navigate into the project folder
cd beauty-admin
```

### Step 2: Install Node Dependencies

```bash
# Perform clean installation of dependencies
npm install
```

### Step 3: Link Backend API Endpoint

Create or verify `.env` in the project root:

```bash
# Create .env file
echo 'VITE_API_URL="http://localhost:5000/api"' > .env
```

*(For production staging or cloud deployments, point `VITE_API_URL` to your production API URL, e.g., `https://beauty-back-vert.vercel.app/api`).*

### Step 4: Start the Vite Development Server

```bash
# Launch development server
npm run dev
```

The portal will initialize at `http://localhost:5174` (or `http://localhost:5173`). Open the browser to view the privileged login interface.

### Step 5: Production Build & Deployment

```bash
# Type-check and build optimized static assets
npm run build

# Preview build locally
npm run preview
```

Static routing rewrites are pre-configured in `vercel.json` to support SPA direct URL deep-linking:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🔐 Administrative Access & Security Flow

The admin portal strictly limits console entry to authenticated administrators using cryptographic token claims and route-level guards.

### Architecture & Access Sequence Diagram

```
[ Admin User ]            [ beauty-admin: Client ]        [ ProtectedRoute ]        [ beauty-back: API ]
      │                              │                            │                           │
      │ 1. Submit Credentials        │                            │                           │
      │    (admin@gmail.com)         │                            │                           │
      │─────────────────────────────>│-- POST /api/auth/admin-login ------------------------->│
      │                              │                                                        │-- Verify Password (bcrypt)
      │                              │                                                        │-- Assert role === 'admin'
      │                              │<-- 200 OK { token, role: 'admin', user } --------------│
      │                              │                            │                           │
      │                              │-- Store in localStorage    │                           │
      │                              │   (token, role)            │                           │
      │                              │                            │                           │
      │ 2. Navigate /dashboard       │                            │                           │
      │─────────────────────────────>│───────────────────────────>│                           │
      │                              │                            │-- Check token & role      │
      │                              │                            │-- Decode jwtDecode(token) │
      │                              │                            │-- Verify exp > Date.now() │
      │                              │<-- Render <Outlet /> ──────┤                           │
      │                              │                            │                           │
      │ 3. Mutate (e.g. Add Product) │                            │                           │
      │─────────────────────────────>│-- Attach Bearer Token ─────────────────────────────────>│
      │                              │   POST /api/products       │                           │-- [authMiddleware.protect]
      │                              │                            │                           │-- [authMiddleware.admin]
      │                              │<-- 201 Created (Success) ──────────────────────────────│
      │                              │                            │                           │
      │ 4. Token Expired / Non-Admin │                            │                           │
      │                              │<-- 401 / 403 Response ─────────────────────────────────│
      │                              │-- Purge Local Storage      │                           │
      │                              │-- Hard Redirect /login ───>│                           │
```

### Administrative Security Guardrails

1. **Synchronous Token Ingestion**: `src/App.jsx` inspects redirect URL queries for SSO administrative tokens prior to initial React render, ensuring seamless authorization handshakes.
2. **Client-Side Claim Validation (`ProtectedRoute.jsx`)**: Every navigation to protected routes (`/dashboard`, `/add-product`, `/manage-products`, `/orders`, `/users`, `/settings`) parses the JWT token with `jwt-decode`. If the token is missing, expired (`exp < Date.now() / 1000`), or `role !== 'admin'`, storage is flushed and the client is redirected to `/login`.
3. **Axios Token Interception (`src/services/api.js`)**: All outgoing network calls automatically attach `Authorization: Bearer <token>`.
4. **Automated Session Expulsion**: Upon receiving a `401 Unauthorized` status from any non-login endpoint, the client wipes stored credentials and redirects immediately to `/login`.

---

## 📡 Admin API Consumer Reference

The administration console consumes and mutates data across these core endpoints:

### 1. Administrative Analytics & Telemetry

| Endpoint | Method | Purpose | Response Payload Key Highlights |
| :--- | :---: | :--- | :--- |
| `/admin/stats` | `GET` | Aggregate executive metrics | Total revenue, monthly sales array, category breakdown, user count, low stock counts. |
| `/admin/inventory/alerts` | `GET` | Out-of-stock and low-stock SKUs | Array of products with `stock <= 5`, sorted ascending by quantity. |

### 2. Catalog & Inventory Operations

| Endpoint | Method | Content-Type | Parameters / Body | Purpose |
| :--- | :---: | :--- | :--- | :--- |
| `/products` | `GET` | `application/json` | `?limit=200` | Fetch catalog inventory items for administrative grid. |
| `/products` | `POST` | `multipart/form-data` | `FormData(name, brand, price, stock, category, images)` | Stream new product metadata and imagery directly to Cloudinary. |
| `/products/:id` | `PUT` | `multipart/form-data` | `FormData(...)` | Update pricing, category taxonomy, or image assets for existing SKU. |
| `/products/:id` | `DELETE`| `application/json` | Route param `:id` | Permanently remove product from inventory. |

### 3. Order Fulfillment & Status Lifecycle

| Endpoint | Method | Request Payload | Action / Result |
| :--- | :---: | :--- | :--- |
| `/admin/orders` | `GET` | None | Retrieves all orders across all customers with populated shipping and buyer info. |
| `/admin/order/:id/status` | `PUT` | `{"status": "Shipped"}` | Transitions order stage, appends location tracking log, and notifies customer. |
| `/admin/order/:id` | `DELETE`| None | Deletes order record from database. |

### 4. User Directory & Security

| Endpoint | Method | Request Payload | Action / Result |
| :--- | :---: | :--- | :--- |
| `/admin/users` | `GET` | None | Retrieves customer user roster with order histories and contact profiles. |
| `/admin/user/:id` | `DELETE`| None | Removes customer account from system. |
| `/auth/update-admin-password`| `PUT` | `{"oldPassword": "...", "newPassword": "..."}` | Updates administrative credentials. |

---

## 🧪 Testing & Verification

### Code Quality & Static Analysis

```bash
# Execute ESLint to audit syntax and React Hooks conventions
npm run lint

# Validate production build rollup
npm run build
```

### Component Assertion & Functional Test Checklist

| Functional Area | Test Scenario | Verified Behavior | Status |
| :--- | :--- | :--- | :---: |
| **Auth Guard** | Access `/dashboard` without token | Intercepted by `ProtectedRoute`; redirected to `/login`. | ✅ |
| **Auth Guard** | Simulate expired JWT token | `jwtDecode` detects `exp` in the past; clears storage; redirects to `/login`. | ✅ |
| **Dashboard** | Revenue KPI & Sales AreaChart | Numerical count-up animates; monthly sales SVG chart renders points. | ✅ |
| **Catalog** | Create Product with Image Upload | Multi-part form posts to API; image streams to Cloudinary; toast notifies success. | ✅ |
| **Catalog** | Filter by Low Stock (`<=5`) | Data table filters to only show products requiring urgent restock. | ✅ |
| **Fulfillment**| Advance Status (`Processing` ➔ `Shipped`) | Order status pill updates immediately; backend status log timestamps event. | ✅ |
| **Theme** | Toggle Dark / Light Mode | Document root toggles `dark` class; charts and table themes swap instantly. | ✅ |

---

## 💻 Live Demonstration Guide

Follow this step-by-step walkthrough to verify administrative capabilities:

```
[ 1. Admin Login ] ──> [ 2. Dashboard KPIs ] ──> [ 3. Add New Cosmetic ]
                                                        │
[ 6. Theme Switching ] <── [ 5. Advance Shipment ] <── [ 4. Inventory Grid ]
```

### 1. Privileged Administrator Login (`/login`)
- Navigate to `http://localhost:5174/login`.
- Click the **"✨ Auto-Fill Admin"** quick-fill helper or enter credentials (`admin@gmail.com`).
- Input administrative password and click **Sign In**. Upon success, receive a greeting toast and route to `/dashboard`.

### 2. Executive Telemetry Overview (`/dashboard`)
- Review primary KPI metric tiles: Total Revenue, Total Orders, Active Users, and Low-Stock count.
- Inspect the interactive **Revenue Overview AreaChart** (monthly revenue trends) and **Category Distribution PieChart**.
- In the "Low Stock Alert" card, click **"Quick Restock"** on any item to increment inventory by 25 units instantly.

### 3. Product Catalog Publishing (`/add-product`)
- Select **"Add Product"** from the sidebar navigation.
- Enter product title (e.g., `Velvet Rose Hydrating Mist`), set Price (`₹499`), Category (`Skin Care`), and initial Stock (`50`).
- Drag-and-drop a product image into the upload dropzone to preview the image asset.
- Click **"List Product"**. The asset streams directly to Cloudinary and the SKU appears across the storefront.

### 4. Inventory Management Studio (`/manage-products`)
- Search by keyword or apply the **"Low Stock"** filter to view SKUs nearing zero inventory.
- Click **Edit** to modify stock quantities inline or click **Delete** to trigger the confirmation modal.

### 5. Order Fulfillment & Dispatch (`/orders`)
- Navigate to the **Orders** board to view live customer transactions.
- Expand an order to review shipping address, contact phone, and purchased line items.
- Change the status dropdown from `Processing` to `Shipped`. The order tracking timeline updates in real-time on the customer storefront.

### 6. Interface Customization (`ThemeContext`)
- Click the Sun/Moon toggle in the sidebar to toggle between sleek Dark Mode and clean Light Mode.

---

## 🎓 Academic & Project Information

| Parameter | Specification |
| :--- | :--- |
| **Project Name** | Glam Beauty - Admin Management Console |
| **Repository Name** | `beauty-admin` |
| **Lead Developer** | Raju Yadav ([@raju95yadav](https://github.com/raju95yadav)) |
| **Architecture Pattern** | Single-Page Application (SPA) with Protected Administrative Routes |
| **Target Audience** | E-Commerce Operations, Merchandising, Logistics Dispatchers |
| **License** | MIT License |

### Associated Ecosystem Repositories

| Repository | Role | Technology Stack | Repository Link |
| :--- | :--- | :--- | :--- |
| **beauty-admin** | Administrative Portal & Inventory Ops | React 18, Vite 5, Tailwind CSS, Recharts | [GitHub Repo](https://github.com/raju95yadav/beauty-admin) |
| **beauty-glam** | Customer E-Commerce Storefront | React 19, Vite, Tailwind CSS, Lucide React | [GitHub Repo](https://github.com/raju95yadav/beauty-glam) |
| **beauty-back** | Core REST API, Auth & Business Logic | Node.js, Express 5, MongoDB, Mongoose, JWT | [GitHub Repo](https://github.com/raju95yadav/beauty-back) |

---

<div align="center">
  <sub>Built for mission-critical operations by the Glam Beauty Engineering Team.</sub>
</div>
