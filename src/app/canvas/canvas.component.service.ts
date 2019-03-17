import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constants } from "../constants";
import { CanvasModel } from "./canvas.component.model";

const url = Constants.URL;

@Injectable({providedIn:'root'})
export class CanvasComponentService {

  private myText = '';

  constructor(public http: HttpClient) {}

  onCanvasTextChanged(canvasContent: CanvasModel) {
    this.myText = canvasContent.canvasText;
    return this.http.post<{message:string, changedText: string}>(url + 'api/canvas/edit', canvasContent).pipe();

  }

}
