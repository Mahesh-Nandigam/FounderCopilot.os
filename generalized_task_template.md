# Generalized In-Depth Hackathon Task Template

> [!CAUTION]
> **TOP WARNING FOR TASK.MD CREATION:** When the Hackathon starts, you must use this template to generate `task.md`. You must EXPLODE **ALL PHASES** (from Environment Setup to Post-Deployment) into **100+ hyper-specific, meaningful feature tasks**. 
> - **ALL MEANS ALL:** Do not skip expanding any phase. Every single phase must be broken down to its most microscopic, meaningful level. 
> - If you generate fewer than 90-100 tasks, you have failed.
> 
> **CRITICAL DEFINITION OF A TASK:**

> - A task is a **meaningful feature or component** (e.g., *Task 23: Build Animated Sidebar*, *Task 45: Implement Toast Notifications*). 
> - A task is **NOT** an atomic coding action (e.g., do not make *Task 12: Write a git commit* or *Task 13: Add a CSS class*). 
> - **UI/Animations & Sound:** Every single UI task (Landing Page, Login, Sign Up, Dashboard) must explicitly dictate the animations and sounds to be used. The animations must be meaningful and tailored to the problem statement (e.g., *Task 23: Create Landing Page with a train animation moving across the screen*, or *Task 25: Login page with flip animations and a success sound on submit*)
> - **Core Functionality Scale:** The core application must be expansive. Plan to build **7 to 8 multi-layer pages** for the core functionality, depending on the problem statement.
> 
> You must ensure that **every single "Must-Have" feature listed below is integrated** into those 90-100 feature tasks appropriately.



## Phase 1: Environment, Git & Foundation Setup
- [ ] **Git Setup:** Clone the empty remote GitHub repository (which was already created in Workflow Step 2) into our local folder, scaffold the Next.js frontend inside it, and push the first commit to the remote.
- [ ] Scaffold the frontend using Vite + React (or Next.js).
- [ ] Set up the Global Design System (Vanilla CSS / Tailwind, color variables, typography).
- [ ] Implement **Dark Mode / Light Mode** toggle foundation.
- [ ] Set up React Router for page navigation.
- [ ] Set up global state management (Context API or Zustand).
- [ ] Scaffold the backend (Node.js/Express or Python/FastAPI) and test the health endpoint.
- [ ] Initialize the database and connect it to the backend (e.g., Firebase Config).
- [ ] **Modal AI Setup (Master Action):** The Agent MUST open and strictly follow the instructions inside `modal_reference.md`. The Agent will run the exact installation commands listed there, then pause and instruct the Master to click "Authorize" in their browser. **DO NOT ask for a token.** Once the Master clicks authorize, the terminal will automatically detect it. The Agent will then run the test script from that file to verify the cloud connection.

## Phase 2: Authentication & Onboarding
- [ ] **Landing Page:** Build a beautiful Hero Section with premium animations.
- [ ] **Sign Up Page:** Create the registration form. MUST include "Continue with Google", "Continue with GitHub", "Continue with LinkedIn", and standard Email/Password. Needs rich animations and satisfying sound effects for buttons.
- [ ] **Login Page:** Create the login form. MUST include "Continue with Google", "Continue with GitHub", "Continue with LinkedIn", and standard Email/Password. Needs rich animations and satisfying sound effects for buttons.
- [ ] **Auth Logic:** Connect to Database Auth (Supabase).
- [ ] **User Onboarding Tour:** Implement a step-by-step tutorial for first-time users.
- [ ] **Routing:** Create Protected Routes that redirect unauthorized users.
- [ ] **Initial Live Deployment:** Connect the GitHub repository to Vercel and deploy the first live version of the app. From here on, all future pushes will automatically update the live link.

## Phase 3: Core Application Infrastructure & Layout
- [ ] **Dashboard Layout:** Build the main application Layout with Header and Main Content.
- [ ] **Animated Sidebar:** Create a responsive, collapsible animated sidebar.
- [ ] **Responsiveness:** Ensure 100% mobile and desktop responsive design.
- [ ] **Breadcrumb Navigation:** Add breadcrumbs for easy navigation.
- [ ] **Profile Page:** Build a user profile page with **User Avatars**.
- [ ] **Settings Page:** Build a basic settings page for user preferences.

## Phase 4: Core Project Functionality (Problem Specific)
- [ ] *[Placeholder: Feature 1 Database/API setup]*
- [ ] *[Placeholder: Feature 1 UI integration]*
- [ ] *[Placeholder: Feature 2 Database/API setup]*
- [ ] *[Placeholder: Feature 2 UI integration]*
- [ ] **Backend Deployment:** Use the Cloud Run MCP to deploy the completed, locally-tested backend API to Google Cloud.
- [ ] **Frontend-Backend Connection (Master Action):** The Agent will pause and explicitly ask the Master: *"Master, the backend is successfully deployed on Cloud Run. Here is your permanent API URL. Please go to Vercel -> Environment Variables, and paste this URL so the frontend and backend are permanently connected."*

## Phase 5: The "Must-Have" Premium Features
- [ ] **Internationalization (i18n):** Multi-language toggle (English, Hindi, Telugu).
- [ ] **Sound Design:** Subtle, satisfying audio feedback (clicks/swooshes) on important interactions.
- [ ] **Export/Reporting:** One-click "Export to PDF/CSV" for data tables.
- [ ] **PWA (Progressive Web App):** Make the web app installable on mobile home screens.
- [ ] **Magic AI Auto-Fill:** A "Magic Wand" button next to forms that uses Groq to instantly generate or auto-fill data.
- [ ] **Offline Mode (Optimistic UI):** Allow users to continue working without WiFi, syncing silently when the connection returns.
- [ ] **Dynamic QR Codes & Scanner:** Generate branded QR codes for records and include an in-app camera scanner.
- [ ] **Interactive 3D UI:** Embed a lightweight, cursor-tracking 3D element on the landing page for visual impact.
- [ ] **Search & Filters:** Implement robust global search and data filters.
- [ ] **Command Palette:** Implement a global command palette (keyboard shortcuts via Cmd+K).
- [ ] **Pagination or Infinite Scrolling:** Add for large data lists.
- [ ] **Empty States:** Design beautiful empty states for when there is no data.
- [ ] **Loading States:** Implement skeleton loaders for all API fetching.
- [ ] **Toast Notifications:** Add success/error popups for user actions.
- [ ] **Notifications Center:** A dropdown for recent alerts.
- [ ] **Recent Activity:** A feed showing the user's latest actions.
- [ ] **Auto-save:** Implement auto-save functionality for forms/data entry.
- [ ] **Beautiful Charts:** Integrate a charting library for data visualization.
- [ ] **Drag and Drop:** Add drag-and-drop interactions where applicable.
- [ ] **Floating Action Button (FAB):** For quick actions on mobile.
- [ ] **Real-time Updates:** Use WebSockets or Firebase for live data sync.

## Phase 6: The "Wow" Factor – Universal AI Chatbot
- [ ] **Chatbot - UI:** Build a floating chat interface (toggle button, message window).
- [ ] **Chatbot - API:** Integrate **Groq API** (for lightning-fast, intelligent text responses).
- [ ] **Chatbot - Action/Function Calling:** Implement AI Tool Use. The chatbot must be able to trigger app functions (e.g., if the user says "Add a task," the AI parses it and triggers the app's internal `addTask()` function).
- [ ] **Chatbot - Voice:** Implement Web Speech API for Speech-to-Text and Text-to-Speech.

## Phase 7: Pre-Submission Verification
- [ ] **Agent Verification:** Verify all routes, auth flows, animations, and core features are functioning perfectly on the LIVE link.
- [ ] **Master Verification (Final Check):** Explicitly ask the Master: *"Are you fully satisfied with the live URL? Is there anything you want to tweak before we submit this to the judges?"*
- [ ] **GitHub Polish:** Ensure the `README.md` is clean, professional, and ready for judges to read.

## Phase 8: Post-Deployment Iteration (Safe Mode)
- [ ] **Post-Deployment Confirmation:** Ask the Master: *"We have deployed the stable link. We still have time. Shall we enhance the app further without breaking the live link?"*
- [ ] **Safe Iteration:** Any further enhancements (adding more wow factors, refining UI) must be done locally or on a separate branch. We will NEVER push unstable code to the deployed branch so the Master always has a working live link to show judges.
