import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutProgram, WorkoutService } from '../services/workout.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  workout: WorkoutProgram | undefined;

  constructor(private route: ActivatedRoute, private workoutService: WorkoutService, private navController: NavController) {}

  async ionViewWillEnter() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.workout = this.workoutService.getWorkoutById(id);
      const isCompleted = await this.workoutService.isWorkoutCompleted(id);
      if (this.workout) {
        this.workout.isCompleted = isCompleted;
      }
    }
  }
  

  markAsCompleted(){
    if (this.workout){
      this.workoutService.completeWorkout(this.workout.id);
      this.workout.isCompleted = true;      
    }
  }

  backHome(){
    this.navController.navigateForward('/tabs/tab1');
  }

  viewProgress(){
    this.navController.navigateForward('/tabs/tab3');
  }
}
