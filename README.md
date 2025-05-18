# WorkFlow-Builder-App

A React-based workflow builder application that allows users to create, configure, and manage workflow triggers and actions. The application features a contact status management, and execution logs.

## Features

- Contact status and event management
- Date range filtering for execution logs
- Contact assignment with percentage distribution
- Real-time workflow state management
- Modern and responsive UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd workflow-builder-app
```

2. Install dependencies:

```bash
npm install
```

This will install all required packages including:

- React and TypeScript
- Tailwind CSS and its dependencies
- Headless UI & Heroicons
- Redux Toolkit and React Redux
- React Flow
- React DatePicker

## Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to:

```
http://localhost:5173
```

## Project Structure

```
workflow-builder-app/
├── src/
│   ├── components/           # React components
│   │   ├── common/          # Reusable UI components
│   │   └── ...             # Feature-specific components
│   │
│   ├── redux/
│   │   ├── features/       # Redux slices and reducers
│   │   └── store.ts        # Redux store configuration
│   │
│   ├── services/
│   │   └── constants/      # Application constants
│   │
│   ├── data/               # Static and mock data
│   └── App.tsx            # Root component
├── public/                 # Static assets
└── package.json           # Project dependencies
```

## Usage Instructions

1. **Creating a Workflow**

   - Click "Select a trigger" to start building a workflow
   - Choose "Contact created" as the trigger type
   - Configure trigger settings (description, events, contact status)
   - Click "Save" to create the trigger

2. **Managing Contact Status**

   - Use the contact status dropdown to select/unselect statuses
   - Multiple events can be selected for a single trigger
   - Contact status changes are reflected in real-time and status can only be one at a time

3. **Execution Logs**

   - View workflow execution history
   - Filter logs by date range, status, and contacts
   - Use the refresh button to reset all filters

4. **Contact Assignment**
   - Configure contact assignment rules
   - Set distribution percentages for users
   - Choose between equal or manual distribution

## Assumptions and Design Decisions

1. **State Management**

   - Redux is used for global state management
   - Local state is used for UI-specific components
   - Workflow configurations are persisted in Redux store

2. **User Interface**

   - Responsive design
   - Consistent styling using Tailwind CSS
   - Modular component architecture

3. **Data Flow**

   - Unidirectional data flow using Redux
   - Real-time updates for workflow configurations
   - Optimistic updates for better user experience

4. **Assumptions**
   - The User can create 1 trigger and as many actions
   - The Save button on Header Tab is enabled when user creates a trigger and atleast 1 action
   - The initial state of workflow status is Draft and user can change it to Live on clicking the toggle mode
   - The data in Execution Logs is being shown from users[] in workflow.json
