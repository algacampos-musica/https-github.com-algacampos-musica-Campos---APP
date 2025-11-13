
import React, { useState, useEffect } from 'react';
import { Category, TransactionType } from '../types';
import { GenericCategoryIcon } from '../constants';

interface ManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);


const CategoryForm: React.FC<{
    type: TransactionType;
    onSaveCategory: (categoryData: Category | Omit<Category, 'id'>) => void;
    categoryToEdit: Category | null;
    onCancelEdit: () => void;
}> = ({ type, onSaveCategory, categoryToEdit, onCancelEdit }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('bg-gray-500');
    const isEditing = !!categoryToEdit;

    useEffect(() => {
        if (isEditing) {
            setName(categoryToEdit.name);
            setColor(categoryToEdit.color);
        } else {
            setName('');
            setColor('bg-gray-500');
        }
    }, [categoryToEdit]);

    
    const availableColors = [
      'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 
      'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 
      'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 
      'bg-pink-500', 'bg-rose-500'
    ];
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name.trim()) {
            alert("O nome da categoria não pode ser vazio.");
            return;
        }

        if (isEditing) {
            onSaveCategory({
                ...categoryToEdit,
                name: name.trim(),
                color,
            });
        } else {
            onSaveCategory({
                name: name.trim(),
                color,
                type,
                icon: <GenericCategoryIcon />,
                isDeletable: true,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 bg-gray-50 rounded-lg space-y-3">
            <h4 className="font-semibold text-sm text-gray-600">{isEditing ? 'Editar Categoria' : 'Nova Categoria'}</h4>
            <div>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Nome da categoria" 
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-wrap gap-2">
                {availableColors.map(c => (
                    <button type="button" key={c} onClick={() => setColor(c)} className={`w-5 h-5 rounded-full ${c} ${color === c ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`} aria-label={`Select color ${c}`}></button>
                ))}
            </div>
             <div className="flex items-center gap-2">
                <button type="submit" className="flex-grow p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-semibold transition-colors">
                    {isEditing ? 'Salvar' : 'Adicionar'}
                </button>
                {isEditing && (
                    <button type="button" onClick={onCancelEdit} className="flex-grow p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-semibold transition-colors">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}

const ManageCategoriesModal: React.FC<ManageCategoriesModalProps> = ({ isOpen, onClose, categories, onAddCategory, onUpdateCategory, onDeleteCategory }) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  if (!isOpen) return null;

  const handleSaveCategory = (categoryData: Category | Omit<Category, 'id'>) => {
      if ('id' in categoryData && categoryData.id) {
          onUpdateCategory(categoryData);
      } else {
          onAddCategory(categoryData as Omit<Category, 'id'>);
      }
      setEditingCategory(null);
  };

  const handleClose = () => {
    setEditingCategory(null);
    onClose();
  }

  const incomeCategories = categories.filter(c => c.type === TransactionType.INCOME);
  const expenseCategories = categories.filter(c => c.type === TransactionType.EXPENSE);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative animate-fade-in-up max-h-[95vh] overflow-y-auto">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Gerenciar Categorias</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Income Categories */}
            <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Categorias de Entrada</h3>
                <CategoryForm 
                    type={TransactionType.INCOME} 
                    onSaveCategory={handleSaveCategory}
                    categoryToEdit={editingCategory?.type === TransactionType.INCOME ? editingCategory : null}
                    onCancelEdit={() => setEditingCategory(null)}
                />
                <ul className="space-y-2 h-64 overflow-y-auto pr-2">
                    {incomeCategories.map(cat => {
                        const isEditingThis = editingCategory?.id === cat.id;
                        return (
                        <li key={cat.id} className={`flex items-center justify-between p-2 rounded-md border transition-colors ${isEditingThis ? 'bg-blue-50 ring-1 ring-blue-200' : 'bg-white'}`}>
                            <div className="flex items-center gap-2">
                                <span className={`w-4 h-4 rounded-full ${cat.color} block`}></span>
                                <span className="text-sm">{cat.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <>
                                    <button onClick={() => setEditingCategory(cat)} className="text-gray-400 hover:text-blue-500" aria-label={`Editar categoria ${cat.name}`}>
                                        <EditIcon />
                                    </button>
                                    <button onClick={() => onDeleteCategory(cat.id)} className="text-gray-400 hover:text-red-500" aria-label={`Excluir categoria ${cat.name}`}>
                                        <DeleteIcon />
                                    </button>
                                </>
                            </div>
                        </li>
                    )})}
                </ul>
            </div>
            {/* Expense Categories */}
            <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Categorias de Saída</h3>
                 <CategoryForm 
                    type={TransactionType.EXPENSE} 
                    onSaveCategory={handleSaveCategory}
                    categoryToEdit={editingCategory?.type === TransactionType.EXPENSE ? editingCategory : null}
                    onCancelEdit={() => setEditingCategory(null)}
                />
                <ul className="space-y-2 h-64 overflow-y-auto pr-2">
                    {expenseCategories.map(cat => {
                        const isEditingThis = editingCategory?.id === cat.id;
                        return (
                         <li key={cat.id} className={`flex items-center justify-between p-2 rounded-md border transition-colors ${isEditingThis ? 'bg-blue-50 ring-1 ring-blue-200' : 'bg-white'}`}>
                            <div className="flex items-center gap-2">
                                <span className={`w-4 h-4 rounded-full ${cat.color} block`}></span>
                                <span className="text-sm">{cat.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <>
                                    <button onClick={() => setEditingCategory(cat)} className="text-gray-400 hover:text-blue-500" aria-label={`Editar categoria ${cat.name}`}>
                                        <EditIcon />
                                    </button>
                                    <button onClick={() => onDeleteCategory(cat.id)} className="text-gray-400 hover:text-red-500" aria-label={`Excluir categoria ${cat.name}`}>
                                        <DeleteIcon />
                                    </button>
                                </>
                            </div>
                        </li>
                    )})}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategoriesModal;