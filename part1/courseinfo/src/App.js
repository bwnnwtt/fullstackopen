const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  const names = props.parts.map(parts => parts.name)
  const exercises = props.parts.map(parts => parts.exercises)
  
  return (
    <>
      <Part 
        part={names[0]} 
        exercises={exercises[0]}
      />
      <Part 
        part={names[1]} 
        exercises={exercises[1]}
      />
      <Part 
        part={names[2]} 
        exercises={exercises[2]}
      />
    </>
  )
}

const Total = (props) => {
  const total = props.parts
                      .map(parts => parts.exercises)
                      .reduce((a,b) => a + b, 0)

  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App