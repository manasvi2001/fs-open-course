import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const average = total ? (good * 1 + bad * -1) / total : 0
    const positive = total ? (good / total) * 100 : 0

    if (total === 0) {
        return <>
            <h2>statistics</h2>
            <div>No feedback given</div>
        </>
    }
    return <>
        <h2>statistics</h2>
        <table>
            <tbody>
                <StatisticLine text={'good'} value={good} />
                <StatisticLine text={'neutral'} value={neutral} />
                <StatisticLine text={'bad'} value={bad} />
                <StatisticLine text={'all'} value={total} />
                <StatisticLine text={'average'} value={average} />
                <StatisticLine text={'positive'} value={`${positive} %`} />
            </tbody>
        </table>
    </>
}

export default Statistics