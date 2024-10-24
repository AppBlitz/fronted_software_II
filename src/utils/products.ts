import { useEffect, useState } from "react";
import { api } from "../api/referencie";
import { Products } from "../interface/Product";

const useProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api({
        method: "GET",
        url: "/products/all",
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Cargar productos al inicio
    const interval = setInterval(fetchProducts, 60000); // Actualizar cada 60 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return products; // Devolver la lista de productos
};

export default useProducts;
