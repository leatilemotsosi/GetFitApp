import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { WorkoutProgram, WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  workoutPrograms: WorkoutProgram[] = [];

  constructor(private workoutService: WorkoutService, private navController: NavController) {}

  ngOnInit() {
    this.workoutPrograms = this.workoutService.getWorkoutPrograms();
  }

  showWorkoutDetails(id: number){
    this.navController.navigateForward(`/tabs/tab2/${id}`);
  }
}
