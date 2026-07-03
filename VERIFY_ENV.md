# Setting up Environment Variables on Vercel

## 1. Login to Vercel
Visit https://vercel.com and login with your GitHub account.

## 2. Import Project
- Click "Add New" → "Project"
- Select your GitHub repository
- Click "Import"

## 3. Add Environment Variables
Go to your project → Settings → Environment Variables

### Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| NEXT_PUBLIC_FIREBASE_API_KEY | Your Firebase API Key | Production, Preview, Development |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | Your Firebase Auth Domain | Production, Preview, Development |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | Your Firebase Project ID | Production, Preview, Development |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | Your Firebase Storage Bucket | Production, Preview, Development |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | Your Firebase Messaging Sender ID | Production, Preview, Development |
| NEXT_PUBLIC_FIREBASE_APP_ID | Your Firebase App ID | Production, Preview, Development |
| NEXT_PUBLIC_FIREBASE_VAPID_KEY | Your Firebase VAPID Key | Production, Preview, Development |
| NEXT_PUBLIC_API_URL | Your API URL | Production, Preview, Development |
| NEXT_PUBLIC_WEBSOCKET_URL | Your WebSocket URL | Production, Preview, Development |
| NEXT_PUBLIC_GOOGLE_MAPS_API_KEY | Your Google Maps API Key | Production, Preview, Development |
| NEXT_PUBLIC_APP_URL | Your App URL | Production, Preview, Development |
| NEXT_PUBLIC_GA_TRACKING_ID | Your Google Analytics ID | Production, Preview |
| VERCEL_TOKEN | Your Vercel Token (for CI/CD) | Production, Preview |
| VERCEL_ORG_ID | Your Vercel Organization ID | Production, Preview |
| VERCEL_PROJECT_ID | Your Vercel Project ID | Production, Preview |

### Example Values:
