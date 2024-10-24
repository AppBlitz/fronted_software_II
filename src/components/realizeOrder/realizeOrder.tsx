import{ Product } from "../index.ts";
import { useSelector } from "react-redux";
import {selectProducts} from "../../redux/ProductSlice.tsx";
import DataTable, {ExpanderComponentProps} from "react-data-table-component";
import {columns} from "../products/columns.ts";
import React from "react";
import {Products} from "../../interface/Product.ts";
import {api} from "../../api/referencie.ts";
import {useNavigate} from "react-router-dom";
import { Input } from "@nextui-org/react";
import { useAppDispatch } from "../../redux/hook.tsx";
import { useForm } from "react-hook-form";
import {Order} from "../../interface/Order.ts"
import TipoPedidoSelect from "./TypeOrderSelect.tsx"


const Table =()=>{
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

            products.forEach(product => {
                monto += product.priceProduct;
            });
            setSelectedRows([]);
        
        // Realiza el cálculo del total aquí
        // Puedes acceder al valor del campo de texto usando "monto"
        // Por ejemplo, si el total es el monto * 1.1
        const total = monto * 1;
        alert("El total es: " + total);
    }

    
    function order(pedido: Order){
    api({
        method: "POST",
        url: "/pedidos/guardarpedido",
        data: {
            "fecha": pedido.fecha,
            "total": pedido.total,
            "tipo": TipoPedidoSelect.name,
            "direccion": pedido.direccion,
            "hora": pedido.hora,
            "estado": "EN_PROCESO",
            "DetailProduct": pedido.DetailProduct

        },
    }).then(() => {
        alert("orden agregada con exito");
        navigate("/pedidos");
    });}

    return (
        <div>
            <Product/>
            <br/>
            <form onSubmit={handleSubmit(order)}>
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
                <TipoPedidoSelect/>
                <br />
                <br />
            
                <div>
                  <label>Direccion: </label>
                  <Input
                    type="text"
                    placeholder=" dirección"
                    {...register("direccion")}
                  />
                </div>
                <div>
                  <label>Hora: </label>
                  <Input
                    type="text"
                    placeholder=" hora"
                    {...register("hora")}
                  />
                </div>
                <br />
                
                    </div>
                </div>
                
            </div>
            <div>
                <button onClick={calcularTotal} {...register("total")} >Calcular Total</button>
            </div>
            
            <br/>
            <button> Guardar</button>
            </form>
        </div>
        
    );
}
export {Table}