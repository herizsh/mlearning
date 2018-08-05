import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProfilePage } from './admin-profile';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AdminProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminProfilePage),
    ComponentsModule
  ],
})
export class AdminProfilePageModule {}
