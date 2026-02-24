# Admin Dashboard Integration & Contribution Guide

This guide provides a technical overview of the Admin Dashboard and serves as a roadmap for backend integration and future frontend contributions.

## Overview

The Admin Dashboard is built with **Next.js (App Router)** and **Tailwind CSS**. It is designed for high-performance data monitoring and management, following a modular component architecture.

---

## Directory Structure

### 📂 `app/admin/`

Contains the route definitions and page layouts.

- `layout.tsx`: Shared shell with Sidebar, Header, and Auth guards.
- `page.tsx`: **Overview** - Dashboard snapshot with key metrics and charts.
- `users/page.tsx`: **Users List** - Searchable table of all registered users.
- `users/[id]/page.tsx`: **User Details** - Profile info and user-specific transaction history.
- `transactions/page.tsx`: **Transactions List** - Global transaction monitoring.
- `transactions/[id]/page.tsx`: **Transaction Details** - Full breakdown of individual transactions and status actions.

### 📂 `components/admin/`

Contains modular UI components used across the dashboard.

- `overview/`: Charts and stats grids specific to the overview page.
- `users/`: Components for user profiles and demography.
- `shared/`: Generic components like `TransactionsTable` and `UsersTable` used in multiple routes.
- `header.tsx`: Shared top header with dynamic titles and section icons.
- `sidebar.tsx`: Navigation and admin profile management.

---

## Data Integration (Backend Connection)

Currently, the dashboard uses mock data from `lib/utils/mock-data.ts`. To integrate the real backend, follow these steps:

### 1. Data Fetching

Replace mock imports with React `useEffect` or Next.js `fetch` calls. We recommend using a library like **TanStack Query (React Query)** for caching and sync.

### 2. Matching Interfaces

Ensure your API response matches the interfaces defined in `lib/utils/mock-data.ts`:

- `StatCard`: For top-level metrics.
- `Transaction`: For all transaction tables and details.
- `User`: For user lists and profiles.

### 3. Detail Routes

Update `[id]/page.tsx` routes to fetch specific entities based on the URL parameter. The current components are designed to accept these objects as props.

---

## Component Reference

### `TransactionsTable`

**File**: `components/admin/shared/transactions-table.tsx`

- **Props**: `transactions`, `activeFilter`, `onFilterChange`, `hideUser` (boolean).
- **Usage**: Automatically handles empty states and platform-standard status pills.

### `DateRangeFilter`

**File**: `components/admin/date-range-filter.tsx`

- **Function**: Standardized calendar popover for filtering charts and lists by date.

---

## Design System & Rules

To maintain the premium "Chainpaye" aesthetic, strictly follow these rules:

- **Flat Design**: **DO NOT** add shadows (`shadow-sm`, etc.). All cards use `border-[#E3E3E3]`.
- **Colors**:
  - **Primary Blue**: `#003DFF`
  - **Background**: `#F8F9FB`
  - **Text (Header)**: `#111528`
  - **Text (Subtle)**: `#5A5F73` or `#9CA3AF`
- **Shapes**: All main cards and buttons use `rounded-2xl` (1rem). Small pills use `rounded-full`.
- **Typography**: Uses the project's primary font with specific weights (Medium for values, Semibold for headers).

---

## Contribution Workflow

1. **Components First**: Build UI elements in the `components/admin` directory.
2. **Modular Props**: Ensure components are stateless and receive data via props.
3. **No Hardcoded IDs**: Use dynamic routing and props for all entity displays.
