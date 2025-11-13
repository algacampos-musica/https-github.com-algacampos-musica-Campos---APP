import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction, Category } from '../types';

interface DonutChartProps {
  transactions: Transaction[];
  categories: Category[];
}

const DonutChart: React.FC<DonutChartProps> = ({ transactions, categories }) => {
  const expenseTransactions = transactions.filter(t => t.amount > 0);

  const data = categories
    .map(category => {
      const total = expenseTransactions
        .filter(t => t.categoryId === category.id)
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        name: category.name,
        value: total,
        color: category.color.replace('bg-', '').replace('-500', ''), // Hack to get color name
      };
    })
    .filter(item => item.value > 0);

  // Expanded color map to match Tailwind CSS colors used in the app
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
    gray: '#6b7280', // Default for new categories
  };
  
  if (data.length === 0) {
    return (
        <div className="flex items-center justify-center h-64 text-gray-500">
            Nenhuma despesa para exibir no gráfico.
        </div>
    );
  }

  // Custom label for smaller slices to avoid overlapping
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) { // Don't render label for small slices
        return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={TAILWIND_COLORS[entry.color] || '#6b7280'} stroke={"#fff"}/>
            ))}
          </Pie>
          <Tooltip formatter={(value: number, name: string) => [`R$ ${value.toFixed(2)}`, name]} />
          <Legend iconSize={12} wrapperStyle={{fontSize: "14px"}}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
