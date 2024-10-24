import { TableColumn } from "react-data-table-component";
import { Products } from "../../interface/Product.ts";

const columns: TableColumn<Products>[] = [
  {
    name: "Nombre product",
    selector: (row) => row.nameProduct,
    sortable: true,
  },
  {
    name: "Precio",
    selector: (row) => row.priceProduct,
    sortable: true,
  },
  {
    name: "cantidad",
    selector: (row) => row.amountProduct,
    sortable: true,
  },
  {
    name: "Disponible",
    selector: (row) => row.amountProduct,
    sortable: true,
  },
];

export { columns };

const columns2: TableColumn<Products>[] = [
  {
    name: "Nombre product",
    selector: (row) => row.nameProduct,
    sortable: true,
  },
  {
    name: "Precio",
    selector: (row) => row.priceProduct,
    sortable: true,
  },
  {
    name: "cantidad",
    selector: (row) => row.amountProduct,
    sortable: true,
  },
  {
    name: "Disponible",
    selector: (row) => row.amountProduct,
    sortable: true,
  },
];

export { columns2 };
