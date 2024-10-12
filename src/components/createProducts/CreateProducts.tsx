import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Products } from "../../interface/Product";
import { api } from "../../api/referencie";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Products>();

  function addProduct(data: Products) {
    api({
      method: "POST",
      url: "/products/add/product",
      data: {
        nameProduct: data.nameProduct,
        nameSupplier: data.nameSupplier,
        priceProduct: data.priceProduct,
        images: data.images,
        stateProduct: "ASSET",
        amountProducts: data.amountProduct,
        amountMinProduct: data.amountMinProduct,
      },
    }).then(() => {
      alert("Producto agregado con exito");
      navigate("/product");
    });
  }
  return (
    <div className="  w-screen h-screen flex justify-center items-center ">
      <div className="font-sans">
        <h1 className="text-sky-500 ">Agregar productos</h1>
        <form onSubmit={handleSubmit(addProduct)} className="pb-6">
          <div>
            <label>Nombre producto</label>
            <Input
              className="border border-black"
              type="text"
              {...register("nameProduct", { required: true })}
            />
          </div>
          <div>
            <label>Cantidad de productos</label>
            <Input
              className="border border-black"
              type="number"
              min={"0"}
              {...register("amountProduct", { required: true })}
            />
          </div>
          <div>
            <label>Nombre del proveedor</label>
            <Input
              className="border border-black"
              type="text"
              {...register("nameSupplier", { required: true, min: 0 })}
            />
          </div>
          <div>
            <label>Precio del producto</label>
            <Input
              className="border border-black"
              type="number"
              min="0"
              {...register("priceProduct", { required: true })}
            />
          </div>
          <div>
            <label>Cantidad minima producto</label>
            <Input
              className="border border-black"
              type="number"
              min="0"
              {...register("amountMinProduct", { required: true })}
            />
          </div>
          <button className="transition bg-sky-500 rounded-full w-full  mt-2  text-white hover:-translate-y-1 hover:duration-500 ">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export { CreateProduct };
