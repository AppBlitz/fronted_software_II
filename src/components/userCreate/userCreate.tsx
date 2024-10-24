import { useForm } from "react-hook-form";
import { createCustomer } from "../../interface/Customer";
import { api } from "../../api/referencie";
import { Input } from "@nextui-org/react";

const CreateUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<createCustomer>();

  const addUser = async (customer: createCustomer) => {
    try {
      const response = await api({
        method: "POST",
        url: "/customers/customer/create",
        data: {
          nameCustomer: customer.nameCustomer,
          email: customer.email,
          password: customer.password,
          numberIdentification: customer.numberIdentification,
          numberPhone: customer.phoneNumber,
          image: customer.image,
        },
      });
      // Manejo de respuesta exitosa (por ejemplo, redirigir o mostrar un mensaje)
      console.log("Usuario creado:", response.data);
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-sky-500 mb-6 text-center">
          Crear Usuario
        </h1>
        <form onSubmit={handleSubmit(addUser)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <Input
              type="text"
              {...register("nameCustomer", { required: true })}
              className={`border ${errors.nameCustomer ? "border-red-500" : "border-sky-500"} w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200`}
            />
            {errors.nameCustomer && (
              <span className="text-red-500">Nombre es requerido</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <Input
              type="email"
              {...register("email", {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                required: true,
              })}
              className={`border ${errors.email ? "border-red-500" : "border-sky-500"} w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200`}
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500">
                Correo electrónico es requerido
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-500">Correo electrónico inválido</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <Input
              type="password"
              {...register("password", { required: true })}
              className={`border ${errors.password ? "border-red-500" : "border-sky-500"} w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200`}
            />
            {errors.password && (
              <span className="text-red-500">Contraseña es requerida</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Imagen (URL)
            </label>
            <Input
              type="text"
              {...register("image")}
              className={`border border-sky-500 w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200`}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Número de Teléfono
            </label>
            <Input
              type="text"
              {...register("phoneNumber", { required: true })}
              className={`border ${errors.phoneNumber ? "border-red-500" : "border-sky-500"} w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200`}
            />
            {errors.phoneNumber && (
              <span className="text-red-500">
                Número de teléfono es requerido
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Número de Identificación
            </label>
            <Input
              type="text"
              {...register("numberIdentification", { required: true })}
              className={`border ${errors.numberIdentification ? "border-red-500" : "border-sky-500"} w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200`}
            />
            {errors.numberIdentification && (
              <span className="text-red-500">
                Número de identificación es requerido
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-sky-400 text-white font-bold py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export { CreateUser };
