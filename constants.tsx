

import React from 'react';
import { Category, Transaction, TransactionType } from './types';

const SalaryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M17 14h- архитектура-2.009a2 2 0 0 1-1.991-1.823l-.14-1.124a2 2 0 0 1 1.991-2.177H17m-5.5 5V9.5a2.5 2.5 0 0 1 5 0V14"/><path d="M12 14v-1.5a2.5 2.5 0 0 0-5 0V14"/><path d="M2 14h1.5a2.5 2.5 0 0 0 2.5-2.5V10a2.5 2.5 0 0 0-5 0V14"/><circle cx="12" cy="12" r="10"/></svg>
);
const ValeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M2 12h3m14 0h3M12 2v3M12 19v3"/><circle cx="12" cy="12" r="7"/></svg>
);
const LoanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const BonusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
);
const CommissionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/><path d="m12 15 1.5-3.5-3.5-1.5L12 9l-1.5 3.5 3.5 1.5z"/><path d="M21 12a9 9 0 1 1-9-9c4.97 0 9 4.03 9 9z"/></svg>
);
const InvestmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
);
const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg>
);
const MarketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10h-3.2c-.7 0-1.3.3-1.7.8L10 12H8c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2"/><path d="M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-1"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
);
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const TransportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect width="16" height="14" x="4" y="4" rx="2"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="8" x2="8" y1="18" y2="18"/><line x1="16" x2="16" y1="18" y2="18"/></svg>
);
const EntertainmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 12c-2-2.67-4-4-4-4a2 2 0 1 0-4 0c0 2.5 2 4 4 4 2.5 0 4 2 4 4a2 2 0 1 0 4 0c0-2-2-4-4-4Z"/><path d="M12 12c2 2.67 4 4 4 4a2 2 0 1 0 4 0c0-2.5-2-4-4-4-2.5 0-4-2-4-4a2 2 0 1 0-4 0c0 2 2 4 4 4Z"/></svg>
);
const PersonalCareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22a7 7 0 0 0 7-7h-4a3 3 0 0 0-3 3v4Z"/><path d="M19 15a7 7 0 0 0-7-7v4a3 3 0 0 0 3 3h4Z"/><path d="M12 8a7 7 0 0 0-7 7h4a3 3 0 0 0 3-3V8Z"/><path d="M5 15a7 7 0 0 0 7 7v-4a3 3 0 0 0-3-3H5Z"/></svg>
);
export const GenericCategoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" x2="7.01" y1="7" y2="7"/></svg>
);


export const INITIAL_CATEGORIES: Category[] = [
  // Income
  { id: 'inc1', name: 'Salário', icon: <SalaryIcon />, color: 'bg-green-500', type: TransactionType.INCOME, isDeletable: true },
  { id: 'inc2', name: 'Vale', icon: <ValeIcon />, color: 'bg-teal-500', type: TransactionType.INCOME, isDeletable: true },
  { id: 'inc3', name: 'Empréstimo', icon: <LoanIcon />, color: 'bg-cyan-500', type: TransactionType.INCOME, isDeletable: true },
  { id: 'inc4', name: 'Bônus', icon: <BonusIcon />, color: 'bg-lime-500', type: TransactionType.INCOME, isDeletable: true },
  { id: 'inc5', name: 'Comissão', icon: <CommissionIcon />, color: 'bg-emerald-500', type: TransactionType.INCOME, isDeletable: true },
  { id: 'inc6', name: 'Investimento', icon: <InvestmentIcon />, color: 'bg-sky-500', type: TransactionType.INCOME, isDeletable: true },

  // Expense
  { id: 'exp1', name: 'Compras', icon: <ShoppingCartIcon />, color: 'bg-orange-500', type: TransactionType.EXPENSE, isDeletable: true },
  { id: 'exp2', name: 'Mercado', icon: <MarketIcon />, color: 'bg-amber-500', type: TransactionType.EXPENSE, isDeletable: true },
  { id: 'exp3', name: 'Veículo', icon: <CarIcon />, color: 'bg-red-500', type: TransactionType.EXPENSE, isDeletable: true },
  { id: 'exp4', name: 'Casa', icon: <HomeIcon />, color: 'bg-rose-500', type: TransactionType.EXPENSE, isDeletable: true },
  { id: 'exp5', name: 'Transporte', icon: <TransportIcon />, color: 'bg-blue-500', type: TransactionType.EXPENSE, isDeletable: true },
  { id: 'exp6', name: 'Diversão', icon: <EntertainmentIcon />, color: 'bg-purple-500', type: TransactionType.EXPENSE, isDeletable: true },
  { id: 'exp7', name: 'Cuidados Pessoais', icon: <PersonalCareIcon />, color: 'bg-pink-500', type: TransactionType.EXPENSE, isDeletable: true },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', description: 'Supermercado do Mês', amount: 350.75, date: new Date().toISOString().split('T')[0], type: TransactionType.EXPENSE, categoryId: 'exp2' },
  { id: 't2', description: 'Gasolina', amount: 120.50, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], type: TransactionType.EXPENSE, categoryId: 'exp3' },
  { id: 't3', description: 'Pagamento do aluguel', amount: 1500.00, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], type: TransactionType.EXPENSE, categoryId: 'exp4' },
  { id: 't4', description: 'Salário de Maio', amount: 5500.00, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], type: TransactionType.INCOME, categoryId: 'inc1' },
];
