import { Injectable } from '@angular/core';

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

  constructor() { }

  getWorkoutPrograms(): WorkoutProgram[]{
    return this.workouts;
  }

  getWorkoutById(id: number): WorkoutProgram | undefined{
    return this.workouts.find(w => w.id === id);
  }

  completeWorkout(id: number): void {
    const workout = this.getWorkoutById(id);
    if(workout){
      workout.isCompleted = true;
    }
  }
}
