# Fiver - Service Marketplace Platform

A full-stack service marketplace platform built with NestJS (backend) and React Native (frontend), allowing clients to find and hire service providers for various tasks.

## 🏗️ Tech Stack

### Backend (`fiver-back/`)
- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport.js
- **Key Dependencies**:
  - @nestjs/config
  - @nestjs/jwt
  - @prisma/client
  - bcrypt
  - class-validator

### Frontend (`FiverFront-main/`)
- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Key Dependencies**:
  - expo
  - react-native
  - @react-navigation
  - axios
  - react-hook-form
  - nativewind

## �� Features

### User Management
- User registration and authentication
- Role-based access (Client/Provider)
- Profile management
- Phone verification system

### Service Provider Features
- Provider profile creation
- Enterprise account support
- CIN (Company Identification Number) verification
- Service offering management
- Location-based services

### Client Features
- Service search and discovery
- Service request creation
- Provider reviews and ratings
- Demand tracking

### Core Functionality
- Service marketplace
- Demand management system
- Review and rating system
- Real-time status updates

## ��️ Database Schema

The application uses a PostgreSQL database with the following main models:
- User (with role-based access)
- Client
- Provider
- Service
- ProviderService (junction table)
- Demand
- Review

## 🚀 Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- Expo CLI
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd fiver-back
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file
   - Add your database URL and JWT secret

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd FiverFront-main
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npm start
   ```
   or
   ```bash
   npx expo start
   ```

## 📱 Mobile App Development
- The app is built using Expo, making it easy to run on both iOS and Android
- Use Expo Go app for testing on physical devices
- Supports both development and production builds

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Phone verification system
- CIN verification for enterprise providers

## 🛠️ Development
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Jest for testing
- Prisma for type-safe database queries

## 📄 License
[Add your license information here]

## 👥 Contributing
[Add contribution guidelines here]
