

import React, { useState, useMemo } from 'react';
import { Transaction, Category, TransactionType } from './types';
import { INITIAL_CATEGORIES, INITIAL_TRANSACTIONS } from './constants';
import TransactionList from './components/Transactionlist';
import DonutChart from './components/DonutChart';
import CustomBarChart from './components/BarChart';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import AddTransactionModal from './components/AddTransactionModal';
import FloatingActionButton from './components/FloatingActionButton';
import ManageCategoriesModal from './components/ManageCategoriesModal';
import ConfirmationModal from './components/ConfirmationModal';

type Period = 'all' | '7d' | '30d' | 'custom';
type ChartType = 'donut' | 'bar';

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [isAddTransactionModalOpen, setAddTransactionModalOpen] = useState(false);
  const [isCategoriesModalOpen, setCategoriesModalOpen] = useState(false);
  const [isResetConfirmationOpen, setResetConfirmationOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCustomPeriodPickerOpen, setCustomPeriodPickerOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [chartType, setChartType] = useState<ChartType>('donut');


  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return transactions.filter(t => {
      // Date filtering logic
      if (period !== 'all') {
        const transactionDate = new Date(t.date);
        transactionDate.setMinutes(transactionDate.getMinutes() + transactionDate.getTimezoneOffset()); // Normalize to UTC

        if (period === 'custom') {
            if (!customStartDate || !customEndDate) return false;
            const startDate = new Date(customStartDate);
            startDate.setMinutes(startDate.getMinutes() + startDate.getTimezoneOffset());
            const endDate = new Date(customEndDate);
            endDate.setMinutes(endDate.getMinutes() + endDate.getTimezoneOffset());
            
            if (transactionDate < startDate || transactionDate > endDate) return false;

        } else {
            let daysToSubtract = period === '7d' ? 7 : 30;
            const startDate = new Date();
            startDate.setDate(now.getDate() - daysToSubtract);
            startDate.setHours(0, 0, 0, 0);
            if (transactionDate < startDate) return false;
        }
      }

      // Search term filtering
      if (searchTerm && !t.description.toLowerCase().includes(lowerCaseSearchTerm)) {
        return false;
      }
      return true;
    });
  }, [transactions, period, searchTerm, customStartDate, customEndDate]);

  const { totalIncome, totalExpenses, periodBalance } = useMemo(() => {
    const income = filteredTransactions.filter(t => t.type === TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);
    const expenses = filteredTransactions.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome: income, totalExpenses: expenses, periodBalance: income - expenses };
  }, [filteredTransactions]);
  
  const totalBalance = useMemo(() => {
    const income = transactions.filter(t => t.type === TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0);
    return income - expenses;
  }, [transactions]);


  const handleSaveTransaction = (transactionData: Omit<Transaction, 'id'> | Transaction): { success: boolean; error?: string } => {
    if (transactionData.type === TransactionType.EXPENSE) {
        let potentialBalance: number;
        
        if ('id' in transactionData) { // Editing transaction
            const originalTransaction = transactions.find(t => t.id === transactionData.id);
            if (!originalTransaction) return { success: false, error: 'Transação original não encontrada.' };

            const originalContribution = originalTransaction.type === TransactionType.INCOME 
                ? originalTransaction.amount 
                : -originalTransaction.amount;
            
            const newContribution = -transactionData.amount;
            
            potentialBalance = totalBalance - originalContribution + newContribution;
        } else { // New transaction
            potentialBalance = totalBalance - transactionData.amount;
        }

        if (potentialBalance < 0) {
            return { success: false, error: 'Saldo insuficiente! O valor da despesa excede o saldo disponível.' };
        }
    }

    if ('id' in transactionData) {
      setTransactions(transactions.map(t => t.id === transactionData.id ? transactionData : t));
    } else {
      setTransactions([...transactions, { ...transactionData, id: `t${Date.now()}` }]);
    }
    return { success: true };
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setAddTransactionModalOpen(true);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      setTransactions(transactions.filter(t => t.id !== transactionId));
    }
  };
  
  const handleDeleteAllTransactions = () => {
    setResetConfirmationOpen(true);
  };
  
  const handleConfirmDeleteAll = () => {
    setTransactions([]);
    setResetConfirmationOpen(false);
  };

  const handleAddCategory = (categoryData: Omit<Category, 'id'>) => {
    setCategories([...categories, { ...categoryData, id: `c${Date.now()}` }]);
  };
  
  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
  };

  const handleDeleteCategory = (categoryId: string) => {
    setDeletingCategoryId(categoryId);
  };

  const handleConfirmDeleteCategory = () => {
    if (!deletingCategoryId) return;
    // Also delete all transactions associated with this category
    setTransactions(ts => ts.filter(t => t.categoryId !== deletingCategoryId));
    setCategories(categories.filter(c => c.id !== deletingCategoryId));
    setDeletingCategoryId(null);
  };
  
  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
    if (newPeriod === 'custom') {
      setCustomPeriodPickerOpen(true);
    } else {
      setCustomPeriodPickerOpen(false);
    }
  };

  const handleApplyCustomPeriod = () => {
      if (!customStartDate || !customEndDate) {
          alert('Por favor, selecione as datas de início e fim.');
          return;
      }
      if (new Date(customStartDate) > new Date(customEndDate)) {
          alert('A data de início não pode ser posterior à data de fim.');
          return;
      }
      setPeriod('custom');
      setCustomPeriodPickerOpen(false);
  }
  
  const handleCancelCustomPeriod = () => {
    setCustomPeriodPickerOpen(false);
    if(period === 'custom') {
        setPeriod('all');
    }
  }


  const PeriodButton: React.FC<{ value: Period; label: string; current: Period; onClick: (value: Period) => void; }> = ({ value, label, current, onClick }) => (
    <button onClick={() => onClick(value)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${ current === value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
      {label}
    </button>
  );
  
  const ChartToggleButton: React.FC<{ value: ChartType; label: string; current: ChartType; onClick: (value: ChartType) => void; }> = ({ value, label, current, onClick }) => (
      <button onClick={() => onClick(value)} className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${ current === value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
          {label}
      </button>
  );


  return (
    <div className="bg-gray-100 min-h-screen font-sans">
       <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <header className="mb-6 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Financeiro</h1>
                <p className="text-gray-500">Controle de entradas e saídas</p>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={handleDeleteAllTransactions} className="text-sm bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors">Resetar Tudo</button>
                <button onClick={() => setCategoriesModalOpen(true)} className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-200 transition-colors" aria-label="Gerenciar categorias">
                    <SettingsIcon />
                </button>
            </div>
        </header>

        <main className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div className="flex items-center gap-2 flex-wrap">
                <PeriodButton value="all" label="Tudo" current={period} onClick={handlePeriodChange} />
                <PeriodButton value="7d" label="7 dias" current={period} onClick={handlePeriodChange} />
                <PeriodButton value="30d" label="30 dias" current={period} onClick={handlePeriodChange} />
                <PeriodButton value="custom" label="Customizado" current={period} onClick={handlePeriodChange} />
            </div>

            {isCustomPeriodPickerOpen && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border animate-fade-in-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Início</label>
                    <input type="date" id="start-date" value={customStartDate} onChange={e => setCustomStartDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                  </div>
                  <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">Fim</label>
                    <input type="date" id="end-date" value={customEndDate} onChange={e => setCustomEndDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={handleCancelCustomPeriod} className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancelar</button>
                    <button onClick={handleApplyCustomPeriod} className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700">Aplicar</button>
                </div>
              </div>
            )}

            <div className="bg-blue-600 text-white rounded-xl p-4">
                <div className="bg-orange-500 rounded-lg p-3 text-center mb-2">
                    <p className="text-sm font-medium text-white opacity-90">Saldo Total</p>
                    <p className="text-2xl font-bold">R$ {totalBalance.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                    <div className="bg-green-500 rounded-lg p-3 text-center flex-1">
                        <p className="text-sm font-medium text-white opacity-90">Entradas</p>
                        <p className="text-xl font-bold">R$ {totalIncome.toFixed(2)}</p>
                    </div>
                    <div className="bg-red-500 rounded-lg p-3 text-center flex-1">
                        <p className="text-sm font-medium text-white opacity-90">Saídas</p>
                        <p className="text-xl font-bold">R$ {totalExpenses.toFixed(2)}</p>
                    </div>
                </div>
                <p className="text-center text-xs text-blue-200 mt-2">
                    {totalBalance >= 0 ? '🎉 Você está no lucro!' : '⚠️ Atenção, saldo negativo.'}
                </p>
            </div>
            
            <div>
                 <input type="text" placeholder="🔍 Buscar transação..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                <TransactionList transactions={filteredTransactions} categories={categories} onEdit={handleEditTransaction} onDelete={handleDeleteTransaction} />
            </div>
            
            <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Despesas por Categoria</h2>
                    <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-full">
                        <ChartToggleButton value="donut" label="Pizza" current={chartType} onClick={setChartType} />
                        <ChartToggleButton value="bar" label="Barras" current={chartType} onClick={setChartType} />
                    </div>
                  </div>
                  
                  {chartType === 'donut' ? (
                    <DonutChart transactions={filteredTransactions.filter(t => t.type === TransactionType.EXPENSE)} categories={categories.filter(c => c.type === TransactionType.EXPENSE)} />
                  ) : (
                    <CustomBarChart transactions={filteredTransactions.filter(t => t.type === TransactionType.EXPENSE)} categories={categories.filter(c => c.type === TransactionType.EXPENSE)} />
                  )}
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Histórico Mensal (Entradas vs. Saídas)</h2>
                    <IncomeExpenseChart transactions={transactions} />
                </div>
            </div>

        </main>
      </div>

      <FloatingActionButton onClick={() => { setEditingTransaction(null); setAddTransactionModalOpen(true); }} />

      <AddTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => { setAddTransactionModalOpen(false); setEditingTransaction(null); }}
        onSaveTransaction={handleSaveTransaction}
        categories={categories}
        transactionToEdit={editingTransaction}
      />
      
      <ManageCategoriesModal
        isOpen={isCategoriesModalOpen}
        onClose={() => setCategoriesModalOpen(false)}
        categories={categories}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
       />
       
       <ConfirmationModal
        isOpen={isResetConfirmationOpen}
        onClose={() => setResetConfirmationOpen(false)}
        onConfirm={handleConfirmDeleteAll}
        title="Confirmar Reset"
        message="ATENÇÃO! Você tem certeza que deseja apagar TODAS as transações? Esta ação não pode ser desfeita."
      />

       <ConfirmationModal
        isOpen={!!deletingCategoryId}
        onClose={() => setDeletingCategoryId(null)}
        onConfirm={handleConfirmDeleteCategory}
        title="Confirmar Exclusão de Categoria"
        message={<><strong>ATENÇÃO!</strong> Excluir esta categoria também apagará <strong>PERMANENTEMENTE</strong> todas as transações associadas a ela. Esta ação não pode ser desfeita. Deseja continuar?</>}
      />
    </div>
  );
};

export default App;