import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

const { Camera } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  myStoredProfileImage: Observable<any>;
  uid: any;
  constructor(
    private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth,
    private _alertController: AlertController
  ) {
    this._angularFireAuth.authState.subscribe((user)=>{
      if(user){
        this.uid = user.uid;
        console.log(this.uid)
      } else{
        this.uid = null;
      }
    });
    this.myStoredProfileImage = _angularFireStore
    .collection("users")
    .doc(this.uid)
    .valueChanges()
  }

  async selectImageSource() {

    try {
      const alert = await this._alertController.create({
        header: "Select Source",
        message: "Pick a source for your image",
        buttons: [
          {
            text: "Select Photo",
            handler: async () => {
              const image = await Camera.getPhoto({
                quality: 100,
                allowEditing: true,
                correctOrientation: true,
                source: CameraSource.Prompt,
                resultType: CameraResultType.Uri
              });
              this._angularFireStore
                .collection("users")
                .doc((await this._angularFireAuth.currentUser).uid)
                .set({
                  image_src: image.webPath
                })
            }
          }
        ]
      });
      await alert.present();
    } catch (error) { console.error(error); }
  }
}
