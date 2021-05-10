import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  favouriteActivityList: Observable<any>;
  uid: any;
  constructor(
    private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth,
  ) { 

    this._angularFireAuth.authState.subscribe((user)=>{
      if(user){
        this.uid = user.uid;
        console.log(this.uid)
      } else{
        this.uid = null;
      }
    });

    this.favouriteActivityList = _angularFireStore
    .collection("favourites")
    .doc(this.uid)
    .collection("favourites")
    .valueChanges();
  }

}
