import { Course } from "../types";

const Content = ({ courses }: { courses: Course[] }) => {
  
  return (
    <>
      {
        courses.map(course => {
          return (
            <p key={ course.name }>
              { course.name } { course.exerciseCount }
            </p>
          )
        })
      }
    </>
  )
}

export default Content;