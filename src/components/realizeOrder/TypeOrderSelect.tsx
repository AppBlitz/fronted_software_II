import React, { useState } from 'react';

const TipoPedidoSelect = () => {
  const [tipoPedido, setTipoPedido] = useState('');

  const opcionesTipoPedido = [
    { value: 'envio', label: 'envio' },
    { value: 'entrega', label: 'entrega' },
  ];

  const manejarCambio = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoPedido(event.target.value);
  };

  return (
    <div>
      <label htmlFor="tipo-pedido">Tipo de Pedido:</label>
      <select id="tipo-pedido" value={tipoPedido} onChange={manejarCambio}>
        <option value="">Seleccione un tipo de pedido</option>
        {opcionesTipoPedido.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
      {}
      {tipoPedido && <p>Tipo de pedido seleccionado: {tipoPedido}</p>}
    </div>
  );
};

export default TipoPedidoSelect;