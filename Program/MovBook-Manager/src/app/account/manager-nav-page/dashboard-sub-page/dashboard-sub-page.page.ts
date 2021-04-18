import { Component, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { Chart } from 'chart.js';
import { ManagerService } from 'src/app/services/account/manager.service';
import { AlertController, ModalController } from '@ionic/angular';
import { MovieDetailsModalPage } from '../browse-upcoming-movies-sub-page/movie-details-modal/movie-details-modal.page';

@Component({
  selector: 'app-dashboard-sub-page',
  templateUrl: './dashboard-sub-page.page.html',
  styleUrls: ['./dashboard-sub-page.page.scss'],
})
export class DashboardSubPagePage implements OnInit {

  // Declaration - to store count of showing movie slots
  countShowingMoviesSlotsMonths = new Array();

  // Declaration | Initialization - Stores current date and time
  currentDateTime: String;

  // Declaration - to store an array month name for the past six months
  monthNamesSixMonths = new Array();

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerLatestMovies' block
  loadingSpinnerLatestMovies: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerDashboard' block
  loadingSpinnerDashboard: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerMovieShowingsChart' block
  loadingSpinnerMovieShowingsChart: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerBookingsChart' block
  loadingSpinnerBookingsChart: Boolean = false;
  
  // Declaration - to store list of recent movies
  listOfLatestMovies = new Array();

  // Declaration | Initialization - to store count of movies as 'WaitListed'
  countOfMoviesWaitListed: Number = 0;

  // Declaration | Initialization - to store count of movies as 'countOfMoviesUpcoming'
  countOfMoviesUpcoming: Number = 0;

  // Declaration | Initialization - to store count of movies as 'countOfMoviesNowShowing'
  countOfMoviesNowShowing: Number = 0;
  
  // Declaration | Initialization - to store count of cinema halls
  countOfCinemaHalls: Number = 0;

  // Declaration | Initialization - to store count of cinema locations
  countOfCinemaLocations: Number = 0;

  // Declaration | Initialization - to store count of refreshments
  countOfRefreshments: Number = 0;

  // Declaration | Initialization - to store count of enabled operator accounts
  countOfEnabledOperatorAccounts: Number = 0;

  // Declaration | Initialization - to store count of disabled operator accounts
  countOfDisabledOperatorAccounts: Number = 0;
  
  constructor(
    private managerService: ManagerService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    // Initiating the movie showings chart
    this.movieShowingsAreaChart();

    // Retrieving the count of showing movie slot upon page render
    this.retrieveCountOfShowingMoviesMonths();

    // Retrieving the current date time upon page render
    this.getCurrentDateTime();
    
    // Five Second Timer
    interval(5000).subscribe(timer => {
      // Retrieving the current date time upon page render
      this.getCurrentDateTime();
    });

    // Retrieving recent five movies upon page render
    this.retrieveLatestMovies();

    // Retrieving count of movies assigned as 'WaitListed' upon page render
    this.retrieveCountOfMoviesWaitListed();
    
    // Retrieving count of movies assigned as 'Upcoming' upon page render
    this.retrieveCountOfMoviesNowShowing();

    // Retrieving count of movies assigned as 'NowShowing' upon page render
    this.retrieveCountOfCinemaLocations();

    // Retrieving count of cinema halls upon page render
    this.retrieveCountOfCinemaHalls();

    // Retrieving count of cinema locations upon page render
    this.retrieveCountOfMoviesUpcoming();

    // Retrieving count of refreshments (beverages) upon page render
    this.retrieveCountOfRefreshments();

    // Retrieving count of enabled operator accounts upon page render
    this.retrieveCountOfEnabledAccounts();

    // Retrieving count of disabled operator accounts upon page render
    this.retrieveCountOfDisabledAccounts();

  }

  
  // Latest Movies Slider Configurations
  latestMoviesSliderConfig = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 3,
    initialSlide: 0,
    autoplay: true,
    speed: 1000
  }


  ionViewWillEnter(){
    // Initiating the bookings chart
    this.BookingsAreaChart();
  }


  // Function - Retrieving current data time and generating new format
  // sample: 09:40 AM | Mar 18, 2021
  getCurrentDateTime(){
    let currentDateTimeDate = new Date();
    this.currentDateTime = 
      currentDateTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " | " + 
      currentDateTimeDate.toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
  }


  // Function -  Alert Box Implementation
  async alertNotice (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

  
  // Function - Retrieving count of showing movie slots for each month for the past six months
  retrieveCountOfShowingMoviesMonths(): Promise<any>{

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Assigning 'loadingSpinnerMovieShowingsChart' to true (starts loading spinner)
    this.loadingSpinnerMovieShowingsChart = true;

    return new Promise((resolve,reject)=>{

      // Adding new showing experience
      this.managerService.retrieveCountShowingMonths()
        .subscribe((countShowingMoviesResponse: any) => {

        if(countShowingMoviesResponse.message == "Showing movie slots count retrieved"){
          // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
          this.loadingSpinnerDashboard = false;

          // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
          this.loadingSpinnerMovieShowingsChart = false;

          resolve(countShowingMoviesResponse.countOfShowingMovieSlotsArray);
        }
        else if(countShowingMoviesResponse.message == "Unable to retrieve count of showing movie slots"){
          // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
          this.loadingSpinnerDashboard = false;

          // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
          this.loadingSpinnerMovieShowingsChart = false;

          console.log("Unable to retrieve count of showing movie slots");

          reject(false);
        }
      }, (error: ErrorEvent) => {
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerMovieShowingsChart = false;

        console.log("Unable to retrieve count of showing movie slots: ", error);

        reject(false);
      });
    });

  }


  // Function - Generate month name for the past six months
  generateMonthNames() {

    // Assigning the current date time
    let currentDateTime = new Date();
    // To store generated month name during each iteration in the for loop
    let monthName;
    
    // Extracting the month value from the 'currentDateTime', Sample: Mar
    let month = (new Date(currentDateTime).toLocaleString('default', { month: 'short' }));
    // Extracting the year value from the 'currentDateTime', Sample: 2021
    let year = (new Date(currentDateTime).toLocaleString('default', { year: 'numeric' }));

    // For loop - Initializing 'monthNamesSixMonths' array elements
    for (let monthNameIndex = 0; monthNameIndex < 7; monthNameIndex++)
      this.monthNamesSixMonths[monthNameIndex] = "";
      
    // For loop - Iterating through the past six months to generate the month names and assign to the 
    // 'monthNamesSixMonths' array
    for (let monthIndex = 6; monthIndex >= 0; monthIndex--) {

      // After the one iteration has completed the date value will decrement one month in each iteration
      if(monthIndex != 6){
        currentDateTime.setMonth(currentDateTime.getMonth() - 1);
      }
      
      // Extracting the month and year values from the 'currentDateTime', Sample: Mar 2021
      monthName = (new Date(currentDateTime).toLocaleString('default', { month: 'short' })) + " " +
                  (new Date(currentDateTime).toLocaleString('default', { year: 'numeric' }));

      // Assigning the month name to the 'monthNamesSixMonths' array index
      this.monthNamesSixMonths[monthIndex] = monthName;
    }
  }


  // Movie Showing line chart implementation
  movieShowingsLines: any;
  movieShowingsColorArray: any;
  
  @ViewChild('movieShowingsAreaChart', {static: true}) movieShowingsLineChart;

  async movieShowingsAreaChart() {

    // Generating month names for the past six months
    this.generateMonthNames();

    // Waiting until the chart data is retrieved from the database
    await this.retrieveCountOfShowingMoviesMonths().then((countOfShowingMovieSlots) => {

      // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
      this.loadingSpinnerDashboard = true;

      // Configurations for rendering the chart
      this.movieShowingsLines = new Chart(this.movieShowingsLineChart.nativeElement, {
        type: 'line',
        data: {
          labels: this.monthNamesSixMonths,
          datasets: [{
            label: 'Movie Showings',
            fill: false,
            data: countOfShowingMovieSlots,
            borderColor: 'rgb(62, 128, 236)',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                display: true
              },
              gridLines: {
                display: true,
              },
            }],
            xAxes: [{
              ticks: {
                display: true
              },
              gridLines: {
                display: true,
              },
            }],
          }
        }
      });

      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

    }).catch((error) => {
      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      console.log(error);
    });
  }


  // Booking area chart implementation
  bookingLines: any;
  bookingColorArray: any;
  
  @ViewChild('bookingsAreaChart', {static: true}) bookingLineChart;

  BookingsAreaChart() {
    this.bookingLines = new Chart(this.bookingLineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Oct 2021', 'Nov 2021', 'Dec 2021', 'Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021'],
        datasets: [{
          label: 'Bookings',
          fill: false,
          data: [0, 0, 0, 0, 0, 0, 13],
          borderColor: 'rgb(62, 128, 236)',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              display: true
            },
            gridLines: {
              display: true,
            },
          }],
          xAxes: [{
            ticks: {
              display: true
            },
            gridLines: {
              display: true,
            },
          }],
        }
      }
    });
  }


  // Function - Implementation for opening the 'Movie Details Modal' modal
  async openMovieDetailsModal(movieImdbId: string){
    const movieDetailsModal = await this.modalController.create({
      component: MovieDetailsModalPage,
      componentProps: {
        passingModalOpenPath: 'Manager-Dashboard-Latest-Movies',
        passingMovieImdbId: movieImdbId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    movieDetailsModal.present();
  }


  // Function - Retrieving latest five movies from the database
  retrieveLatestMovies(){

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Assigning 'loadingSpinnerLatestMovies' to true (starts loading spinner)
    this.loadingSpinnerLatestMovies = true;

    // Adding new showing experience
    this.managerService.getLatestFiveMovies()
      .subscribe((latestMoviesResponse: any) => {

      if(latestMoviesResponse.message == "Latest movies retrieved"){

        // Assigning 'loadingSpinnerLatestMovies' to false (stops loading spinner)
        this.loadingSpinnerLatestMovies = false;

        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning the retrieve recent movies into the 'listOfLatestMovies' array
        this.listOfLatestMovies = latestMoviesResponse.returnedData;

      }
      else if(latestMoviesResponse.message == "No movies available"){

        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning 'loadingSpinnerLatestMovies' to false (stops loading spinner)
        this.loadingSpinnerLatestMovies = false;

      }
      else if(latestMoviesResponse.message == "Unable to retrieve latest movies"){

        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;
        
        // Assigning 'loadingSpinnerLatestMovies' to false (stops loading spinner)
        this.loadingSpinnerLatestMovies = false;

        console.log("Unable to retrieve latest movies");

      }

    }, (error: ErrorEvent) => {

      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      // Assigning 'loadingSpinnerLatestMovies' to false (stops loading spinner)
      this.loadingSpinnerLatestMovies = false;
      
      console.log("Unable to retrieve latest movies");
    });

  }


  // Function - Retrieving count of movies as 'WaitListed'
  retrieveCountOfMoviesWaitListed(){

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Adding new showing experience
    this.managerService.getCountOfMoviesByMovieStatus("WaitListed")
      .subscribe((waitListedMoviesResponse: any) => {

      if(waitListedMoviesResponse.message == "Count of movies retrieved"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning the retrieved count into 'countOfMoviesWaitListed'
        this.countOfMoviesWaitListed = waitListedMoviesResponse.returnedData;
      }
      else if(waitListedMoviesResponse.message == "No movies available"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("No wait listed movies available");
      }
      else if(waitListedMoviesResponse.message == "Unable to retrieve count of movies"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("Unable to retrieve count of wait listed movies");
      }
    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      console.log("Unable to retrieve count of wait listed movies");
    });

  }

  
  // Function - Retrieving count of movies as 'Upcoming'
  retrieveCountOfMoviesUpcoming(){

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Adding new showing experience
    this.managerService.getCountOfMoviesByMovieStatus("Upcoming")
      .subscribe((upcomingMoviesResponse: any) => {

      if(upcomingMoviesResponse.message == "Count of movies retrieved"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning the retrieved count into 'countOfMoviesWaitListed'
        this.countOfMoviesUpcoming = upcomingMoviesResponse.returnedData;
      }
      else if(upcomingMoviesResponse.message == "No movies available"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("No wait listed movies available");
      }
      else if(upcomingMoviesResponse.message == "Unable to retrieve count of movies"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("Unable to retrieve count of upcoming movies");
      }
    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      console.log("Unable to retrieve count of upcoming movies");
    });

  }


  // Function - Retrieving count of movies as 'NowShowing'
  retrieveCountOfMoviesNowShowing(){

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Adding new showing experience
    this.managerService.getCountOfMoviesByMovieStatus("NowShowing")
      .subscribe((nowShowingMoviesResponse: any) => {

      if(nowShowingMoviesResponse.message == "Count of movies retrieved"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning the retrieved count into 'countOfMoviesWaitListed'
        this.countOfMoviesNowShowing = nowShowingMoviesResponse.returnedData;
      }
      else if(nowShowingMoviesResponse.message == "No movies available"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("No wait listed movies available");
      }
      else if(nowShowingMoviesResponse.message == "Unable to retrieve count of movies"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("Unable to retrieve count of now showing movies");
      }
    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      console.log("Unable to retrieve count of now showing movies");
    });

  }


  // Function - Retrieving count of cinema halls
  retrieveCountOfCinemaHalls(){

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Retrieve count of cinema halls from the database
    this.managerService.retrieveCountOfCinemaHalls()
      .subscribe((cinemaHallsCountResponse: any) => {

      if(cinemaHallsCountResponse.message == "Count of cinema halls retrieved"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning the retrieved count into 'countOfCinemaHalls'
        this.countOfCinemaHalls = cinemaHallsCountResponse.returnedData;
      }
      else if(cinemaHallsCountResponse.message == "No cinema halls available"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("No cinema halls available");
      }
      else if(cinemaHallsCountResponse.message == "Unable to retrieve count of cinema halls"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("Unable to retrieve count of cinema halls");
      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      console.log("Unable to retrieve count of cinema halls: ", error);
    });

  }


  // Function - Retrieving count of cinema locations
  retrieveCountOfCinemaLocations(){

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Retrieving the count of cinema locations
    this.managerService.retrieveCountOfCinemaLocations()
      .subscribe((cinemaLocationsCountResponse: any) => {

      if(cinemaLocationsCountResponse.message == "Count of cinema locations retrieved"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning the retrieved count into 'countOfCinemaHalls'
        this.countOfCinemaLocations = cinemaLocationsCountResponse.returnedData;
      }
      else if(cinemaLocationsCountResponse.message == "No cinema locations available"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("No cinema locations available");
      }
      else if(cinemaLocationsCountResponse.message == "Unable to retrieve count of cinema locations"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("Unable to retrieve count of cinema locations");
      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      console.log("Unable to retrieve count of cinema locations: ", error);
    });

  }


  // Function - Retrieving count of refreshments
  retrieveCountOfRefreshments(){

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Retrieving the count of refreshments
    this.managerService.getCountOfRefreshments()
      .subscribe((refreshmentsCountResponse: any) => {

      if(refreshmentsCountResponse.message == "Count of refreshments retrieved"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning the retrieved count into 'countOfRefreshments'
        this.countOfRefreshments = refreshmentsCountResponse.returnedData;
      }
      else if(refreshmentsCountResponse.message == "No refreshments available"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("No refreshments available");
      }
      else if(refreshmentsCountResponse.message == "Unable to retrieve count of refreshments"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("Unable to retrieve count of refreshments");
      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      console.log("Unable to retrieve count of refreshments: ", error);
    });

  }


  // Function - Retrieving count of enabled operator accounts
  retrieveCountOfEnabledAccounts(){

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Retrieving the count of refreshments
    this.managerService.getCountOfOperatorAccounts("Enabled")
      .subscribe((accountsCountResponse: any) => {

      if(accountsCountResponse.message == "Count of accounts retrieved"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning the retrieved count into 'countOfEnabledOperatorAccounts'
        this.countOfEnabledOperatorAccounts = accountsCountResponse.returnedData;
      }
      else if(accountsCountResponse.message == "No accounts available"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("No enabled accounts available");
      }
      else if(accountsCountResponse.message == "Unable to retrieve count of accounts"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("Unable to retrieve count of enabled accounts");
      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      console.log("Unable to retrieve count of enabled accounts: ", error);
    });

  }


  // Function - Retrieving count of disabled operator accounts
  retrieveCountOfDisabledAccounts(){

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Retrieving the count of refreshments
    this.managerService.getCountOfOperatorAccounts("Disabled")
      .subscribe((accountsCountResponse: any) => {

      if(accountsCountResponse.message == "Count of accounts retrieved"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning the retrieved count into 'countOfEnabledOperatorAccounts'
        this.countOfDisabledOperatorAccounts = accountsCountResponse.returnedData;
      }
      else if(accountsCountResponse.message == "No accounts available"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("No disabled accounts available");
      }
      else if(accountsCountResponse.message == "Unable to retrieve count of accounts"){
        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        console.log("Unable to retrieve count of disabled accounts");
      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      console.log("Unable to retrieve count of disabled accounts: ", error);
    });

  }


}
