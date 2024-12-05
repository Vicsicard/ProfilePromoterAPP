# User Workflow Plan: Google Business Profile Management Dashboard

This workflow plan outlines the key steps and technical implementation for the Google Business Profile Management Dashboard, using the selected tech stack.

## User Workflow Overview

### Onboarding:
- Users sign up or log in to access the dashboard.
- Introduces features like profile creation, heat maps, and performance analytics.

### Business Profile Creation/Integration:
- For users without an existing GBP, the system guides them through creating a profile and verification.
- For users with an existing GBP, the dashboard retrieves their profile details for management and optimization.

### Heat Map Analysis:
- Users can visualize customer interactions and visibility using heat maps powered by Google Maps JavaScript API.

### Profile Optimization:
- Users receive actionable suggestions to improve their profile, such as adding photos or creating posts.

### Reports and Insights:
- Generate downloadable reports showing key metrics and trends.

## Detailed Workflow Steps

### Step 1: User Onboarding

#### Frontend Workflow:
- Built with Next.js and Material-UI to create a visually appealing and responsive interface.
- Users sign up or log in via Google OAuth using Supabase or Firebase Authentication.

#### Backend Workflow:
- Node.js and Express.js handle user authentication and manage user session data.

#### Database:
- Supabase stores user account information and session details.

#### Flow:
- New users sign up and are greeted with a tutorial of the dashboard.
- Existing users are directed to their dashboard, showing current GBP status and analytics.

### Step 2: Business Profile Creation/Integration

#### Frontend Workflow:

##### Detect Existing Profiles:
- If no GBP is detected, the user sees a prompt: “It looks like you don’t have a Google Business Profile. Let’s create one!”
- A “Start Setup” button leads to a multi-step form.

##### Multi-Step Form for Profile Creation:
- **Step 1: Basic Information:**
  - Collects business name and primary category.
- **Step 2: Address/Service Area:**
  - Allows the user to enter a physical address or service area using the Google Maps JavaScript API for pin placement.
- **Step 3: Contact Information:**
  - Collects phone number, website, and email address.
- **Step 4: Hours of Operation:**
  - Lets users set open/close times for each day.
- **Step 5: Additional Details:**
  - Allows users to add a business description and upload images (e.g., logo, team photos).

##### Submission Confirmation:
- After submission, the user sees a message: “Your business profile details have been submitted. Next, we’ll guide you through the verification process!”

#### Backend Workflow:
- **Node.js with Express.js:**
  - Validates user-submitted data (e.g., required fields, duplicate checks).
  - Processes address data using Google Maps Geocoding API.

- **Profile Creation via GBP API:**
  - Sends the form data to the Google Business Profile API to create a new profile.

```json
{
  "name": "Acme Plumbing Co.",
  "primaryCategory": "Plumbing Service",
  "address": {
    "regionCode": "US",
    "locality": "San Francisco",
    "postalCode": "94110",
    "addressLines": ["123 Main St"]
  },
  "phoneNumbers": [
    { "type": "PRIMARY", "value": "+15551234567" }
  ],
  "websiteUrl": "https://acmeplumbingco.com"
}
```

##### Verification Options:
- Retrieves available verification methods (e.g., phone, email, postcard).
- Saves verification status in Supabase for tracking.

#### Database Workflow:
- **Store Business Data:**
  - Saves user-submitted data and Google API responses for future updates or edits.
- **Track Verification Progress:**
  - Logs the verification status and method, periodically updating via GBP API polling.

##### Post-Submission Verification:
- Prompts users to choose a verification method based on API response:
  - Phone call, email, or postcard.
- Displays the verification status as “Pending Verification” in the dashboard with a progress tracker.

### Step 3: Heat Map Analysis

#### Frontend Workflow:
- Users can view heat maps showing customer interactions and visibility:
  - Powered by the Google Maps JavaScript API using the HeatmapLayer class.
  - Filters for time range and interaction type (e.g., clicks, calls, requests for directions).

#### Backend Workflow:
- Node.js fetches customer interaction data from the Google Business Profile Insights API.
- Turf.js processes geospatial data for heat map rendering.

#### Database Workflow:
- Supabase stores historical interaction data for time-based analysis.

#### Flow:
- Users navigate to the heat map section.
- The backend processes interaction data and overlays it onto the map.
- Users interact with filters to refine their view.

### Step 4: Profile Optimization

#### Frontend Workflow:
- Material-UI displays suggestions such as:
  - “Add photos to your profile.”
  - “Post an update about your services.”
- Chart.js visualizes engagement trends and interaction breakdowns.

#### Backend Workflow:
- Node.js analyzes GBP performance metrics and generates optimization tips.

#### Database Workflow:
- Supabase logs user actions (e.g., adding photos, updating details) to track optimization over time.

### Step 5: Reports and Insights

#### Frontend Workflow:
- Users can generate and download reports in PDF or CSV format.
- Chart.js visualizations show trends, metrics, and heat map overlays.

#### Backend Workflow:
- Node.js compiles data from GBP API and Supabase into user-friendly reports.

#### Database Workflow:
- Supabase stores historical data for generating reports on demand.

#### Flow:
- Users access the “Reports” section.
- Backend fetches data and generates a report.
- Reports are displayed and available for download.

## System Architecture Overview

| Layer      | Technology                                      | Purpose                                                |
|------------|-------------------------------------------------|--------------------------------------------------------|
| Frontend   | Next.js, Material-UI, Google Maps JS API        | User interface, map rendering, heat map display        |
| Backend    | Node.js, Express.js, Google Business Profile API| API integration, data processing                       |
| Database   | Supabase                                        | Store user data, business details, and metrics         |
| Hosting    | Vercel (frontend), GCP (backend)                | Scalable, secure hosting                               |

## In addition:

### Performance Optimization:
- Lazy-load charts, heat maps, and reports to ensure the app feels responsive.
- Use caching for frequently accessed data (e.g., GBP profile details).

### Heat Map Analysis:
- Add a date range selector so users can view heat maps for specific time periods.

### Gamify Optimization:
- Introduce a "Profile Strength Meter" that visually represents how well-optimized a user's profile is (e.g., 85% optimized).
- Suggest steps to reach 100% (e.g., "Add a business description for +10%").

### Real-Time Impact Analysis:
- Show users how specific changes will impact their profile performance. For instance, "Adding a cover photo can increase visibility by X% based on past data."

### Suggestions Prioritization:
- Highlight high-impact suggestions (e.g., "Responding to reviews improves credibility").

### Comparison Metrics:
- Let users compare performance across time periods (e.g., "This month vs. last month").

### Insights Summary:
- Provide a "Quick Insights" section that highlights key metrics (e.g., "Traffic increased by 20% this week").

## Project Description

We are building a Google Business Profile Management Dashboard, an advanced web application that enables business owners to manage, optimize, and analyze their Google Business Profiles (GBP). The platform provides an intuitive interface to:

- Onboard Users: Allow users to create accounts and log in securely using Supabase authentication.
- Create or Integrate GBP: Guide users through creating a new GBP or integrating their existing profiles.
- Visualize Customer Interactions: Display customer engagement using heat maps powered by Google Maps JavaScript API.
- Optimize Profiles: Provide actionable suggestions to enhance profile visibility and performance.
- Generate Reports: Allow users to view, download, and analyze engagement trends with charts, PDFs, and CSV exports.

## Advice for the IDE AI

### Structure the Development Workflow:
- Tackle each step incrementally: Onboarding → Profile Creation → Heat Maps → Optimization → Reports.
- Use the provided modular architecture to isolate components for better testing and debugging.

### Prioritize Reusability:
- Create reusable components for UI elements (e.g., forms, buttons, charts) using Material-UI.
- Centralize API calls in helper functions or services to avoid redundancy.

### Use Version Control Effectively:
- Commit frequently and use clear commit messages for each feature or fix.
- Use branching for isolated development of features like heat maps or reports.

### Implement Proper Error Handling:
- Ensure meaningful error messages are returned and displayed to users (e.g., failed API calls).
- Log errors on the backend for easier debugging.

### Secure API Integrations:
- Store sensitive credentials (e.g., Google API keys) in environment variables.
- Implement rate limiting and validation to prevent abuse of backend endpoints.

### Test Thoroughly:
- Test each feature independently using tools like Postman (for APIs) and Cypress (for end-to-end tests).
- Simulate various user scenarios to ensure reliability (e.g., incomplete profile submissions).

### Focus on Scalability:
- Use Supabase to store user data and engagement trends for future scalability.
- Optimize database queries and API interactions to handle increasing data loads.

## Key Reminders

- Start Simple: Begin with the foundational steps (user onboarding and GBP creation) before adding complex features like heat maps or reports.
- Iterate Quickly: Build and test small, functional modules before combining them.
- User Experience Matters: Keep the interface intuitive and responsive for business owners who may not be tech-savvy.
