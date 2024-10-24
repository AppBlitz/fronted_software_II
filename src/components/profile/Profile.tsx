import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Customer } from "../../interface/Customer";
import { useAppSelector, useAppDispatch } from "../../redux/hook.tsx";
import { deleteProfile } from "./deleteProdile.ts";
import { api } from "../../api/referencie.ts";
import { addUser } from "../../redux/slice/userSlice.tsx";
import { setItem } from "../../utils/localStorag.ts";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { register, handleSubmit } = useForm<Customer>();

  const deleteUser = () => {
    deleteProfile(user.id);
  };

  const updateUser = (customer: Customer) => {
    api({
      method: "PUT",
      url: "/customers/update",
      data: {
        nameCustomer: customer.nameCustomer,
        password: customer.password,
        idCustomer: customer.id,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
        image: customer.image,
        numberIdentification: customer.numberIdentification,
      },
    }).then((answer) => {
      dispatch(addUser(answer.data));
      setItem("user", answer.data);
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-sky-500 mb-6 text-center">
          Perfil
        </h1>
        <form onSubmit={handleSubmit(updateUser)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <Input
              placeholder={user.nameCustomer}
              {...register("nameCustomer", { required: true })}
              className="border border-sky-500 w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <Input
              placeholder={user.email}
              {...register("email")}
              className="border border-sky-500 w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <Input
              placeholder="********"
              {...register("password")}
              type="password"
              className="border border-sky-500 w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <Input
              placeholder={user.phoneNumber}
              {...register("phoneNumber")}
              className="border border-sky-500 w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Número de identificación
            </label>
            <Input
              placeholder={user.numberIdentification}
              {...register("numberIdentification")}
              className="border border-sky-500 w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-400 text-white font-bold py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
          >
            Actualizar
          </button>
        </form>
        <button
          onClick={deleteUser}
          className="mt-4 w-full bg-red-500 text-white font-bold py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export { Profile };
