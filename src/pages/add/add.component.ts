import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { CommonService } from '../service/common.service';

@Component ({
    selector: 'page-add',
    templateUrl: 'add.component.html'
})

export class AddPage {
    public item:String;
    public tasks: any = [];

    constructor(public modalCtrl: ViewController, private commonService: CommonService) {
    }

    add(){
        this.commonService.addTask(this.item);
        this.dismiss();
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}