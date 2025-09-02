# Tick Subscription Trading App

This project is a browser-based trading application that supports real-time market data updates via WebSocket. It allows subscribing to symbols and receiving ticks in a realistic price range.  

## Table of Contents
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Backend](#backend)  
  - [Frontend](#frontend)  
- [Usage](#usage)  
- [Architecture Overview](#architecture-overview)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features
- Real-time tick subscription for multiple symbols.  
- Tick prices generated realistically around the close price (±5%).  
- Modular WebSocket backend to handle subscriptions efficiently.  
- Reactive frontend for symbol watchlists and live tick updates.  
- Support for creating and managing orders.  

---

## Tech Stack
**Frontend:**  
- React 19 
- TypeScript  
- React Query
- TailwindCSS
- Context API
- Shadcn

**Backend:**  
- Spring Boot (Java)  
- WebSocket API for live ticks  
- REST API for orders and symbol management  

---

## Getting Started

### Backend
**Install dependencies:**
Navigate to the backend folder and run the JAR:

```bash
cd backend
java -jar target/ims-0.0.1-SNAPSHOT.jar
```

**server location:**
http://localhost:8080


### Frontend
**Install dependencies:**

If you don’t have Node.js and npm installed, download and install from [Node.js official site](https://nodejs.org/). Verify installation:

```bash
node -v
npm -v
```

Navigate to the backend folder and run the JAR:
```bash
cd frontend
npm i
npm run dev
```

**server location:**
http://localhost:5173

---

## API Documentation
[Swagger Docs](http://localhost:8080/swagger-ui/index.html#/)
After building backend

---
## Demo


