import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private _httpClient: HttpClient) { }

  getActivity() {

  }

  getAllActivities() {

  }
}

const API = "";