export const formatViews = (amount: number): string =>
  amount >= 1000 ? `${Math.round(amount / 1000)}K` : amount.toString()
