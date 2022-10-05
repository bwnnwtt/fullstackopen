interface BMIValues {
  height: number;
  weight: number;
}

const parseBMIArguments = (args: Array<string>): BMIValues => {
  if(args.length < 4) throw new Error('Not enough arguments');
  if(args.length > 4) throw new Error('Too many arguments');

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateBmi = (height: number, weight: number): void => {
  let h: number = height / 100;
  let bmi: number = weight / (h * h)
  if (bmi < 18.5) {
    console.log("Underweight")
  } else if (bmi >= 18.5 && bmi < 25) {
    console.log("Normal (healthy weight)")
  } else if (bmi >= 25 && bmi < 30) {
    console.log("Overweight")
  } else {
    console.log("Obese")
  }
}

try {
  const { height, weight } = parseBMIArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}