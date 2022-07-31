const Header = ({name}) => <h1>{name}</h1>
const Part = ({part}) => {
  console.log("Part", part)
  return (
  <p>{part.name} {part.exercises}</p>
  )
}
const Content = ({parts}) => {
  console.log("parts", parts)
  return (
  <div>
    {parts.map(part => <Part part={part} />)}
  </div>
  )
}
const Total = ({parts}) => {
  const total = parts.map(part => part.exercises).reduce((a,b) => a + b)

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({course}) => {
  console.log("Course", course);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return courses.map(course => <Course course={course} />)
}

export default App