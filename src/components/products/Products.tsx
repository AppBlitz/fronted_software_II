import React from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { columns } from "./columns.ts";
import { Products } from "../../interface/Product.ts"
import { api } from "../../api/referencie.ts";
import {addProduct} from "../../redux/ProductSlice.tsx";
import { useAppDispatch } from "../../redux/hook.tsx";

function Product(): JSX.Element {
    const [data, setData] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState<Products[]>([]);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
    api({
      method: "GET",
      url: "/products/all",
    }).then((answer) => setData(answer.data));
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

  const handleSaveRowSelected = () => {
      if(selectedRows.length > 0){
          selectedRows.forEach(product => {
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
          <div>

              <label> Cantidad: </label>
              <input type="text" placeholder=" cantidad "/>
          <br/>
          </div>
          <button onClick={handleSaveRowSelected}>Agregar al pedido</button>
      </div>
  );
}

export {Product};
