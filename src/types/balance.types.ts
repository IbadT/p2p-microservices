export interface CryptoBalance {
  [cryptocurrency: string]: number;
}

export interface HoldAmount {
  [cryptocurrency: string]: number;
}

export interface UserBalanceData {
  cryptoBalance: CryptoBalance;
  totalHoldAmount: HoldAmount;
} 