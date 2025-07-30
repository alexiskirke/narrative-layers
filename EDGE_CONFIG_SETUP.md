# 🚀 Vercel Edge Config Setup Guide

This guide will help you configure your `my-edge-config-store` to work with the login/register system.

## 🔧 Environment Variables

First, add your Edge Config connection string to your environment variables:

### Local Development (.env.local)
```bash
EDGE_CONFIG=https://edge-config.vercel.com/[your-config-id]?token=[your-token]
```

### Vercel Dashboard
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add: `EDGE_CONFIG` with your connection string

## 📊 Edge Config Data Structure

Add these keys to your `my-edge-config-store`:

### 1. Registration Control
```json
{
  "registration_enabled": true
}
```

### 2. Email Domain Restrictions (Optional)
```json
{
  "allowed_email_domains": [
    "gmail.com",
    "narrativelayers.com",
    "company.com"
  ]
}
```
*Leave empty array `[]` or omit to allow all domains*

### 3. User Allowlist (Optional - for early access)
```json
{
  "user_allowlist": [
    "user1@gmail.com",
    "user2@narrativelayers.com",
    "beta-tester@company.com"
  ]
}
```
*Leave empty array `[]` or omit to allow all users*

### 4. Authentication Configuration
```json
{
  "auth_config": {
    "requireEmailVerification": false,
    "minPasswordLength": 8,
    "allowSocialLogin": true,
    "maintenanceMode": false
  }
}
```

## 🎯 How to Add Data to Edge Config

### Option 1: Vercel Dashboard
1. Go to your Vercel dashboard
2. Navigate to "Edge Config"
3. Select your `my-edge-config-store`
4. Add the JSON keys above

### Option 2: Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login
vercel login

# Set values
vercel env add EDGE_CONFIG
vercel edge-config:set registration_enabled true
vercel edge-config:set auth_config '{"minPasswordLength": 8, "maintenanceMode": false}'
```

### Option 3: API (for dynamic updates)
```javascript
// Update Edge Config via API
await fetch(`https://api.vercel.com/v1/edge-config/${configId}/items`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    items: [
      {
        operation: 'upsert',
        key: 'registration_enabled',
        value: true
      }
    ]
  })
})
```

## 🚦 Example Configurations

### Open Registration (Default)
```json
{
  "registration_enabled": true,
  "allowed_email_domains": [],
  "user_allowlist": [],
  "auth_config": {
    "requireEmailVerification": false,
    "minPasswordLength": 8,
    "allowSocialLogin": true,
    "maintenanceMode": false
  }
}
```

### Restricted Early Access
```json
{
  "registration_enabled": true,
  "allowed_email_domains": ["gmail.com", "narrativelayers.com"],
  "user_allowlist": [
    "alpha@gmail.com",
    "beta@narrativelayers.com"
  ],
  "auth_config": {
    "requireEmailVerification": true,
    "minPasswordLength": 12,
    "allowSocialLogin": false,
    "maintenanceMode": false
  }
}
```

### Maintenance Mode
```json
{
  "registration_enabled": false,
  "auth_config": {
    "maintenanceMode": true
  }
}
```

## 🔍 Testing Your Setup

### 1. Check Configuration
Visit: `http://localhost:3000/api/auth`
This will show your current auth configuration.

### 2. Test Registration Flow
1. Click "Login / Register" button
2. Switch to "Create Account" 
3. Try different email domains
4. Check console for validation messages

### 3. Test Restrictions
1. Set `registration_enabled: false`
2. Try to register - should show error
3. Add your email to `user_allowlist`
4. Try again - should work

## ⚡ Dynamic Control Examples

### Disable Registration Temporarily
```bash
vercel edge-config:set registration_enabled false
```

### Add User to Allowlist
```bash
vercel edge-config:set user_allowlist '["user1@gmail.com", "user2@company.com", "newuser@domain.com"]'
```

### Enable Maintenance Mode
```bash
vercel edge-config:set auth_config '{"maintenanceMode": true}'
```

## 🛠 Next Steps

1. **Add Database**: For production, integrate with Vercel Postgres, Supabase, or your preferred database
2. **Add Authentication Provider**: Consider NextAuth.js, Clerk, or Auth0
3. **Password Hashing**: Implement bcrypt or similar for secure password storage
4. **Email Verification**: Add email sending capabilities
5. **Session Management**: Implement JWT tokens or session cookies

## 🔒 Security Notes

- Never store actual passwords in Edge Config
- Edge Config is for configuration data, not user data
- Use environment variables for sensitive tokens
- Always hash passwords before storing in a database
- Edge Config updates can take a few seconds to propagate globally

---

Your login/register modal is now powered by Edge Config! 🎉

The system will automatically validate users against your configuration rules, making it easy to control access to your narrative layers platform.