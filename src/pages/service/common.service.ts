import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Task } from '../task.model';

import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'todolist';

@Injectable()
export class CommonService {
    public tasks: any;
    public task_subject = new Subject<String>();

    constructor(private storage: Storage) {
        this.getAllTask();
    }

    addTask(name: String) {
        let time = (new Date()).getTime();
        let task = new Task(time, name, false);
        this.tasks.push(task);
        this.task_subject.next();
        this.saveDb(task);        
    }

    removeTask(task: Task) {
        this.getAll().then(result => {
            if (result) {
                var index = result.findIndex(function(element) {
                    return element.Id == task.Id;
                });
                if (index) {
                    result.splice(index, 1);
                    this.storage.set(STORAGE_KEY, result);    
                    this.tasks = result;
                    this.task_subject.next();
                    console.log(result);
                }                
            }
        });
    }

    saveDb(task: Task) {
        this.getAll().then(result => {
            if (result) {
                result.push(task);
                this.storage.set(STORAGE_KEY, result);
            } else {
                let taskLst = [];
                taskLst.push(task);
                this.storage.set(STORAGE_KEY, taskLst);
            }
        });
    }

    getAllTask() {
        return this.getAll().then(result => {
            if (result) {
                this.tasks = result;
                this.task_subject.next();
            } else {
                this.tasks = [];
            }
        });
    }

    getAll() {
        return this.storage.get(STORAGE_KEY);
    }
}

