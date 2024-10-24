import React from "react";
import { api } from "../../api/referencie";
import { Products } from "../../interface/Product";
import { Input } from "@nextui-org/react";

const UpdateProduct = () => {
  const [search, setSearch] = React.useState<string>(""); // Estado para el término de búsqueda
  const [data, setData] = React.useState<Products[]>([]); // Estado para almacenar los productos
  const [showResults, setShowResults] = React.useState<boolean>(false); // Estado para controlar la visualización de resultados

  React.useEffect(() => {
    api({
      method: "GET",
      url: "/products/all",
    })
      .then((answer) => setData(answer.data))
      .catch((error) =>
        console.error("Error al obtener los productos:", error),
      );
  }, []);

  const handleSearch = () => {
    setShowResults(true); // Mostrar resultados cuando se hace clic en el botón
  };

  const filteredProducts = data.filter((product) =>
    product.nameProduct.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre del producto"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Manejo del evento
        />
        <button onClick={handleSearch}>Buscar</button> {/* Botón de búsqueda */}
      </div>

      <div>
        {showResults &&
          filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <div key={product.id}>
              <div>
                <label>Nombre producto</label>
                <Input value={product.nameProduct} />
              </div>
              <p>Precio: ${product.priceProduct}</p>
            </div>
          ))}

        {showResults && filteredProducts.length === 0 && (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </>
  );
};
export { UpdateProduct };
