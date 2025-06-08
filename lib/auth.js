// Simple Authentication Helper for Demo
// In production, this would integrate with proper auth service

export function requireAuth(req, res, next) {
  // For MVP demo, we'll use a simple API key or skip auth
  // In production, this would check JWT tokens, session cookies, etc.
  
  const authHeader = req.headers.authorization;
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // In development/demo mode, allow all requests
  if (isDevelopment) {
    return true;
  }
  
  // Simple API key check for production
  if (authHeader === `Bearer ${process.env.API_SECRET_KEY}`) {
    return true;
  }
  
  return false;
}

// Demo user for testing
export const demoUser = {
  id: 'user_demo_001',
  email: 'demo@legalagents.ai',
  role: 'attorney',
  name: 'Demo Attorney',
  isActive: true
};

export function getDemoUser() {
  return demoUser;
}

// Check if user has required permissions
export function hasPermission(user, action) {
  if (!user || !user.isActive) return false;
  
  const permissions = {
    'attorney': ['review_documents', 'approve_documents', 'access_metrics'],
    'user': ['generate_documents', 'ask_questions', 'triage_cases']
  };
  
  return permissions[user.role]?.includes(action) || false;
} 