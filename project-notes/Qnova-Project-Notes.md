# Qnova --- Project Notes

## 1. Project Title

**Qnova**

### Project Concept

Qnova is a universal digital queue management platform designed for
different types of service providers.

The system can be used by: - Hospitals - Banks - Salons - Government
Offices - Other service-based businesses

**Full Concept:** Universal Queue Management System\
**Project Type:** Universal Digital Queue Management Platform

------------------------------------------------------------------------

## 2. Project Objective

Qnova aims to reduce physical waiting time and make queue management
easier for customers, staff, and service providers.

Main objectives: - Digital queue/token management - Customer queue
tracking - Provider and service management - Staff queue management -
Estimated waiting time - Live queue status - QR-based token generation -
Support for multiple business types

------------------------------------------------------------------------

## 3. Main Users

### Customer

-   Sign up / login
-   Select service provider
-   Select service
-   Get a token
-   Scan the Qnova QR code
-   View token number
-   View queue position
-   View estimated waiting time
-   Track live queue status
-   Receive notifications in future versions

### Service Provider / Admin

-   Register business
-   Select business type
-   Add/customize services
-   Manage staff
-   Assign staff to services
-   Manage queues
-   View reports and analytics

### Staff

-   Login
-   View assigned service queue
-   Call next customer
-   Start service
-   Complete service
-   Handle queue status

------------------------------------------------------------------------

## 4. Main Workflow

Customer:

Login → Select Provider → Select Service → Get Token → Scan Qnova QR →
QR Verification → Token Generated → View Queue Position → Track Live
Queue

Provider:

Register Business → Select Business Type → Configure Services → Manage
Staff → Manage Queue → View Reports

Staff:

Login → Select/Access Assigned Service → View Queue → Call Next → Serve
Customer → Complete Service

------------------------------------------------------------------------

## 5. QR Scan Module

A QR Scan module has been added to the original project requirements.

### QR Flow

Customer → Login → Select Provider → Select Service → Get Token → Scan
Qnova QR → Backend verifies QR → Token generated → Queue position and
estimated wait shown

### Important QR distinction

The Play Store QR used to install the mobile application is outside the
Qnova application workflow and will be provided separately.

The Qnova QR is specifically used for the token-generation process.

------------------------------------------------------------------------

## 6. Technology Stack

### Frontend

-   React
-   Vite
-   JavaScript
-   CSS

### Backend

-   Node.js
-   Express.js
-   CORS

### Database

-   MySQL

### Planned / Future

-   Socket.IO for real-time queue updates
-   QR scanner integration
-   Authentication
-   Notifications
-   Reports and analytics

------------------------------------------------------------------------

## 7. System Architecture

React Frontend (localhost:5173) \| \| API Request v Express Backend
(localhost:5000) \| \| Database Query v MySQL Database

------------------------------------------------------------------------

## 8. Why Express.js?

Express.js is the backend framework used with Node.js.

It will handle APIs for: - Authentication - Business types - Providers -
Services - Staff - Tokens - Queues - QR verification - Database
communication

**Express = Backend/API framework**

------------------------------------------------------------------------

## 9. Why CORS?

CORS stands for Cross-Origin Resource Sharing.

During development: - Frontend runs on localhost:5173 - Backend runs on
localhost:5000

CORS allows the React frontend to communicate with the Express backend
through API requests.

**CORS = Frontend-to-backend communication permission**

CORS is not used for connecting directly to MySQL.

------------------------------------------------------------------------

## 10. Current Project Setup

### Frontend

React + Vite successfully configured.

Frontend URL: `http://localhost:5173`

### Backend

Node.js + Express successfully configured.

Backend URL: `http://localhost:5000`

### Installed Backend Packages

-   express
-   cors

------------------------------------------------------------------------

## 11. Business Type API

The first backend API has been implemented.

### Endpoint

`GET /api/business-types`

### Current business types

1.  Hospital
2.  Bank
3.  Salon
4.  Government Office

### Purpose

The API provides business-type options to the React frontend so that the
system can dynamically display available business categories.

------------------------------------------------------------------------

## 12. Provider Module

The next development module is the Provider API.

Planned relationship:

Business Type → Provider → Service → Queue → Token

Example:

Hospital → City Care Hospital → General Medicine → Queue → Token

Provider records will be associated with a business type using
`businessTypeId`.

------------------------------------------------------------------------

## 13. Database Plan

The database will be designed as a universal system rather than a
hospital-specific system.

Planned core entities: - Business Types - Providers - Services -
Provider Services - Staff - Tokens - Queues - Users

MySQL will replace temporary in-memory data after the API structure is
established.

------------------------------------------------------------------------

## 14. Development Progress

-   [x] Project concept finalized
-   [x] Project title updated to Qnova
-   [x] Project requirements defined
-   [x] QR Scan module added
-   [x] React + Vite frontend setup
-   [x] Node.js + Express backend setup
-   [x] CORS configured
-   [x] Business Type API implemented
-   [x] Business Type API tested successfully
-   [ ] Provider API
-   [ ] Service management
-   [ ] Database / MySQL integration
-   [ ] Authentication
-   [ ] Customer module
-   [ ] Staff dashboard
-   [ ] Provider dashboard
-   [ ] Queue management
-   [ ] Token generation
-   [ ] QR scanner integration
-   [ ] Live queue updates
-   [ ] Notifications
-   [ ] Testing
-   [ ] Final documentation

------------------------------------------------------------------------

## 15. Development Principle

Qnova will be developed step by step.

For each major module: 1. Understand the requirement 2. Design the
module 3. Implement the backend 4. Connect the frontend 5. Test the
feature 6. Update project documentation

The existing project requirements remain unchanged except for the
addition of the QR Scan module and the project title change to Qnova.
