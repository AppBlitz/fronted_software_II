import{ Product } from "../index.ts";
import { useSelector } from "react-redux";
import {selectProducts} from "../../redux/ProductSlice.tsx";
import DataTable, {ExpanderComponentProps} from "react-data-table-component";
import {columns} from "../products/columns.ts";
import React from "react";
import {Products} from "../../interface/Product.ts";
import {api} from "../../api/referencie.ts";
import {useNavigate} from "react-router-dom";

const Table =()=>{

    const [data, setData] = React.useState<Products[]>([]);
    const [selectedRows, setSelectedRows] = React.useState<Products[]>([]);

    const products = useSelector(selectProducts)

    React.useEffect(() => {
        setData(products);
    }, [products]);

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

    function calcularTotal() {
        let monto = 0;
        if(selectedRows.length > 0){
            products.forEach(product => {
                monto += product.priceProduct;
            });
            setSelectedRows([]);
        }
        // Realiza el cálculo del total aquí
        // Puedes acceder al valor del campo de texto usando "monto"
        // Por ejemplo, si el total es el monto * 1.1
        const total = monto * 1;
        alert("El total es: " + total);
    }
        const navigate = useNavigate();
    function order(){
    api({
        method: "POST",
        url: "/pedidos/guardarpedido",
        data: {
        /*    "total":  // Calcular el total
            "tipo": , // Establecer el tipo de pedido
            "direccion": "Dirección del pedido", // Establecer la dirección
            "hora": "2023-10-10T12:00:00", // Ejemplo de hora, deberías reemplazarlo por LocalDateTime.now()
            "estado": "ACTIVE", // Estado inicial del pedido
            "DetailProduct": [
                {
                    "nameProduct": data.nameProduct, // Nombre del producto
                    "nameSupplier": data.nameSupplier, // Nombre del proveedor
                    "priceProduct": data.priceProduct, // Precio del producto
                    "images": data.images, // Imágenes del producto
                    "stateProduct": "ASSET", // Estado del producto
                    "amountProducts": data.amountProduct, // Cantidad de productos
                    "amountMinProduct": data.amountMinProduct // Cantidad mínima de productos
                }
            ]*/
        },
    }).then(() => {
        alert("orden agregada con exito");
        navigate("/pedidos");
    });}

    return (
        <div>
            <Product/>
            <br/>
            <div style={{display: 'flex'}}>
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
                </div>
                <div style={{marginLeft: '20px'}}>
                    <div>
                        <select>
                            <option> TipoPedido </option>
                        </select>
                        <br/>
                        <br/>
                        <div>
                            <label>Direccion: </label>
                            <input type="text" placeholder=" dirección"/>
                        </div>
                        <div>
                            <label>Hora: </label>
                            <input type="text" placeholder=" hora"/>
                        </div>
                        <br/>
                        <div>
                            <label>Name: </label>
                            <input type="text" placeholder=" cedula"/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <input id="monto" type="text" placeholder="Monto"/>
                <button onClick={calcularTotal} >Calcular Total</button>
            </div>
            <br/>
            <button onClick={order}>Guardar</button>
        </div>
    );
}
export {Table}