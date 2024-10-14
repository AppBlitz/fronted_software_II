interface Customer {
  id: string;
  nameCustomer: string;
  email: string;
  password: string;
  phoneNumber: string;
  numberIdentification: string;
  image: string;
}


interface LoginCustomer {
  email: string;
  password: string;
}

export type { Customer, LoginCustomer };
