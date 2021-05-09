import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivityVideoPage } from '../activity-video/activity-video.page';
import { ActivityService } from '../activity.service';
import { Activity } from '../types';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;


@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage implements OnInit {
  activityDetail: Observable<Activity>;


  constructor(
    private _router: Router,
    private _modalController: ModalController,
    activityService: ActivityService,
    activatedRoute: ActivatedRoute) {
    const activityID = activatedRoute.snapshot.params["activityID"];
    this.activityDetail = activityService.getActivity(activityID);
  }

  ngOnInit() {
  }

  async openModal() {
    const videoModal = await this._modalController.create({
      component: ActivityVideoPage
    });

    return await this.activityDetail.subscribe((activity) => {
      videoModal.componentProps = {
        videoURL: activity.video_url
      };
      return videoModal.present();
    });
  }

  async shareVideo() {
    let urlFromPage = this._router.url;
    let shareRet = await Share.share({
      title: 'Look at this neat video!',
      text: "Check out this video!",
      url: urlFromPage,
      dialogTitle: 'Share This Content'
    });
  }
}
