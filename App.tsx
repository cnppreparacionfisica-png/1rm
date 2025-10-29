import React, { useState, useEffect, useCallback } from 'react';
import type { Calculation, CalculationInput } from './types';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import HistoryList from './components/HistoryList';
import Instructions from './components/Instructions';
import { calculate1RM } from './utils/formulas';

const App: React.FC = () => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [activeCalculation, setActiveCalculation] = useState<Calculation | null>(null);

  useEffect(() => {
    try {
      const storedCalculations = localStorage.getItem('rmCalculations');
      if (storedCalculations) {
        const parsedCalculations = JSON.parse(storedCalculations) as Calculation[];
        setCalculations(parsedCalculations);

        const storedActiveId = localStorage.getItem('rmActiveCalculationId');
        if (storedActiveId) {
          const activeCalc = parsedCalculations.find(c => c.id === storedActiveId);
          if (activeCalc) {
            setActiveCalculation(activeCalc);
          }
        }
      }
    } catch (error) {
      console.error("Failed to load calculations from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('rmCalculations', JSON.stringify(calculations));
      if (activeCalculation) {
        localStorage.setItem('rmActiveCalculationId', activeCalculation.id);
      } else {
        localStorage.removeItem('rmActiveCalculationId');
      }
    } catch (error) {
      console.error("Failed to save calculations to local storage", error);
    }
  }, [calculations, activeCalculation]);

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
    setActiveCalculation(newCalculation);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setCalculations(prev => prev.filter(calc => calc.id !== id));
    if (activeCalculation?.id === id) {
      setActiveCalculation(null);
    }
  }, [activeCalculation]);

  const handleSelect = useCallback((calculation: Calculation) => {
    setActiveCalculation(calculation);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <main className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 md:mb-12 flex flex-col items-center">
          <img 
            src="https://strapi.ibicopsacademiapmm.com/uploads/large_hades_APUNTES_8c4333ee0a.jpg" 
            alt="Hades Academia de Policía Logo" 
            className="w-full max-w-lg mx-auto mb-6 rounded-md shadow-lg"
          />
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
            <ResultsDisplay calculation={activeCalculation} />
            <HistoryList 
              calculations={calculations} 
              onDelete={handleDelete}
              onSelect={handleSelect}
              activeCalculation={activeCalculation}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm mt-8">
        <p>Elaborado por David Calvo, preparador físico de alto rendimiento. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
