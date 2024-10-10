import React from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { columns } from "./columns.ts";
import { Products } from "../../interface/Product.ts";
import { Link } from "react-router-dom";
import { api } from "../../api/referencie.ts";

function Product(): JSX.Element {
  const [data, setData] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState<Products[]>([]);
  React.useEffect(() => {
    api({
      method: "GET",
      url: "/products/all",
    }).then((answer) => setData(answer.data));
  }, [data]);
  const ExpandableRowComponent: React.FC<ExpanderComponentProps<Products>> = (
    data,
  ) => {
    return (
      <>
        <h1> Detalles </h1>
        <p>proveedor: {`${data.data.nameSupplier}`}</p>
        {data.data.images ? <img src={data.data.images} alt="imagen" /> : <></>}
      </>
    );
  };
  const handleRowSelected = (state: { selectedRows: Products[] }) => {
    setSelectedRows(state.selectedRows);
  };
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
      <Link to={"/buy"}>Comprar</Link>
    </div>
  );
}

export { Product };
