import React from "react";
const Person = ({ person, handleDeleteClick }) => {
	return (
		<li>
			{person.name} {person.number}{" "}
			<button value={person.name} onClick={handleDeleteClick}>
				delete
			</button>
		</li>
	);
};

const Persons = ({ persons, handleDeleteClick }) => {
	return (
		<div>
			<ul>
				{persons.map((person) => (
					<Person
						key={person.id}
						person={person}
						handleDeleteClick={(event) => handleDeleteClick(event, person.id)}
					/>
				))}
			</ul>
		</div>
	);
};

export default Persons;
