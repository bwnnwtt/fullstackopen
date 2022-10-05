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

interface ParsedArguments {
  target: number,
  period: number[]
}

const parseCalcArguments = (args: Array<string>): ParsedArguments => {
  if(args.length < 4) throw new Error('Not enough arguments');

  let period: number[] = [];

  args.slice(2).forEach((arg, i) => {
    if(!isNaN(Number(arg))) {
      if(i > 0) {
        period.push(Number(arg))
      }
    } else {
      throw new Error('Provided values were not numbers!')
    }
  })

  return { target: Number(args[2]), period }

}

const calculateRating = (average: number, target: number): Rating => {

  let rating: number = -1
  let ratingDescription: string = ''

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

try {
  const { target, period } = parseCalcArguments(process.argv);
  console.log(calculateExercises(period, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}