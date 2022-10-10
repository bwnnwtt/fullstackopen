import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courses }: { courses: CoursePart[] }) => {
  
  return (
    <>
      {
        courses.map((course, i) => {
          return (
            <Part key={i} part={course} />
          )
        })
      }
    </>
  )
}

export default Content;