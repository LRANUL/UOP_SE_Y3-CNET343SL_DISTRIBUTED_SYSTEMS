//Employee = Manager
export class Employee {
    email: string;
    name:
        {
            prefix: string,
            firstName: string,
            middleName: string,
            lastName: string,
        };
    // Prefix: string;
    // FirstName: string;
    // MiddleName: string;
    // LastName: string;
    password?: string;
    retypePassword?: string;
    phone: number;
    address: {
        streetAddress: string;
        city: string;
        postalCode: string
    };
}
