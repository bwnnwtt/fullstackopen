interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
  rating: number,
  ratingDescription: string
}

const calculateRating = (average: number, target: number): Rating => {

  let rating = -1;
  let ratingDescription = '';

  if(average/target >= 1) {
    rating = 3;
    ratingDescription = 'perfect';
  } else if (average/target >= 0.7) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return { rating, ratingDescription };
};

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength: number = hours.length;
  const trainingDays: number = periodLength - hours.filter(hour => hour === 0).length;
  const average: number = hours.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success: boolean = average >= target;
  const ratingObj: Rating = calculateRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    ...ratingObj,
    target,
    average
  };
};