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

// interface ParsedArguments {
//   target: number,
//   period: number[]
// }

// const parseCalcArguments = (args: Array<string>): ParsedArguments => {
//   if(args.length < 4) throw new Error('Not enough arguments');

//   const period: number[] = [];

//   args.slice(2).forEach((arg, i) => {
//     if(!isNaN(Number(arg))) {
//       if(i > 0) {
//         period.push(Number(arg));
//       }
//     } else {
//       throw new Error('Provided values were not numbers!');
//     }
//   });

//   return { target: Number(args[2]), period };

// };

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

// try {
//   const { target, period } = parseCalcArguments(process.argv);
//   console.log(calculateExercises(period, target));
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }