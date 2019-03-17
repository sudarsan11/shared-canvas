import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { interval } from 'rxjs';

import { CanvasModel } from './canvas.component.model';
import { PusherService } from '../pusher/pusher.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})


export class CanvasComponent implements OnInit {

  constructor(public pusherService: PusherService) { }

  myText;
  sub;


  @ViewChild('myCanvas') myCanvas: ElementRef;
  public ctx: CanvasRenderingContext2D;


  currentX: number;
  currentY: number;
  lastX: number;
  lastY: number;
  isDrwaing = false;
  canvasStroke = {};

  // Once the text on the canvas has changed it is sent to backend
  onTextChangedInCanvas( ) {

    const canvasContent: CanvasModel = {
      canvasText: this.myText
    }

    // this.pusherService.canvasEdit(canvasContent);

  }

  onCanvasMouseDown(event: MouseEvent) {

    this.isDrwaing = true;

    if(event.offsetX !== undefined){
      this.lastX = event.offsetX;
      this.lastY = event.offsetY;
    }
  }


  onCanvasMouseMove(event: MouseEvent) {

    if (this.isDrwaing) {
      // get current mouse position
      if(event.offsetX!==undefined){
        this.currentX = event.offsetX;
        this.currentY = event.offsetY;
      }
      this.draw(this.lastX, this.lastY, this.currentX, this.currentY, '#4bf');

      this.canvasStroke = {
        lastX : this.lastX,
        lastY : this.lastY,
        currentX: this.currentX,
        currentY: this.currentY
      };

      this.pusherService.canvasEdit(this.canvasStroke);

      // set current coordinates to last one
      this.lastX = this.currentX;
      this.lastY = this.currentY;
    }

  }

  onCanvasMouseUp(event: MouseEvent) {

    this.isDrwaing = false;

    this.pusherService.channel.bind('canvas-edit', data => {

      console.log(data);

      this.lastX = data.lastX ;
      this.lastY = data.lastY ;
      this.currentX = data.lastX ;
      this.currentY = data.lastY ;
      this.draw(this.lastX, this.lastY, this.currentX, this.currentX, 'red');
    });

  }

  draw(lastX, lastY, currentX, currentY, color) {

    this.ctx.moveTo(lastX, lastY);
    // to
    this.ctx.lineTo(currentX,currentY);
    // color
    this.ctx.strokeStyle = color;
    // draw it
    this.ctx.stroke();

  }


  mimickTheStorkes() {
    console.log(this.lastX , this.lastY , this.currentX , this.currentY );
    this.draw(this.lastX, this.lastY, this.currentX , this.currentY , 'red');
  }

  ngOnInit() {

    this.ctx = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');

   this.pusherService.channel.bind('canvas-edit', data => {

    console.log(data);

    this.lastX = data.lastX ;
    this.lastY = data.lastY ;
    this.currentX = data.lastX ;
    this.currentY = data.lastY ;
    this.draw(this.lastX, this.lastY, this.currentX, this.currentX, 'red');
  });


  }
}
