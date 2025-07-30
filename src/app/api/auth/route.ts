import { NextRequest, NextResponse } from 'next/server'
import { EdgeConfigAuth } from '@/lib/edge-config'

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json()

    if (action === 'register') {
      return await handleRegister(data)
    } else if (action === 'login') {
      return await handleLogin(data)
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Auth API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleRegister(data: {
  email: string
  password: string
  confirmPassword: string
  name: string
}) {
  // Basic validation
  if (!data.email || !data.password || !data.name) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields' },
      { status: 400 }
    )
  }

  if (data.password !== data.confirmPassword) {
    return NextResponse.json(
      { success: false, error: 'Passwords do not match' },
      { status: 400 }
    )
  }

  // Validate against Edge Config
  const validation = await EdgeConfigAuth.validateRegistration(data)
  
  if (!validation.isValid) {
    return NextResponse.json(
      { success: false, error: validation.errors.join(', ') },
      { status: 400 }
    )
  }

  // Here you would typically:
  // 1. Hash the password
  // 2. Save to your database (Vercel Postgres, Supabase, etc.)
  // 3. Send verification email if required
  // 4. Create session/JWT token

  console.log('Registration data validated:', {
    email: data.email,
    name: data.name,
    // Never log passwords!
  })

  return NextResponse.json({
    success: true,
    message: 'Registration successful! Welcome to narrative layers.',
    user: {
      email: data.email,
      name: data.name
    }
  })
}

async function handleLogin(data: {
  email: string
  password: string
}) {
  // Basic validation
  if (!data.email || !data.password) {
    return NextResponse.json(
      { success: false, error: 'Email and password are required' },
      { status: 400 }
    )
  }

  // Get auth config
  const authConfig = await EdgeConfigAuth.getAuthConfig()
  
  if (authConfig.maintenanceMode) {
    return NextResponse.json(
      { success: false, error: 'Authentication system is under maintenance' },
      { status: 503 }
    )
  }

  // Check if user is allowed to login
  const userAllowed = await EdgeConfigAuth.isUserInAllowlist(data.email)
  if (!userAllowed) {
    return NextResponse.json(
      { success: false, error: 'Account not found or access denied' },
      { status: 401 }
    )
  }

  // Here you would typically:
  // 1. Look up user in database
  // 2. Verify password hash
  // 3. Create session/JWT token
  // 4. Update last login time

  console.log('Login attempt for:', data.email)

  // For demo purposes, we'll simulate a successful login
  return NextResponse.json({
    success: true,
    message: 'Login successful! Welcome back to narrative layers.',
    user: {
      email: data.email,
      name: 'Demo User' // This would come from your database
    }
  })
}

// GET endpoint to retrieve auth configuration
export async function GET() {
  try {
    const authConfig = await EdgeConfigAuth.getAuthConfig()
    const registrationEnabled = await EdgeConfigAuth.isRegistrationEnabled()

    return NextResponse.json({
      success: true,
      config: {
        registrationEnabled,
        requireEmailVerification: authConfig.requireEmailVerification,
        allowSocialLogin: authConfig.allowSocialLogin,
        maintenanceMode: authConfig.maintenanceMode,
        minPasswordLength: authConfig.minPasswordLength
      }
    })
  } catch (error) {
    console.error('Error getting auth config:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get auth configuration' },
      { status: 500 }
    )
  }
}