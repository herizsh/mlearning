import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DosenListMateriPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dosen-list-materi',
  templateUrl: 'dosen-list-materi.html',
})
export class DosenListMateriPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DosenListMateriPage');
  }

  postMateri() {
    this.navCtrl.push('DosenPostMateriPage');
  }

}
