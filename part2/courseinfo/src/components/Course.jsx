import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

const Course = ({ course }) => {
    const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0)

    return <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={sum} />
    </div>
}

export default Course