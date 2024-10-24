import React from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { columns } from "./columns.ts";
import { Products } from "../../interface/Product.ts";
import { api } from "../../api/referencie.ts";
import {addProduct} from "../../redux/ProductSlice.tsx";
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
      //setData(mockProducts);
    });
}, []);
    const ExpandableRowComponent: React.FC<ExpanderComponentProps<Products>> = (
    data,
  ) => {
    return (
      <div className="p-4 border-t border-gray-200">
        <h1 className="text-lg font-semibold">Detalles</h1>
        <p className="text-gray-600">Proveedor: {/*data.nameSupplier*/}</p>
      </div>
    );
  };

  const handleRowSelected = (state: { selectedRows: Products[] }) => {
    setSelectedRows(state.selectedRows);
  };

  const handleSaveRowSelected = (producto:Products) => {
      if(selectedRows.length > 0){
          selectedRows.forEach(product => {
              product.amountForProduct = producto.amountForProduct;
              dispatch(addProduct(product));

      });
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
          <label className="block text-sm font-medium text-gray-700">Cantidad:</label>
          <input
            type="text"
            placeholder="Cantidad"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
          />

          <p>Selected rows: {selectedRows.length}</p>
          <br/>
          <form onSubmit={handleSubmit(handleSaveRowSelected)}>
                <div>
                    <label>Cantidad: </label>
                    <Input
                        type="number" // Cambia a tipo number para mejor manejo
                        placeholder="cantidad"
                        {...register("amountForProduct", { required: true })} // Asegúrate de que sea requerido si es necesario
                    />
                    {errors.amountForProduct && <span>Este campo es requerido</span>} {/* Mensaje de error */}
                    <button type="submit">Guardar pedido</button> {/* Cambia el tipo a submit */}
                </div>
                <br />
            </form>

        </div>
        <button
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
        >
          Agregar al pedido
        </button>
      </div>
    </div>
  );
}

export { Product };
