
import React, { useState, useEffect } from 'react';
import { Transaction, Category, TransactionType } from '../types';
import CategoryIcon from './CategoryIcon';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTransaction: (transaction: Omit<Transaction, 'id'> | Transaction) => { success: boolean; error?: string };
  categories: Category[];
  transactionToEdit?: Transaction | null;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSaveTransaction, categories, transactionToEdit }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState<string | null>(null);
  
  const isEditing = !!transactionToEdit;

  useEffect(() => {
    setError(null); // Clear error when modal opens or transaction changes
    if (isEditing) {
      setType(transactionToEdit.type);
      setAmount(String(transactionToEdit.amount));
      setDescription(transactionToEdit.description);
      setCategoryId(transactionToEdit.categoryId);
      setDate(transactionToEdit.date);
    } else {
      // Reset form when opening for a new transaction
      setType(TransactionType.EXPENSE);
      setAmount('');
      setDescription('');
      setCategoryId(null);
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [transactionToEdit, isOpen]);


  useEffect(() => {
    if(!isEditing) {
        setCategoryId(null); // Reset category when type changes for new transactions
    }
  }, [type, isEditing]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors on a new submission attempt

    const missingFields = [];
    if (!amount || parseFloat(amount) <= 0) missingFields.push('valor');
    if (!description.trim()) missingFields.push('descrição');
    if (!categoryId) missingFields.push('categoria');

    if (missingFields.length > 0) {
      setError(`Por favor, preencha o(s) campo(s) obrigatório(s): ${missingFields.join(', ')}.`);
      return;
    }
    
    const transactionData = {
      ...(isEditing && { id: transactionToEdit.id }),
      amount: parseFloat(amount),
      description: description.trim(),
      categoryId,
      date,
      type,
    };
    
    const result = onSaveTransaction(transactionData);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Ocorreu um erro desconhecido.');
    }
  };

  const filteredCategories = categories.filter(c => c.type === type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fade-in-up max-h-[95vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="http://www.w3.org/2000/svg" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="flex mb-6 border-b">
          <button onClick={() => setType(TransactionType.EXPENSE)} className={`flex-1 py-3 text-center font-semibold ${type === TransactionType.EXPENSE ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}>
            DESPESA
          </button>
          <button onClick={() => setType(TransactionType.INCOME)} className={`flex-1 py-3 text-center font-semibold ${type === TransactionType.INCOME ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}>
            RENDA
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Valor</label>
            <input type="number" step="0.01" id="amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
            <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Ex: Compras do mês" className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
              {filteredCategories.map(cat => (
                <div key={cat.id} className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setCategoryId(cat.id)}>
                  <CategoryIcon icon={cat.icon} color={cat.color} isSelected={categoryId === cat.id} />
                  <span className="text-xs text-center">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
             <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-center text-sm" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
            {isEditing ? 'Salvar Alterações' : 'Adicionar Transação'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;