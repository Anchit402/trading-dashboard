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
- React / Vue.js (browser extension)  
- TypeScript  
- React Query / RxJS for state management  
- TailwindCSS  

**Backend:**  
- Spring Boot (Java)  
- WebSocket API for live ticks  
- REST API for orders and symbol management  

---

## Getting Started

### Backend
1. **Install dependencies:**  
