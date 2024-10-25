import { Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Products } from "../../interface/Product";
import { api } from "../../api/referencie";

const UpdateProduct: React.FC = () => {
  const [dataProduct, setDataProduct] = useState<Products[] | null>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  const searchProduct = () => {
    if (dataProduct) {
      const filteredProduct = dataProduct.find((product) =>
        Object.values(product).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setSelectedProduct(filteredProduct || null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdateProduct = () => {
    if (selectedProduct) {
      api({
        method: "PUT",
        url: `/products/update/${selectedProduct.id}`,
        data: selectedProduct,
      })
        .then((response) => {
          console.log("Product updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    }
  };

  useEffect(() => {
    api({
      method: "GET",
      url: "/products/all",
    }).then((answer) => setDataProduct(answer.data));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <Input
          type="text"
          name="search"
          onChange={handleInputChange}
          placeholder="Enter product attribute to search"
          className="border rounded-md p-2 w-full"
        />
        <button
          onClick={searchProduct}
          className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200"
        >
          Find Product
        </button>
      </div>
      {selectedProduct && (
        <div className="space-y-4">
          {[
            { label: "Nombre del Proveedor", name: "nameSupplier", type: "text" },
            { label: "Nombre del Producto", name: "nameProduct", type: "text" },
            { label: "Precio del Producto", name: "priceProduct", type: "number" },
            { label: "Cantidad del Producto", name: "amountProduct", type: "number" },
            { label: "Cantidad Mínima del Producto", name: "amountMinProduct", type: "number" },
            { label: "Imágenes del Producto", name: "images", type: "text" },
            { label: "Cantidad para el Producto", name: "amountForProduct", type: "number" },
            { label: "Estado del Producto", name: "stateProduct", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block mb-1 font-semibold">{label}</label>
              <Input
                type={type}
                name={name}
                value={selectedProduct[name]}
                onChange={handleFieldChange}
                placeholder={label}
                className="border rounded-md p-2 w-full"
              />
            </div>
          ))}
          <button
            onClick={handleUpdateProduct}
            className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-200"
          >
            Update Product
          </button>
        </div>
      )}
    </div>
  );
};

export { UpdateProduct };
