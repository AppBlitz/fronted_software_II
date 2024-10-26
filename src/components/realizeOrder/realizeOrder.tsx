import { Product } from "../index.ts";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/ProductSlice.tsx";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { columns } from "../products/columns.ts";
import React from "react";
import { Products } from "../../interface/Product.ts";
import { api } from "../../api/referencie.ts";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";
import { useAppDispatch } from "../../redux/hook.tsx";
import { useForm } from "react-hook-form";
import { Order } from "../../interface/Order.ts"
import { useState } from 'react';


const Table = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const products = useSelector(selectProducts);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Order>();

    const [data, setData] = React.useState<Products[]>([]);
    const [selectedRows, setSelectedRows] = React.useState<Products[]>([]);
    const [total, setTotal] = React.useState<number>(0);
    const [tipoPedido, setTipoPedido] = useState('');
      
        const opcionesTipoPedido = [
          { value: 'envio', label: 'envio' },
          { value: 'entrega', label: 'entrega' },
        ];
      
        const manejarCambio = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setTipoPedido(event.target.value);
        };

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

        products.forEach((product) => {
            monto += product.priceProduct * product.amountProduct;
        });

        setTotal(monto); // Guardar el total en el estado
        return monto;
    }


    function order(pedido: Order) {
        const now = new Date();
        api({
            method: "POST",
            url: "/pedidos/guardarPedido",
            data: {
                "fecha": new Date().toISOString().split('T')[0],
                "total": total,
                "tipo": tipoPedido,
                "direccion": pedido.direccion,
                "hora": now.toLocaleString('sv-SE', { timeZoneName: 'short' }).replace(' ', 'T').replace(/T\d\d:\d\d:\d\d.*/, 'T' + now.toTimeString().substring(0, 8)),

                "estado": "UNDELIVERED",
                "DetailProduct": products,

            },
        }).then(() => {
            alert("orden agregada con exito");
            navigate("/pedido");
        });
    }

    return (
        <div>
            <Product />

            <br />

            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
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
                        <div>
                            <button onClick={calcularTotal} >Calcular Total</button>
                            <div><span style={{ marginLeft: '10px' }}> Total: ${total}</span></div>
                        </div>
                        <p className="text-gray-700 mb-2">Filas seleccionadas: {selectedRows.length}</p>
                    </div>
                </div>

                <div style={{ marginLeft: '20px', flex: 1 }}>
                    
                    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 p-6 flex items-center justify-center">
                        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
                            <h1 className="text-xl font-bold mb-4">detalles Pedido</h1>
                            <div>
                                <div>
                                    <label htmlFor="tipo-pedido">Tipo de Pedido:</label>
                                    <select id="tipo-pedido" value={tipoPedido} onChange={manejarCambio}>
                                        <option value="">Seleccione un tipo de pedido</option>
                                        {opcionesTipoPedido.map((opcion) => (
                                            <option key={opcion.value} value={opcion.value}>
                                                {opcion.label}
                                            </option>
                                        ))}
                                    </select>
                                    { }
                                    {tipoPedido && <p>Tipo de pedido seleccionado: {tipoPedido}</p>}
                                </div>
                                <br />
                                <br />
                                <form onSubmit={handleSubmit(order)}>
                                    <div>
                                        <label>Direccion: </label>
                                        <Input
                                            type="text"
                                            placeholder=" dirección"
                                            {...register("direccion")}
                                        />
                                    </div>
                                    <br />
                                    <button onClick={calcularTotal}>Guardar</button>
                                </form>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>);
}
export { Table }