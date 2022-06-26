import React from "react";
const Header = (props) => {
	return <h2>{props.course}</h2>;
};

const Part = (props) => {
	return (
		<p>
			{props.part} {props.exercise}
		</p>
	);
};

const Content = (props) => {
	return (
		<div>
			{props.parts.map((part) => (
				<Part key={part.id} part={part.name} exercise={part.exercises} />
			))}
		</div>
	);
};

const Total = (props) => {
	const sum = props.parts.reduce((prev, curr) => prev + curr.exercises, 0);
	return (
		<p>
			<strong>total of {sum} exercises</strong>
		</p>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default Course;
