import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

import { MovieSearchResult } from 'src/app/models/account/manager';
import { ManagerService } from 'src/app/services/account/manager.service';
import { MovieDetailsModalPage } from '../movie-details-modal/movie-details-modal.page';

@Component({
  selector: 'app-search-movies-tab-page',
  templateUrl: './search-movies-tab-page.page.html',
  styleUrls: ['./search-movies-tab-page.page.scss'],
})
export class SearchMoviesTabPagePage implements OnInit {

  searchUpcomingMoviesForm: FormGroup;

  public movieSearchResults: MovieSearchResult;
  
  constructor(
    private managerService: ManagerService,
    private modalController: ModalController,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.searchUpcomingMoviesForm = this.formBuilder.group({
      movieTitle: new FormControl('', Validators.required),
      movieReleaseYear: new FormControl('')
    });

  }

  // Retrieving movie search results from the backend by passing the enter movie title and movie release data
  getMovieSearchResults(formValue){
    this.managerService.getMovieSearchResults(formValue.movieTitle, formValue.movieReleaseYear)
      .subscribe((movieSearchResults: MovieSearchResult) => {
        this.movieSearchResults = movieSearchResults;
      },
      (error: ErrorEvent) => {
        alert(error);
      });
  }

  // Implementation for opening the 'Movie Details Modal' modal
  async openMovieDetailsModal(movieId: string){
    const movieDetailsModal = await this.modalController.create({
      component: MovieDetailsModalPage,
      componentProps: {
        passingModalOpenPath: 'Manager-Movie-Details',
        passingMovieId: movieId
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false,
    });
    movieDetailsModal.present();
  }

  // Add Movie to Waitlist Alert Box Implementation
  async addMovieToWaitListAlert( title: string, content: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Add Movie to Waitlist Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            
            // Add movie details to the waitlist
            // TODO: Connect to the backend

          }
        }
      ]
    });
    await alert.present();
  }

}
