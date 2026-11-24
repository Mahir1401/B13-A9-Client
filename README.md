# PetNest — Paws & Homes

**Find Your Furry Friend a Forever Home**

## Live URL
🔗 [https://b13-a9-one.vercel.app](https://b13-a9-one.vercel.app)

## Purpose
**PetNest** is a full-stack Pet Adoption Platform built to connect loving homes with rescued companions (dogs, cats, birds, rabbits, and more). Every adoption gives a pet a second chance at a warm, happy life—allowing adopters to browse vetted, health-checked pets and submit adoption requests, while empowering pet owners and shelters to manage listings and review adoption applications securely.

## Key Features
* **Curated Home Experience & Dynamic Showcase:** Features a hero section, a dynamic **Pets Available for Adoption** section displaying real-time health, vaccination, and adoption status (`Available` / `Adopted`), plus rich static guides including *Why Adopt*, *How It Works*, *Success Stories*, *Pet Care Tips*, and *Join the Community*.
* **Advanced Pet Browsing & Search:** Explore all available pets with real-time search by pet name (`$regex`) and species filtering (`$in`), alongside interactive sliders powered by Swiper.
* **Secure Authentication & Session Persistence:** Built with **Better Auth** and MongoDB (`@better-auth/mongo-adapter`) supporting Email/Password registration (with strict password validation) and Google Login, using HTTPOnly cookies so private routes persist seamlessly on page reload.
* **End-to-End Adoption Workflow:** Authenticated users can submit adoption requests with pickup dates and custom messages, track status updates (`Pending`, `Approved`, `Rejected`), and cancel pending requests from their dashboard.
* **Pet Owner Dashboard & Listing Management:** Pet owners can add new pet listings, track listing statistics (Total, Available, Adopted), update pet details, and delete listings with confirmation modals.
* **Smart Adoption Request Control:** Owners can review incoming requests in a dedicated modal to approve or reject applicants; approving a request automatically marks the pet as `Adopted` and prevents further requests.
* **Dark/Light Theme Toggle & Framer Motion Animations:** Includes a responsive Dark/Light mode switcher, fluid UI animations powered by **Motion**, custom 404/loading states, and **React Hot Toast** notifications (zero default browser `alert()` popups).

## NPM Packages Used

### Dependencies
* `next` (v16.4.6) & `react` / `react-dom` (v19.3.0) – Core full-stack React framework
* `better-auth` & `@better-auth/mongo-adapter` – Authentication, Google OAuth, and HTTPOnly cookie session management
* `mongodb` – Official MongoDB driver for database operations
* `@heroui/react` & `@heroui/styles` – Modern UI component library with theme support
* `motion` – Framer Motion animations and smooth transitions
* `react-hot-toast` – Clean toast notifications
* `lucide-react` – Crisp UI icons

### DevDependencies
* `tailwindcss` & `@tailwindcss/turbopack` – Utility-first CSS styling
* `babel-plugin-react-compiler` – Automatic React optimization
* `eslint` & `eslint-config-next` – Code quality and linting

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd B13-A9-Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add your database, authentication, and API keys (e.g., `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, Google OAuth credentials, and backend API URL).

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
