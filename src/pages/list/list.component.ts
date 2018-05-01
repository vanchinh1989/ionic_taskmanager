import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddPage } from '../add/add.component';
import { CommonService } from '../service/common.service';

@Component({
    selector: 'page-list',
    templateUrl: 'list.component.html'
})

export class ListPage {
    public tasks : any = [];
    public pendingTasks = [];
    public doneTasks = [];

    constructor(public modalCtrl: ModalController, private commonService:CommonService) {
        this.commonService.task_subject.subscribe(response => {
            this.updateTask();
        });
    }

    presentAddModal() {
        let addModel = this.modalCtrl.create(AddPage);
        addModel.present();
    }

    checkPendingItem(id) {
        this.pendingTasks.map((task) => {
            if (task.Id == id) {
                if (task.IsDone) {
                    task.IsDone = false;
                } else {
                    task.IsDone = true;
                }
                this.commonService.saveDb(task);
            }
        });

        this.updateTask();
    }

    checkDoneItem(id) {
        this.doneTasks.map((task) => {
            if (task.Id == id) {
                if (task.IsDone) {
                    task.IsDone = false;
                } else {
                    task.IsDone = true;
                }
                this.commonService.saveDb(task);
            }
        });

        this.updateTask();
    }

    updateTask() {
        this.pendingTasks = this.commonService.tasks.filter(item => {
            return item.IsDone == false;
        });
        this.doneTasks = this.commonService.tasks.filter(item => {
            return item.IsDone == true;
        });
        console.log(this.pendingTasks);
    }

    removeTask(task) {
        this.commonService.removeTask(task);
    }
}