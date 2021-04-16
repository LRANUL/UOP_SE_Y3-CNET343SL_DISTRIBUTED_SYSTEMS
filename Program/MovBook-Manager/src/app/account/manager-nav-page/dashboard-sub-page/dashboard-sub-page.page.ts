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

  // Declaration | Initialization - Stores current date and time
  currentDateTime: String;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerLatestMovies' block
  loadingSpinnerLatestMovies: Boolean = false;

  // Declaration | Initialization - to handle visibility of 'loadingSpinnerDashboard' block
  loadingSpinnerDashboard: Boolean = false;

  // Declaration - to store list of recent movies
  listOfLatestMovies = new Array();

  // Declaration | Initialization - to store count of movies as 'WaitListed'
  countOfMoviesWaitListed: Number = 0;
  
  constructor(
    private managerService: ManagerService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    // Retrieving the current date time upon page render
    this.getCurrentDateTime();
    
    // Five Second Timer
    interval(5000).subscribe(timer => {
      // Retrieving the current date time upon page render
      this.getCurrentDateTime();
    });

    // Retrieving recent five movies upon page render
    this.retrieveLatestMovies();

    // Retrieving count of movies assigned as 'WaitListed'
    this.retrieveCountOfMoviesWaitListed();
    
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
    // Initiating the movie showings chart
    this.MovieShowingsAreaChart();

    // Initiating the bookings chart
    this.BookingsAreaChart();
  }


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


  // Movie Showing area chart implementation
  movieShowingsLines: any;
  movieShowingsColorArray: any;
  
  @ViewChild('movieShowingsAreaChart', {static: true}) movieShowingsLineChart;

  MovieShowingsAreaChart() {
    this.movieShowingsLines = new Chart(this.movieShowingsLineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Oct 2021', 'Nov 2021', 'Dec 2021', 'Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021'],
        datasets: [{
          label: 'Movie Showings',
          fill: false,
          data: [0, 0, 0, 0, 0, 1, 46],
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

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve latest movies, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve latest movies");

      }

    }, (error: ErrorEvent) => {

      // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
      this.loadingSpinnerDashboard = false;

      // Assigning 'loadingSpinnerLatestMovies' to false (stops loading spinner)
      this.loadingSpinnerLatestMovies = false;
      
      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve latest movies, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve latest movies");
    });

  }


  // Function - Retrieving count movies as 'WaitListed'
  retrieveCountOfMoviesWaitListed(){

    // Assigning 'loadingSpinnerDashboard' to true (starts loading spinner)
    this.loadingSpinnerDashboard = true;

    // Adding new showing experience
    this.managerService.getCountOfMoviesByMovieStatus("WaitListed")
      .subscribe((latestMoviesResponse: any) => {

      if(latestMoviesResponse.message == "Count of movies retrieved"){

        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Assigning the retrieved count into the 'countOfMoviesWaitListed'
        this.countOfMoviesWaitListed = latestMoviesResponse.returnedData;

      }
      else if(latestMoviesResponse.message == "No movies available"){

        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

      }
      else if(latestMoviesResponse.message == "Unable to retrieve count of movies"){

        // Assigning 'loadingSpinnerDashboard' to false (stops loading spinner)
        this.loadingSpinnerDashboard = false;

        // Showing error message box to the user
        this.alertNotice("ERROR", "Unable to retrieve count of movies, apologies for the inconvenience. Please contact administrator.");

        console.log("Unable to retrieve count of movies");

      }

    }, (error: ErrorEvent) => {
      // Assigning 'loadingSpinnerLatestMovies' to false (stops loading spinner)
      this.loadingSpinnerLatestMovies = false;
      
      // Showing error message box to the user
      this.alertNotice("ERROR", "Unable to retrieve count of movies, apologies for the inconvenience. Please contact administrator.");

      console.log("Unable to retrieve count of movies");
    });

  }

}
