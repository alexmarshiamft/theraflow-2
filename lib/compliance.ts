export function validateVASessionRequirements(client: any, authorization: any): string[] {
  const errors: string[] = [];

  if (!client) {
    errors.push('Client record not found.');
    return errors;
  }

  // Example VA checks
  if (client.id.startsWith('VA') || client.id === 'P001') { // using P001 as mock VA client
    if (!authorization) {
      errors.push('Missing active VA/TriWest authorization for this client.');
    } else if (authorization.status !== 'ACTIVE') {
      errors.push('VA/TriWest authorization is not ACTIVE.');
    }
    
    // Add additional simulated compliance checks
    if (authorization && authorization.cptCodes) {
      if (!authorization.cptCodes.includes('90837') && !authorization.cptCodes.includes('90834')) {
        errors.push('No approved CPT codes for telehealth sessions.');
      }
    }
  }

  return errors;
}
