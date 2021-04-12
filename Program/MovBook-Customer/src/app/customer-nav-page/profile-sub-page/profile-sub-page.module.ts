import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSubPagePageRoutingModule } from './profile-sub-page-routing.module';

import { ProfileSubPagePage } from './profile-sub-page.page';
import { EditProfileComponentComponent } from './edit-profile-component/edit-profile-component.component';
import { PasswordChangeComponentComponent } from './password-change-component/password-change-component.component';
import { HeaderComponentComponent } from 'src/app/header-component/header-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSubPagePageRoutingModule
  ],
  declarations: [ProfileSubPagePage, EditProfileComponentComponent, PasswordChangeComponentComponent, HeaderComponentComponent],
  entryComponents: [EditProfileComponentComponent,PasswordChangeComponentComponent]
})
export class ProfileSubPagePageModule {}
