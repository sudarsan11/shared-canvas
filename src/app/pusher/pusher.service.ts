import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanvasModel } from '../canvas/canvas.component.model';
import { Constants } from "../constants";
import { environment} from '../environment';

const url = Constants.URL;

declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  channel: any;

  constructor(private http: HttpClient) {

    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('events-channel');
   }

   public canvasEdit(canvasContent: any) {

    this.http.post<{message:string, changedText: string}>(url + 'api/canvas/edit', canvasContent)
      .subscribe(response =>{
        console.log(response);
      })
   }
}
