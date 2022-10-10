import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <strong>{ part.name } { part.exerciseCount }</strong>
          <br />
          { part.description }
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <strong>{ part.name } {part.exerciseCount}</strong>
          <br />
          <span>project exercises { part.groupProjectCount }</span>
        </p>
      )
    case 'submission':
      return (
        <p>
          <strong>{ part.name } { part.exerciseCount}</strong>
          <br />
          <span>{ part.description }</span>
          <br />
          <span>submit to { part.exerciseSubmissionLink }</span>
        </p>
      )
    case 'special':
      return (
        <p>
          <strong>{ part.name } { part.exerciseCount}</strong>
          <br />
          <span>{ part.description }</span>
          <br />
          <span>submit to { part.requirements.join(', ') }</span>
        </p>
      )
    default:
      return assertNever(part)
  }
}

export default Part;