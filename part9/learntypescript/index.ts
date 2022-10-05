import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import bodyParser from "body-parser";

// interface Body {
//   daily_exercises: number[],
//   target: number
// }

const app = express();
app.use(bodyParser.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (weight === null || height === null || isNaN(weight) || isNaN(height)) {
    res.status(400).json({ error:"malformatted parameters" });
  } else {
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  }
});

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target ) {
    res.status(400).json({ error: "parameters missing"});
  }
  if(Array.isArray(daily_exercises)) {
    daily_exercises.forEach(daily => {
      if(isNaN(Number(daily))) {
        res.status(400).json({ error: "malformatted parameters" });
      }
    });
    if(!isNaN(Number(target))) {
      res.json(calculateExercises(daily_exercises.map(de => Number(de)), Number(target)));
    } else {
      res.status(400).json({ error: "malformatted parameters" });
    }
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});