import Part from "./Part"

const Content = ({ parts }) => {
    return <>
        <Part name={parts[0].name} exercise={parts[0].exercises} />
        <Part name={parts[1].name} exercise={parts[1].exercises} />
        <Part name={parts[2].name} exercise={parts[2].exercises} />
    </>
}

export default Content