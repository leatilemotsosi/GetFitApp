import { Component } from '@angular/core';
import { WorkoutProgram, WorkoutService } from '../services/workout.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  completedWorkouts: WorkoutProgram[] =[];

  constructor(private workoutService: WorkoutService, private navController: NavController) {}

  ionViewWillEnter(){
    this.loadProgress();
  }

  async loadProgress(){
    const ids = await this.workoutService.getCompletedWorkoutIds();
    const allWorkouts = this.workoutService.getWorkoutPrograms();
    this.completedWorkouts = allWorkouts.filter(w => ids.includes(w.id));
  }

  async resetEntireProgress(){
    await this.workoutService.resetProgress();
    this.completedWorkouts = [];
    
  }

  async resetWorkoutProgress(id: number){
    await this.workoutService.resetWorkoutProgress(id);
    this.loadProgress();
  }

  backHome(){
    this.navController.navigateForward('/tabs/tab1');
  }
  
}
