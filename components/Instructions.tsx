
import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">¿Cómo Funciona?</h2>
      <div className="space-y-4 text-gray-300">
        <div>
          <h3 className="font-semibold text-blue-300 mb-1">Paso 1: Realiza tu serie</h3>
          <p className="text-sm">
            Después de un buen calentamiento, elige un ejercicio y un peso que te permita hacer entre 2 y 10 repeticiones antes de llegar al fallo muscular técnico (el punto donde no puedes hacer otra repetición con buena forma).
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-blue-300 mb-1">Paso 2: Introduce los datos</h3>
          <p className="text-sm">
            Escribe el nombre del ejercicio, el peso que levantaste y el número total de repeticiones completadas en el formulario.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-blue-300 mb-1">Paso 3: Analiza los resultados</h3>
          <p className="text-sm">
            La aplicación calculará tu 1RM estimado y te mostrará una tabla con los pesos correspondientes a diferentes porcentajes, ideal para planificar tus próximas sesiones de entrenamiento.
          </p>
        </div>
        <div className="pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400">
                <strong>Importante:</strong> La seguridad es lo primero. Considera entrenar con un compañero o "spotter" cuando levantes pesos pesados. Este cálculo es una estimación.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
