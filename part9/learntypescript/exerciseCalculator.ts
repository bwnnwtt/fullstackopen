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

  let rating: number = -1
  let ratingDescription: string = undefined

  if(average/target >= 1) {
    rating = 3
    ratingDescription = 'perfect'
  } else if (average/target >= 0.7) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'try harder'
  }

  return { rating, ratingDescription }
}

const calculateExercises = (hours: number[], target: number): Result => {
  let periodLength: number = hours.length
  let trainingDays: number = periodLength - hours.filter(hour => hour === 0).length
  let average: number = hours.reduce((prev, curr) => prev + curr, 0) / periodLength
  let success: boolean = average >= target
  let ratingObj: Rating = calculateRating(average, target)

  return {
    periodLength,
    trainingDays,
    success,
    ...ratingObj,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))