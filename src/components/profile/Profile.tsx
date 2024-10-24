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
    <div className=" w-screen h-screen flex justify-center items-center ">
      <div>
        <h1>Perfil</h1>
        <form onSubmit={handleSubmit(updateUser)}>
          <div>
            <label>Nombre</label>
            <Input
              placeholder={`${user.nameCustomer}`}
              {...register("nameCustomer", { required: true })}
            />
          </div>
          <div>
            <label>Correo eléctronico</label>
            <Input placeholder={`${user.email}`} {...register("email")} />
          </div>
          <div>
            <label>Contraseña</label>
            <Input placeholder={`${user.password}`} {...register("password")} />
          </div>
          <div>
            <label>Telefono</label>
            <Input
              placeholder={`${user.phoneNumber}`}
              {...register("phoneNumber")}
            />
          </div>
          <div>
            <label>Numéro de identificación</label>
            <Input
              placeholder={`${user.numberIdentification}`}
              {...register("numberIdentification")}
            />
          </div>
          <button> Actualizar</button>
        </form>
        <button onClick={() => deleteUser()}>Eliminar</button>
      </div>
    </div>
  );
};

export { Profile };
