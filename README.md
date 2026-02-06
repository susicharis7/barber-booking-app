# 💈 Barber Booking App (Mobile)

A modern **mobile booking application for barbershops**, built with **React Native (Expo)**, **Firebase**, **Node.js**, and **PostgreSQL**.

The app allows users to browse services, select a barber, book available time slots, manage appointments, and receive notifications — all with a clean and scalable architecture suitable for real-world production use.

---

##  Project Status

🟡 **In active development**

Current focus:
- Core app architecture 
- Authentication
- Scalable navigation & styling system

---

##  Tech Stack

### Frontend (Mobile App)
- **React Native (Expo)**
- **TypeScript**
- **React Navigation**
- **Context API**
- **Custom Style System (no inline styles)**

###  Authentication & Notifications
- **Firebase Authentication** (Email/Password, OAuth later)
- **Firebase Cloud Messaging** (Push notifications)
- **Firebase Storage** (Profile images)

### Backend (Planned)
- **Node.js**
- **TypeScript**
- **Express / NestJS**
- **Firebase Admin SDK** (token verification)
- **REST API**

### Database (Planned)
- **PostgreSQL**
- Relational schema with transactions
- Strong data integrity for bookings

---

## ✨ Core Features (Planned)

### User Authentication
- Email & password login
- Secure auth state handling
- Auto-login & protected routes
- Logout support

### Booking Flow
1. Browse services 
2. Select barber (employee) 
3. View price list & duration 
4. Open calendar 
5. Select available time slot 
6. Confirm booking 

### Appointments
- Upcoming appointments 
- Past appointments 
- Cancel logic 
- Real-time availability updates 

### Notifications
- Booking confirmation
- Appointment reminders
- Cancellation alerts
- Waiting list notifications

### User Profile
- Update name & profile image 
- Phone number (required for bookings)
- Read-only email **(DONE)**

### Waiting List
- Join waiting list when slot is full 
- Automatic notification when slot becomes available

### Admin / Barber Panel (Later Phase)
- Manage services & prices
- Manage working hours
- View daily schedule
- Cancel / block time slots

---

## Project Architecture

```text
Will post final structure when project is finished. 
Reason : It is actively changing.
