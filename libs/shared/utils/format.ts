export function formatCurrencyAmount(amount: string, currency: string): string {
  return `${amount} ${currency}`.trim();
}

export function getUserSafeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Try again later.';
}
