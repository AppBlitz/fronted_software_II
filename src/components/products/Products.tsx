import React from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { columns } from "./columns.ts";
import { Products } from "../../interface/Product.ts";
import { api } from "../../api/referencie.ts";
import { addProduct } from "../../redux/ProductSlice.tsx";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hook.tsx";
import { Input } from "@nextui-org/react";

function Product(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Products>();

  const [data, setData] = React.useState<Products[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<Products[]>([]);
  const [quantity, setQuantity] = React.useState<string>("1"); // Guardar cantidad como string para manejar compatibilidad

  const dispatch = useAppDispatch();

  const mockProducts: Products[] = [
    {
      id: "1",
      nameSupplier: "Proveedor A",
      nameProduct: "Producto A",
      priceProduct: 50.0,
      amountProduct: 100,
      amountMinProduct: 10,
      images: "imagenA.jpg",
      amountForProduct: 1,
      stateProduct: "Disponible",
    },
    {
      id: "2",
      nameSupplier: "Proveedor B",
      nameProduct: "Producto B",
      priceProduct: 75.0,
      amountProduct: 50,
      amountMinProduct: 5,
      images: "imagenB.jpg",
      amountForProduct: 2,
      stateProduct: "Disponible",
    },
    {
      id: "3",
      nameSupplier: "Proveedor C",
      nameProduct: "Producto C",
      priceProduct: 30.0,
      amountProduct: 200,
      amountMinProduct: 15,
      images: "imagenC.jpg",
      amountForProduct: 3,
      stateProduct: "No disponible",
    },
  ];

  React.useEffect(() => {
    setData(mockProducts);
    api({
      method: "GET",
      url: "/products/all",
    })
      .then((answer) => setData(answer.data))
      .catch(() => {
        // En caso de error, usamos los productos quemados
        // setData(mockProducts);
      });
  }, []);

  const ExpandableRowComponent: React.FC<ExpanderComponentProps<Products>> = (data) => {
    return (
      <div className="p-4 border-t border-gray-200">
        <h1 className="text-lg font-semibold">Detalles</h1>
        <p className="text-gray-600">Proveedor: {/*data.nameSupplier*/}</p>
      </div>
    );
  };

  const handleRowSelected = (state: { selectedRows: Products[] }) => {
    setSelectedRows(state.selectedRows);
    if (state.selectedRows.length > 0) {
      setQuantity(state.selectedRows[0].amountForProduct.toString()); // Actualiza `quantity` con el producto seleccionado
    }
  };

  const handleSaveRowSelected = () => {
    if (selectedRows.length > 0) {
      const selectedQuantity = Number(quantity);

      data.map((product) => {
        if (selectedRows.some((row) => row.id === product.id)) {
          const newAmountProduct =selectedQuantity;
          product.amountForProduct = product.amountProduct;
          product.amountProduct = newAmountProduct >= 0 ? newAmountProduct : 0; // Descontar cantidad

          dispatch(addProduct(product)); // Agregar a la tabla de pedido
        }
        return product;
      });

      setSelectedRows([]); // Limpiar selección
      
      const updatedProducts = data.map((product) => {
        // Crear una copia de cada producto seleccionado y actualizar `amountProduct`
        const updatedProduct = { ...product };
        if (selectedRows.some((row) => row.id === product.id)) {
          const newAmountProduct = updatedProduct.amountForProduct - selectedQuantity;
          updatedProduct.amountProduct = newAmountProduct >= 0 ? newAmountProduct :0;
          
        }
        return updatedProduct;
      });

      // Actualizar el estado de `data` con las cantidades modificadas
      setData(updatedProducts);
      setSelectedRows([]); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
        <h1 className="text-xl font-bold mb-4">Productos</h1>
        <DataTable
          title=""
          columns={columns}
          data={data}
          pagination
          paginationPerPage={5}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          expandableRows
          expandableRowsComponent={ExpandableRowComponent}
          fixedHeader
          className="mb-4"
        />
        <p className="text-gray-700 mb-2">Filas seleccionadas: {selectedRows.length}</p>
        <div className="mb-4">
          <form onSubmit={handleSubmit(handleSaveRowSelected)}>
            <div>
              <label>Cantidad: </label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Cantidad"
              />
              {errors.amountForProduct && <span>Este campo es requerido</span>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
              >
                Agregar al pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { Product };
