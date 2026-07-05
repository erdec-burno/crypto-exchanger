export type KycStatus = 'not_started' | 'pending' | 'approved' | 'rejected';

export type AmlCheckStatus =
  | 'not_checked'
  | 'pending'
  | 'clear'
  | 'review_required'
  | 'blocked';
