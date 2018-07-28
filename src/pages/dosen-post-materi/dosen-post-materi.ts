import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider, Post } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import firebase from 'firebase';
/**
 * Generated class for the DosenPostMateriPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dosen-post-materi',
  templateUrl: 'dosen-post-materi.html',
})
export class DosenPostMateriPage {
  post = <any>{};
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider, public auth: AuthProvider, public filePath: FilePath,
    public fileChooser: FileChooser, public file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DosenPostMateriPage');
  }

  async create(user) {
    await this.db.createPost(user.uid, this.post as Post)
    this.post = {}
    await this.navCtrl.setRoot('HomePage')
  }

  choose() {

    this.fileChooser.open().then((uri) => {
      alert(uri);

      this.filePath.resolveNativePath(uri)
        .then((filePath) => {
          this.file.resolveLocalFilesystemUrl(filePath).then((newUrl) => {
            alert(JSON.stringify(newUrl));

            let dirPath = newUrl.nativeURL;
            let dirPathSegments = dirPath.split('/');
            dirPathSegments.pop();
            dirPath = dirPathSegments.join('/');
            this.file.readAsArrayBuffer(dirPath, newUrl.name).then(async (buffer) => {
              await this.upload(buffer, newUrl.name);
            })
          })
        })
    })

  }
  async upload(buffer, name) {
    let blob = new Blob([buffer], { type: "application/pdf" });

    let storage = firebase.storage();

    storage.ref('files/' + name).put(blob).then((d) => {
      alert('Success');
      storage.ref('files/' + name).getDownloadURL().then((url) => {
        this.post.materiUrl = url;
        alert(JSON.stringify(this.post.materiUrl));
      }).catch((error) => {
        alert(JSON.stringify(error));
      });
    }).catch((error => {
      alert(JSON.stringify(error));
    }))


  }

}
