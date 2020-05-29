import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, name}) => <button onClick={onClick}>{name}</button>

const Display = ({name, value}) => <p>{name + value}</p>

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
            <div>
                <Display name={"Good reviews: "} value={good} />
                <Display name={"Neutral reviews: "} value={neutral} />
                <Display name={"Bad reviews: "} value={bad} />
            </div>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))