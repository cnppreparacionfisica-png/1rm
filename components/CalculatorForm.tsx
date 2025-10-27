
import React, { useState } from 'react';
import type { CalculationInput } from '../types';

interface CalculatorFormProps {
  onCalculate: (data: CalculationInput) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps, 10);

    if (!exercise.trim() || !weight || !reps) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (isNaN(weightNum) || isNaN(repsNum) || weightNum <= 0 || repsNum <= 0) {
      setError('El peso y las repeticiones deben ser números positivos.');
      return;
    }

    setError('');
    onCalculate({ exercise, weight: weightNum, reps: repsNum });
    // setExercise('');
    // setWeight('');
    // setReps('');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Calcular 1RM</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="exercise" className="block text-sm font-medium text-gray-300 mb-1">
            Ejercicio
          </label>
          <input
            type="text"
            id="exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            placeholder="Ej: Press de Banca"
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-1">
            Peso (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            step="0.5"
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="reps" className="block text-sm font-medium text-gray-300 mb-1">
            Repeticiones al fallo
          </label>
          <input
            type="number"
            id="reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="5"
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
        >
          Calcular
        </button>
      </form>
    </div>
  );
};

export default CalculatorForm;
