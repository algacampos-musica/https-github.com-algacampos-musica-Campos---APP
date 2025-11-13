
import { ReactNode } from 'react';

export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export interface Category {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  type: TransactionType;
  isDeletable?: boolean;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  categoryId: string;
}