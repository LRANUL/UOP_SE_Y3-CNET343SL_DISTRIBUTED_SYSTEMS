import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface profile{
  id?: string,
  email: string,
  firstName: string,
  middleName: string,
  lastName: string,
  NIC: string,
  address: string,
  phone: string,
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


getUser(id:string)
{
return this.http.get<{message: string, users}>('http://localhost:5000/api/users/' + id)
}

updateuser(value, id)
{
  this.http.put<{message: string}>('http://localhost:5000/api/users/' + id, value).subscribe((responsestatus) => {
    console.log(responsestatus);
});   
}

getloyality(email:string)
{
  return this.http.get<{message: string, users}>('http://localhost:5000/api/loyalty/' + email)
}

}
