import { get } from '@vercel/edge-config'

// Edge Config utility functions for authentication
export class EdgeConfigAuth {
  
  // Check if registration is enabled
  static async isRegistrationEnabled(): Promise<boolean> {
    try {
      const enabled = await get('registration_enabled')
      return enabled === true
    } catch (error) {
      console.error('Error checking registration status:', error)
      return false // Default to disabled if there's an error
    }
  }

  // Check if email domain is allowed
  static async isEmailDomainAllowed(email: string): Promise<boolean> {
    try {
      const allowedDomains = await get<string[]>('allowed_email_domains')
      if (!allowedDomains || allowedDomains.length === 0) {
        return true // If no restrictions, allow all domains
      }
      
      const domain = email.split('@')[1]?.toLowerCase()
      return allowedDomains.includes(domain)
    } catch (error) {
      console.error('Error checking email domain:', error)
      return true // Default to allowed if there's an error
    }
  }

  // Check if user is in allowlist (for early access)
  static async isUserInAllowlist(email: string): Promise<boolean> {
    try {
      const allowlist = await get<string[]>('user_allowlist')
      if (!allowlist || allowlist.length === 0) {
        return true // If no allowlist, allow all users
      }
      
      return allowlist.includes(email.toLowerCase())
    } catch (error) {
      console.error('Error checking user allowlist:', error)
      return true // Default to allowed if there's an error
    }
  }

  // Get authentication configuration
  static async getAuthConfig() {
    try {
      const config = await get('auth_config')
      return {
        requireEmailVerification: config?.requireEmailVerification ?? false,
        minPasswordLength: config?.minPasswordLength ?? 8,
        allowSocialLogin: config?.allowSocialLogin ?? true,
        maintenanceMode: config?.maintenanceMode ?? false,
        ...config
      }
    } catch (error) {
      console.error('Error getting auth config:', error)
      return {
        requireEmailVerification: false,
        minPasswordLength: 8,
        allowSocialLogin: true,
        maintenanceMode: false
      }
    }
  }

  // Validate registration data against Edge Config rules
  static async validateRegistration(data: {
    email: string
    password: string
    name: string
  }): Promise<{
    isValid: boolean
    errors: string[]
  }> {
    const errors: string[] = []

    // Check if registration is enabled
    const registrationEnabled = await this.isRegistrationEnabled()
    if (!registrationEnabled) {
      errors.push('Registration is currently disabled')
    }

    // Check email domain
    const domainAllowed = await this.isEmailDomainAllowed(data.email)
    if (!domainAllowed) {
      errors.push('Email domain not allowed')
    }

    // Check user allowlist
    const userAllowed = await this.isUserInAllowlist(data.email)
    if (!userAllowed) {
      errors.push('Email not in allowlist for early access')
    }

    // Get auth config for validation
    const authConfig = await this.getAuthConfig()
    
    // Check maintenance mode
    if (authConfig.maintenanceMode) {
      errors.push('Authentication system is under maintenance')
    }

    // Validate password length
    if (data.password.length < authConfig.minPasswordLength) {
      errors.push(`Password must be at least ${authConfig.minPasswordLength} characters`)
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}