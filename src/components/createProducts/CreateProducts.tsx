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
      alert("Producto agregado con éxito");
      navigate("/product");
    });
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="font-sans bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-sky-500 text-2xl mb-4">Agregar productos</h1>
        <form onSubmit={handleSubmit(addProduct)} className="pb-6">
          <div className="mb-4">
            <label className="block text-gray-700">Nombre producto</label>
            <Input
              className="border border-gray-300 focus:border-sky-500 focus:ring focus:ring-sky-200 transition duration-200"
              type="text"
              {...register("nameProduct", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cantidad de productos</label>
            <Input
              className="border border-gray-300 focus:border-sky-500 focus:ring focus:ring-sky-200 transition duration-200"
              type="number"
              min={"0"}
              {...register("amountProduct", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre del proveedor</label>
            <Input
              className="border border-gray-300 focus:border-sky-500 focus:ring focus:ring-sky-200 transition duration-200"
              type="text"
              {...register("nameSupplier", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio del producto</label>
            <Input
              className="border border-gray-300 focus:border-sky-500 focus:ring focus:ring-sky-200 transition duration-200"
              type="number"
              min="0"
              {...register("priceProduct", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Cantidad mínima producto
            </label>
            <Input
              className="border border-gray-300 focus:border-sky-500 focus:ring focus:ring-sky-200 transition duration-200"
              type="number"
              min="0"
              {...register("amountMinProduct", { required: true })}
            />
          </div>
          <button className="transition bg-sky-500 rounded-full w-full mt-4 text-white hover:bg-sky-600 hover:-translate-y-1 hover:shadow-lg duration-300 p-2">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export { CreateProduct };
