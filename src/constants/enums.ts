export const VerificationType = {
  COMPANY_EMAIL: 'COMPANY_EMAIL',
  COMPANY_CARD: 'COMPANY_CARD',
  BUSINESS: 'BUSINESS',
  FREELANCER: 'FREELANCER',
  OTHER: 'OTHER'
} as const;

export const VerificationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
} as const;

// 타입 정의
export type VerificationType = typeof VerificationType[keyof typeof VerificationType];
export type VerificationStatus = typeof VerificationStatus[keyof typeof VerificationStatus]; 