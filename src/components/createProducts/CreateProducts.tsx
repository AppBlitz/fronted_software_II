import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form"
import { Products } from "../../interface/Product";
import { api } from "../../api/referencie";
const CreateProduct = () => {
  const { register, handleSubmit } = useForm<Products>();
  function addProduct(data: Products) {
    api({
      method: "POST",
      url: "",
      data: {
        nameProduct: data.nameProduct,
        nameSupplier: data.nameSupplier,
        priceProduct: data.priceProduct,
        images: data.images,
        stateProduct: "ASSET",
        amountProducts: data.amountProduct,
        amountMinProduct: data.amountMinProduct
      }
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(addProduct)}>
        <div>
          <label>Nombre producto</label>
          <Input type="text" {...register("nameProduct", { required: true })} />
        </div>
        <div>
          <label>Cantidad de productos</label>
          <Input type="number" {...register("amountProduct", { required: true })} />
        </div>
        <div>
          <label>Nombre del proveedor</label>
          <Input type="number" {...register("nameSupplier", { required: true })} />
        </div>
        <div>
          <label>Precio del producto</label>
          <Input type="number" {...register("priceProduct", { required: true })} />
        </div>
        <div>
          <label>Cantidad minima producto</label>
          <Input type="number"{...register("amountMinProduct", { required: true })} />
        </div>
      </form >
    </div>
  );
}

export { CreateProduct }
