import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  myProfileImage;
  constructor(
    private _alertController: AlertController
  ) {

  }

  async selectImageSource() {

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
            this.myProfileImage = image.webPath
          }
        }
      ]
    });
    await alert.present();
  }
}
