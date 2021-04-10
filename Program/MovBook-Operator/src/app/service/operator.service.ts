import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmailValidator } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OperatorService {

  private BASE_URL = environment.MOVBOOK_BACKEND_URL;

  constructor(public http: HttpClient) { }

  getMovies() {
    return this.http.get(this.BASE_URL + "api/movies");
  }
  getOfferStatus() {
    return this.http.get(this.BASE_URL + "api/offer-status");
  }
  setOfferStatus(value) {
    return this.http.get(this.BASE_URL + "api/offer?value=" + value);
  }
  getMaintenanceStatus() {
    return this.http.get(this.BASE_URL + "api/maintenance-status");
  }
  setMaintenanceStatus(value) {
    return this.http.get(this.BASE_URL + "api/maintenance?value=" + value);
  }
  getBeverages() {
    return this.http.get(this.BASE_URL + "api/refreshments");
  }
  async getMessages() {
    return await this.http.get(this.BASE_URL + "api/messages/new");
  }
  sendMessage(messageID, messageBody) {
    const body = { _id: messageID, response: messageBody, status: 'reply' };
    return this.http.put<any>(this.BASE_URL + "api/messages/reply", body);
  }
  getProfile(email) {
    return this.http.get(this.BASE_URL + "api/operators?email=" + email);
  }
  getMovie(movieTitle) {
    return this.http.get(this.BASE_URL + "api/movie?title=" + movieTitle);
  }
  updateEmail(oldEmail, newEmail){
    const body = { oldEmail: oldEmail, newEmail: newEmail };
    return this.http.put<any>(this.BASE_URL + "api/operators/update", body);

  }
  updateStock(name, quantity) {
    const body = { name: name, quantity: quantity };
    return this.http.put<any>(this.BASE_URL + "api/refreshments/update", body);
  }
  createBooking(movieTitle, Time, Status) {
    return this.http
      .post<any>(this.BASE_URL + "api/booking", {
        title: movieTitle,
        time: Time,
        status: Status,
      })
      .subscribe(
        (response) => console.log(response),
        (err) => console.log(err)
      );
  }
}