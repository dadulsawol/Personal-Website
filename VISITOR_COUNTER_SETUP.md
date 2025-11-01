# Visitor Counter Setup Guide

## Current Implementation

The visitor counter is currently using **localStorage** which works immediately but tracks visits per browser/device. This is perfect for testing and getting started!

## Features

✅ Beautiful retro-feminine design matching your website theme  
✅ Smooth fade-in animation  
✅ Pulse animation on the eye icon  
✅ Responsive design for all devices  
✅ Dark mode support  
✅ Number formatting with commas (e.g., 1,234)  
✅ Prevents duplicate counting per session  

## How It Works (localStorage)

- Each unique browser session increments the count by 1
- Uses `sessionStorage` to prevent counting the same visit multiple times
- Stores count in browser's `localStorage`
- Works offline and requires no backend

## Upgrade to Firebase (Optional)

For a global visitor count across all users and devices, follow these steps:

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name your project (e.g., "April Portfolio")
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Set Up Realtime Database

1. In Firebase Console, go to "Realtime Database"
2. Click "Create Database"
3. Choose a location (closest to you)
4. Start in "Test mode" (for development) or set security rules:

```json
{
  "rules": {
    "visitorCount": {
      ".read": true,
      ".write": true
    }
  }
}
```

### Step 3: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ → Project Settings
2. Scroll to "Your apps" section
3. Click the web icon `</>` to add a web app
4. Register app with a nickname (e.g., "Portfolio Website")
5. Copy the `firebaseConfig` object

### Step 4: Update Your Code

Open `script.js` and update the configuration:

```javascript
// Uncomment and replace with your Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    databaseURL: "YOUR_DATABASE_URL",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Update the config
const VISITOR_COUNTER_CONFIG = {
    method: 'firebase',
    firebaseConfig: firebaseConfig
};
```

### Step 5: Uncomment Firebase Code

In `script.js`, find the Firebase implementation section (around line 100) and uncomment the code block inside the `if (VISITOR_COUNTER_CONFIG.method === 'firebase')` condition.

### Step 6: Add Firebase SDK Scripts

Add these scripts to your `index.html` in the `<head>` section (or use the dynamic loading in the code):

```html
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"></script>
```

## Alternative: Supabase Setup

If you prefer Supabase, here's a quick guide:

### Step 1: Create Supabase Project
1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Wait for database to initialize

### Step 2: Create Table
In SQL Editor, run:
```sql
CREATE TABLE visitor_count (
  id SERIAL PRIMARY KEY,
  count INTEGER DEFAULT 0
);

INSERT INTO visitor_count (count) VALUES (0);
```

### Step 3: Create API Endpoint
Use Supabase Edge Functions or create a simple serverless function to increment the count.

### Step 4: Update Code
Modify the `initializeVisitorCounter()` function to call your Supabase API endpoint instead.

## Testing

1. Open your website in an incognito/private window
2. The counter should increment
3. Refresh the page - it should NOT increment again (same session)
4. Open in a different browser/device - count should increment

## Customization

### Change the Icon
In `index.html`, change the emoji:
```html
<span class="visitor-icon">💕</span> <!-- Instead of 👁️ -->
```

### Change Colors
In `style.css`, update the CSS variables:
```css
.visitor-counter-badge {
    background: var(--bg-gradient-warm); /* Change this */
    border-color: var(--border-retro);
    /* ... */
}
```

### Change Text
In `index.html`:
```html
<span class="visitor-text">views</span> <!-- Instead of "visitors" -->
```

## Troubleshooting

**Counter not showing?**
- Check browser console for errors
- Ensure JavaScript is enabled
- Verify element IDs match (`visitor-count`, `visitor-counter`)

**Counter not incrementing?**
- Clear browser localStorage and try again
- Check browser console for errors
- Verify sessionStorage is working

**Firebase not working?**
- Check Firebase configuration is correct
- Verify Realtime Database is enabled
- Check security rules allow read/write
- Ensure Firebase SDK scripts are loaded

## Notes

- localStorage works immediately but is browser-specific
- Firebase provides a global count but requires setup
- The current implementation prevents duplicate counting per session
- Numbers are formatted with commas for readability (1,234 instead of 1234)

