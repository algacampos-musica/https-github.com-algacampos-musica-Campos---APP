import React from 'react';
import { Transaction, Category, TransactionType } from '../types';
import CategoryIcon from './CategoryIcon';

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);


const TransactionList: React.FC<TransactionListProps> = ({ transactions, categories, onEdit, onDelete }) => {
  const getCategory = (categoryId: string) => {
    return categories.find(c => c.id === categoryId);
  };
  
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      {sortedTransactions.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Nenhuma transação encontrada.</p>
      ) : (
        <ul className="flex flex-col">
          {sortedTransactions.map(transaction => {
            const category = getCategory(transaction.categoryId);
            
            const isExpense = transaction.type === TransactionType.EXPENSE;
            const amountColor = isExpense ? 'text-red-500' : 'text-green-600';
            const amountSign = isExpense ? '-' : '+';
            
            // FIX: Adjust date for timezone offset to prevent day-before issue
            const date = new Date(transaction.date);
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

            const formattedDate = new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'short',
            }).format(date);

            return (
              <li key={transaction.id} className="py-3 px-1 flex items-center justify-between border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-4">
                  {category ? (
                    <CategoryIcon icon={category.icon} color={category.color} />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200" /> // Placeholder for uncategorized
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                    <p className={`font-bold text-md ${amountColor}`}>
                      {amountSign} R$ {transaction.amount.toFixed(2)}
                    </p>
                    <button onClick={() => onEdit(transaction)} className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Editar transação">
                        <EditIcon />
                    </button>
                    <button onClick={() => onDelete(transaction.id)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Excluir transação">
                        <DeleteIcon />
                    </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default transactionList;