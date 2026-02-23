# DMless Interview AI

A **mock interview web app** to help students practice and evaluate their technical and HR interview skills. Built with **React**, **Tailwind CSS**, and **Chart.js**, fully deployed on **Vercel**.

---

## Features

- **User Authentication:** Sign up and log in with a personalized profile (name, email, course).  
- **Dashboard:** Shows total interviews, average score, best score, and quick navigation.  
- **Mock Interviews:**  
  - Choose **Technical** or **HR**  
  - Set **duration** (10 or 15 minutes)  
  - Set **number of questions** (10 or 15)  
- **Interactive Question Flow:**  
  - Navigate **Next / Previous**  
  - **Review answers** before submitting  
- **AI Feedback & Scoring:** Evaluate overall performance, communication, and confidence.  
- **Analytics:**  
  - Performance trend chart  
  - History of all previous interview attempts  
  - Performance badges (Excellent, Good, Needs Improvement)  
- **LocalStorage:** Data persists across sessions; supports multiple users.  
- **Responsive Design:** Works on desktop and mobile devices.  
- **Deployment:** Fully deployed on Vercel with sharable link.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Routing:** React Router v6  
- **Charts:** Chart.js, react-chartjs-2  
- **Notifications:** react-hot-toast  
- **State Management:** React Context API (AuthContext)  
- **Deployment:** Vercel  

---

## Live Demo

[https://dmless-interview.vercel.app](https://dmless-interview.vercel.app)  

---

## Getting Started

### Prerequisites

- Node.js v18+  
- npm or yarn  

### Installation

```bash
# Clone the repo
git clone https://github.com/Pratiksha-120605/dmless-interview-ai.git

# Navigate to the project folder
cd dmless-interview-ai

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
