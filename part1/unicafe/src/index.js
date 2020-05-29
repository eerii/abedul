import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, name}) => <button onClick={onClick}>{name}</button>

const Display = ({name, value}) => <tr><td>{name}</td><td style={{ textAlign: "center" }}>{value}</td></tr>

const Math = ({good, neutral, bad}) => {
    const goodValue = 1
    const neutralValue = 0
    const badValue = -1

    const all = good + neutral + bad
    const average = (good*goodValue + neutral*neutralValue + bad*badValue) / all
    const positive = (good / all) * 100

    return(
        <>
            <Display name={"Total reviews: "} value={all} />
            <Display name={"Average: "} value={average.toFixed(3)} />
            <Display name={"Positive reviews: "} value={positive.toFixed(3) + "%"} />
        </>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
        return (<p>There is no feedback yet. Please use the buttons above!</p>)
    }
    else{
        return (
            <>
                <table>
                    <tbody>
                        <Display name={"Good reviews: "} value={good} />
                        <Display name={"Neutral reviews: "} value={neutral} />
                        <Display name={"Bad reviews: "} value={bad} />
                        <Math good={good} neutral={neutral} bad={bad}/>
                    </tbody>
                </table>
            </>
        )
    }
}

const App = () => {
    //STATES
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const onGood = () => setGood(good + 1)
    const onNeutral = () => setNeutral(neutral + 1)
    const onBad = () => setBad(bad + 1)

    return(
        <div>
            <h1>Unicafe</h1>
            <h2>Give feedback!</h2>
            <div>
                <Button name={"Good :D"} onClick={onGood} />
                <Button name={"Meh :/"} onClick={onNeutral} />
                <Button name={"Bad :("} onClick={onBad} />
            </div>
            <h2>Statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))