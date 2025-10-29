import React, { useMemo } from 'react';
import type { Calculation, PercentageResult } from '../types';
import { estimateRepsForPercentage } from '../utils/formulas';

interface ResultsDisplayProps {
  calculation: Calculation | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ calculation }) => {
  const percentageData = useMemo<PercentageResult[]>(() => {
    const data: PercentageResult[] = [];
    if (!calculation || calculation.oneRepMax <= 0) return data;

    for (let i = 100; i >= 35; i -= 5) {
      data.push({
        percentage: i,
        weight: parseFloat((calculation.oneRepMax * (i / 100)).toFixed(2)),
        reps: estimateRepsForPercentage(i)
      });
    }
    return data;
  }, [calculation]);
  
  if (!calculation) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-700 h-full flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">Resultados</h2>
          <p className="text-gray-400">
            Selecciona un cálculo del historial o realiza uno nuevo para ver los detalles aquí.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Resultados para: <span className="text-blue-400">{calculation.exercise}</span></h2>
      <div className="text-center bg-gray-900 rounded-lg p-6 mb-6">
        <p className="text-gray-400 text-lg">Tu 1RM estimado es</p>
        <p className="text-5xl font-extrabold text-white my-2">
          {calculation.oneRepMax.toFixed(2)}
          <span className="text-3xl text-gray-400 ml-2">kg</span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-gray-300">Porcentaje</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-gray-300">Peso (kg)</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-gray-300">Reps Estimadas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {percentageData.map(({ percentage, weight, reps }) => (
              <tr key={percentage} className={`${percentage === 100 ? 'bg-blue-900/50' : 'hover:bg-gray-700/50'}`}>
                <td className={`p-3 font-bold ${percentage === 100 ? 'text-blue-300' : 'text-gray-300'}`}>
                  {percentage}%
                </td>
                <td className="p-3 text-white">{weight.toFixed(2)}</td>
                <td className="p-3 text-gray-300">{reps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsDisplay;
