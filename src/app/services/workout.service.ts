import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface WorkoutProgram{
  id: number;
  title: string;
  description: string;
  exercises: string[];
  duration: string;
  equipment: string[];
  isCompleted?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: WorkoutProgram[] = [
    {
      id: 1,
      title: "Weight Loss Program",
      description: "A high-intensity workout for burning fat",
      exercises: ["Jump rope", "Burpees", "Squats"],
      duration: "45 mins",
      equipment: ["Jump Rope"],
      isCompleted: false
    },
    {
      id: 2,
      title: "Strength Building",
      description:  "Progressive overload training focusing on major muscle groups",
      exercises: ["Bench press", "Deadlifts, Squats", "Shoulder press"],
      duration:'60 mins',
      equipment: ["Barbell", "Weight plates", "Bench"],
      isCompleted: false
    },
    {
      id: 3,
      title: "Morning Cardio",
      description: "Low-impact cardiovascular routine to start your day",
      exercises: ["Jogging", "Jumping jacks", "Mountain climbers", "High knees"],
      duration: "30 mins",
      equipment: ["None"],
      isCompleted: false
    },
    {
      id: 4,
      title: "Full Body HIIT",
      description: "High-intensity interval training targeting all major muscle groups",
      exercises: ["Kettlebell swings", "Push-ups", "Box jumps", "Plank variations"],
      duration: "40 mins",
      equipment: ["Kettlebell", "Plyo box"],
      isCompleted: false
    },
    {
      id: 5,
      title: "Yoga Flow",
      description: "Gentle sequence focusing on flexibility, balance and mindfulness",
      exercises: ["Sun salutations", "Warrior poses", "Balance poses", "Deep stretching"],
      duration: "50 mins",
      equipment: ["Yoga mat"],
      isCompleted: false
    }
  ]

  private _storage: Storage | null = null;
  private STORAGE_KEY = "completedWorkouts";

  constructor(private storage: Storage) { 
    this.init();
  }

  async init(){
    this._storage = await this.storage.create();
  }

  getWorkoutPrograms(): WorkoutProgram[]{
    return this.workouts;
  }

  getWorkoutById(id: number): WorkoutProgram | undefined{
    return this.workouts.find(w => w.id === id);
  }

  async completeWorkout(id: number): Promise<void> {
    let completedWorkouts = await this._storage?.get(this.STORAGE_KEY) || [];

    if(!completedWorkouts.includes(id)){
      //workout.isCompleted = true;
      completedWorkouts.push(id);
      await this._storage?.set(this.STORAGE_KEY, completedWorkouts);
    }
  }

  async getCompletedWorkoutIds(): Promise<number[]>{
    return (await this._storage?.get(this.STORAGE_KEY)) || []
  }

  async resetProgress(): Promise<void>{
    await this._storage?.set(this.STORAGE_KEY, []);
  }

  async resetWorkoutProgress(id: number): Promise<void>{
    let completedWorkouts = await this._storage?.get(this.STORAGE_KEY) || [];
    completedWorkouts = completedWorkouts.filter((workoutId: number) => workoutId !== id);
    await this._storage?.set(this.STORAGE_KEY, completedWorkouts);
  }
}
