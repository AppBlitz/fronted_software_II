import { Input } from "@nextui-org/react";
import { api } from "../../api/referencie.ts";
import { LoginCustomer } from "../../interface/Customer.ts";
import { useAppDispatch } from "../../redux/hook.tsx";
import { useForm } from "react-hook-form";
import { addUser } from "../../redux/slice/userSlice.tsx";
import { setItem } from "../../utils/localStorag.ts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCustomer>();

  function customerLogin(customer: LoginCustomer) {
    api({
      method: "POST",
      url: "/customers/login",
      data: {
        email: customer.email,
        password: customer.password,
      },
    })
      .then((answer) => {
        if (answer != null) {
          dispatch(addUser(answer.data));
          setItem("user", answer.data);
          alert("¡Bienvenido! Ingreso completado");
          navigate("/product");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-blue-500">
      <div className="py-8 px-6 bg-white rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl text-sky-500 mb-6 text-center">
          inicio sesión
        </h1>
        <form onSubmit={handleSubmit(customerLogin)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <Input
              type="email"
              className="border border-sky-500 w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500">Correo electrónico requerido</span>
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
              className="border border-sky-500 w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400 transition duration-200"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500">Contraseña es requerida</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">Mínimo 8 caracteres</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-sky-400 text-white font-bold py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
          >
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
};

export { Login };
