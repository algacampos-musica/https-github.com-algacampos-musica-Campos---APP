import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction, TransactionType } from '../types';

interface IncomeExpenseChartProps {
  transactions: Transaction[];
}

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ transactions }) => {
  const processData = () => {
    const monthlyData: { [key: string]: { income: number; expense: number } } = {};

    transactions.forEach(t => {
      const date = new Date(t.date);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }

      if (t.type === TransactionType.INCOME) {
        monthlyData[monthKey].income += t.amount;
      } else {
        monthlyData[monthKey].expense += t.amount;
      }
    });

    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    return Object.keys(monthlyData)
      .map(key => {
        const [year, month] = key.split('-');
        const shortYear = year.slice(-2);
        const monthName = monthNames[parseInt(month) - 1];
        return {
          name: `${monthName}/${shortYear}`,
          key: key, // Use original key for sorting
          ...monthlyData[key],
        };
      })
      .sort((a, b) => a.key.localeCompare(b.key)); // Sort chronologically
  };
  
  const chartData = processData();

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Não há dados suficientes para exibir o gráfico.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(value) => `R$${value}`} tick={{ fontSize: 12 }} width={80}/>
          <Tooltip 
            formatter={(value: number, name: string) => [`R$ ${value.toFixed(2)}`, name === 'income' ? 'Entradas' : 'Saídas']}
            cursor={{ fill: 'rgba(230, 230, 230, 0.5)' }} 
           />
          {/* FIX: The `payload` prop is not supported on the Legend component.
              The legend will be generated automatically from the `name` prop on the `Bar` components. */}
          <Legend />
          <Bar dataKey="income" fill="#22c55e" name="Entradas" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="#ef4444" name="Saídas" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;