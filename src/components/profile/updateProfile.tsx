import { api } from "../../api/referencie.ts";
import { Customer } from "../../interface/Customer.ts";
import {addUser} from "../../redux/slice/userSlice.tsx";
import {useAppDispatch} from "../../redux/hook.tsx";


const updateProfile = (customer: Customer) => {

    const dispatch = useAppDispatch();
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
    });
};
export { updateProfile };