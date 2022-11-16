import {ExerciseBodyPart} from "../../models/workout";

const exerciseBodyPartsList = (): ExerciseBodyPart[] => {
  return [
    {
      value: "ABS",
      displayValue: "Abs",
    },
    {
      value: "BACK",
      displayValue: "Back",
    },
    {
      value: "BICEPS",
      displayValue: "Biceps",
    },
    {
      value: "CARDIO",
      displayValue: "Cardio",
    },
    {
      value: "CHEST",
      displayValue: "Chest",
    },
    {
      value: "LEGS",
      displayValue: "Legs",
    },
    {
      value: "SHOULDERS",
      displayValue: "Shoulders",
    },
    {
      value: "TRICEPS",
      displayValue: "Triceps",
    },
  ];
}

export default exerciseBodyPartsList;
