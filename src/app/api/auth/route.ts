import { NextRequest, NextResponse } from 'next/server'
import { EdgeConfigAuth } from '@/lib/edge-config'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  // Send welcome email
  try {
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'narrative layers <welcome@narrativelayers.com>',
        to: data.email,
        subject: 'Welcome to narrative layers! ✨',
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000, #1a1a2e); color: white; padding: 40px; border-radius: 20px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="font-size: 36px; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2, #f093fb); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">
                narrative layers
              </h1>
              <p style="font-size: 18px; color: #cccccc; margin: 10px 0;">where stories come alive</p>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2);">
              <h2 style="color: #f093fb; margin-top: 0;">Welcome ${data.name}! 🌟</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Thanks for joining narrative layers - the intersection of art, technology, and narrative.
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Your creative journey starts now. Get ready to experience stories like never before.
              </p>
              
              <div style="margin: 30px 0; padding: 20px; background: rgba(102, 126, 234, 0.2); border-radius: 10px; border-left: 4px solid #667eea;">
                <p style="margin: 0; font-style: italic; color: #b0c4ff;">
                  "Every story has the power to change the world. Welcome to yours."
                </p>
              </div>
              
              <p style="font-size: 14px; color: #999999; margin-bottom: 0;">
                Keep an eye out for updates as we build something extraordinary together.
              </p>
            </div>
          </div>
        `
      })
      console.log('Welcome email sent successfully')
    }
  } catch (emailError) {
    console.error('Failed to send welcome email:', emailError)
    // Don't fail registration if email fails
  }

  return NextResponse.json({
    success: true,
    message: 'Registration successful! Welcome to narrative layers. Check your email for a welcome message.',
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