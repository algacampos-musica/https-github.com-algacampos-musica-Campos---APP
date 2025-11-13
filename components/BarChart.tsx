import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Transaction, Category } from '../types';

interface BarChartProps {
  transactions: Transaction[];
  categories: Category[];
}

const CustomBarChart: React.FC<BarChartProps> = ({ transactions, categories }) => {
  const expenseTransactions = transactions.filter(t => t.amount > 0);

  const data = categories
    .map(category => {
      const total = expenseTransactions
        .filter(t => t.categoryId === category.id)
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        name: category.name,
        value: total,
        color: category.color.replace('bg-', '').replace('-500', ''),
      };
    })
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const TAILWIND_COLORS: { [key: string]: string } = {
    red: '#ef4444',
    orange: '#f97316',
    amber: '#f59e0b',
    yellow: '#eab308',
    lime: '#84cc16',
    green: '#22c55e',
    emerald: '#10b981',
    teal: '#14b8a6',
    cyan: '#06b6d4',
    sky: '#0ea5e9',
    blue: '#3b82f6',
    indigo: '#6366f1',
    violet: '#8b5cf6',
    purple: '#a855f7',
    fuchsia: '#d946ef',
    pink: '#ec4899',
    rose: '#f43f5e',
    gray: '#6b7280',
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Nenhuma despesa para exibir no gráfico.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-25} textAnchor="end" height={60} />
          <YAxis tickFormatter={(value) => `R$${value}`} tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Total']}
            cursor={{ fill: 'rgba(230, 230, 230, 0.5)' }} 
           />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={TAILWIND_COLORS[entry.color] || '#6b7280'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
