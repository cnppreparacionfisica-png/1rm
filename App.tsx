
import React, { useState, useEffect, useCallback } from 'react';
import type { Calculation, CalculationInput } from './types';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import HistoryList from './components/HistoryList';
import Instructions from './components/Instructions';
import { calculate1RM } from './utils/formulas';

const App: React.FC = () => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [lastCalculation, setLastCalculation] = useState<Calculation | null>(null);

  useEffect(() => {
    try {
      const storedCalculations = localStorage.getItem('rmCalculations');
      if (storedCalculations) {
        setCalculations(JSON.parse(storedCalculations));
      }
    } catch (error) {
      console.error("Failed to load calculations from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('rmCalculations', JSON.stringify(calculations));
    } catch (error) {
      console.error("Failed to save calculations to local storage", error);
    }
  }, [calculations]);

  const handleCalculate = useCallback((data: CalculationInput) => {
    const oneRepMax = calculate1RM(data.weight, data.reps);
    const newCalculation: Calculation = {
      id: `${Date.now()}-${data.exercise}`,
      exercise: data.exercise,
      weight: data.weight,
      reps: data.reps,
      oneRepMax: oneRepMax,
      timestamp: Date.now(),
    };
    
    setCalculations(prev => [newCalculation, ...prev]);
    setLastCalculation(newCalculation);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setCalculations(prev => prev.filter(calc => calc.id !== id));
    if (lastCalculation?.id === id) {
      setLastCalculation(null);
    }
  }, [lastCalculation]);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <main className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Calculadora de 1RM
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Estima tu fuerza máxima, guarda tu progreso y planifica tus entrenamientos.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-8">
            <Instructions />
            <CalculatorForm onCalculate={handleCalculate} />
          </div>

          <div className="lg:col-span-8 space-y-8">
            {lastCalculation && <ResultsDisplay calculation={lastCalculation} />}
            <HistoryList calculations={calculations} onDelete={handleDelete} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm mt-8">
        <p>Creado para entusiastas del fitness.</p>
      </footer>
    </div>
  );
};

export default App;
