import React from 'react';

const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
}

const Total = ({ parts }) => {
    const ex = parts.map(parts => parts.exercises)
    const sum = ex.reduce((a, b) => a + b, 0)
    return(
        <h4>Number of exercises {sum}</h4>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(parts => <Part key={parts.id} part={parts}/>)}
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course