interface Customer {
  nameCustomer: string;
  email: string;
  password: string;
}

interface LoginCustomer {
  email: string;
  password: string;
}

export type { Customer, LoginCustomer };
