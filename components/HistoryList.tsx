
import React from 'react';
import type { Calculation } from '../types';
import TrashIcon from './icons/TrashIcon';

interface HistoryListProps {
  calculations: Calculation[];
  onDelete: (id: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ calculations, onDelete }) => {
  if (calculations.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700 shadow-2xl">
        <h2 className="text-2xl font-bold mb-2 text-white">Historial</h2>
        <p className="text-gray-400">Aún no has calculado nada. ¡Tu historial aparecerá aquí!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Historial de Cálculos</h2>
      <div className="max-h-96 overflow-y-auto pr-2">
        <ul className="space-y-3">
          {calculations.map(calc => (
            <li key={calc.id} className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between hover:bg-gray-700 transition-colors duration-200">
              <div>
                <p className="font-bold text-lg text-blue-300">{calc.exercise}</p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">{calc.weight} kg</span> x 
                  <span className="font-semibold"> {calc.reps} reps</span>
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-bold">1RM: {calc.oneRepMax.toFixed(2)} kg</span> - {new Date(calc.timestamp).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => onDelete(calc.id)}
                className="p-2 rounded-full text-gray-400 hover:bg-red-500/20 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
                aria-label={`Eliminar cálculo de ${calc.exercise}`}
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryList;
