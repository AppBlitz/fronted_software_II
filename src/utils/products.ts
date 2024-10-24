import { api } from "../api/referencie";
import { Products } from "../interface/Product";

let products: Products[] = [];

const fetchProducts = async () => {
  try {
    const response = await api({
      method: "GET",
      url: "/products/all",
    });
    products = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Llama a fetchProducts una vez al inicio para cargar los productos inmediatamente
fetchProducts();

// Llama a fetchProducts cada 60 segundos (60000 milisegundos)
setInterval(fetchProducts, 60000);

const getProducts = () => products;

export { fetchProducts, getProducts };
