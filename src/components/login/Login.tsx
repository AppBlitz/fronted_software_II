import { Input } from "@nextui-org/react";
import { api } from "../../api/referencie.ts";
import { LoginCustomer } from "../../interface/Customer.ts";
import { useAppDispatch } from "../../redux/hook.tsx";
import { useForm } from "react-hook-form";
import { addUser } from "../../redux/slice/userSlice.tsx";
import { setItem } from "../../utils/localStorag.ts";
import { useNavigate } from "react-router-dom"

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
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
      })
  }
  return (
    <div className=" w-screen h-screen flex justify-center items-center ">
      <div className="justify-center  py-8">
        <h1 className="text-2xl text-sky-500">Registro </h1>
        <form onSubmit={handleSubmit(customerLogin)}>
          <div>
            <label className="">Correo eléctronico</label>
            <Input
              type="email"
              className="border border-sky-500 "

              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500">
                {" "}
                correo eléctronico requerido
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-500"> correo eléctronico invalido</span>
            )}
          </div>
          <div className="py-3.5">
            <label>Contraseña</label>
            <Input
              className="border border-sky-500"

              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500">Contraseña es requerida</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">minimo 8 caracteres</span>
            )}
          </div>
          <button className="w-full  bg-sky-400 rounded-full min-w-4 max-w-full hover:bg-purple-600 cursor-pointer">

            Acceder
          </button>
        </form>
        <br />
        <button className="w-full bg-sky-500 rounded-full min-w-4 max-w-full hover:bg-purple-500 cursor-pointer" onClick={() => navigate("/profile")}>Perfil</button>
      </div>
    </div>
  );
};

export { Login };
