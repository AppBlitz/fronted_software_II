import React from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { columns } from "./columns.ts";
import { Products } from "../../interface/Product.ts";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook.tsx";
import { addProduct } from "../../redux/slice/ProductSlice.tsx";
import { setItem } from "../../utils/localStorag.ts";
import { fetchProducts, getProducts } from "../../utils/products.ts";

function Product(): JSX.Element {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<Products[]>([]);
  const products = useAppSelector((state) => state.product);

  React.useEffect(() => {
    setItem("product", products);
  }, [products]);

  fetchProducts().then(() => {
    setData(getProducts());
  });
  const stateProduct = (data: string) => {
    if (data === "ASSET") {
      return "Activo";
    } else {
      return "Inactivo";
    }
  };
  const ExpandableRowComponent: React.FC<ExpanderComponentProps<Products>> = (
    data,
  ) => {
    return (
      <>
        <h1> Detalles </h1>
        <p>proveedor: {`${data.data.nameSupplier}`}</p>
        {data.data.images ? <img src={data.data.images} alt="imagen" /> : <></>}
        <p>Estado: {stateProduct(data.data.stateProduct)}</p>
      </>
    );
  };
  const handleRowSelected = (state: { selectedRows: Products[] }) => {
    const productsI: Products[] = state.selectedRows;
    for (let i = 0; i < productsI.length; i++) {
      dispatch(addProduct(productsI[i]));
    }
  };

  return (
    <div>
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
      <Link to={"/pay"}>Comprar</Link>
    </div>
  );
}

export { Product };
