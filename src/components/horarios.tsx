import React, { useState } from 'react';

interface HorarioProps {
  fecha: Date;
}

const Horarios: React.FC<HorarioProps> = ({ fecha }) => {
  const [state, setState] = useState<null | string>(null);

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      console.error(err.message);
    }
  };

  const handleSomeAction = () => {
    try {
      // Acción que puede producir un error
      throw new Error("Ejemplo de error");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <h1>Horarios para {fecha.toDateString()}</h1>
      <button onClick={handleSomeAction}>Ejecutar acción</button>
    </div>
  );
};

export default Horarios;
