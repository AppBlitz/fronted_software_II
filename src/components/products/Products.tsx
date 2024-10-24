import React from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { columns } from "./columns.ts";
import { Products } from "../../interface/Product.ts"
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
      <>
        <h1> Detalles </h1>
        <p>proveedor: {`${data.data.nameSupplier}`}</p>
      </>
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

  }
  return (
      <div className="w-96">
          <DataTable
              title={"products"}
              columns={columns}
              data={data}
              pagination
              paginationPerPage={5}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              expandableRows
              expandableRowsComponent={ExpandableRowComponent}
              fixedHeader
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
  );
}

export {Product};
