import React from "react";
const Form = ({
	handleFormSubmit,
	person,
	handleNameChange,
	handleNumberChange,
}) => {
	return (
		<form onSubmit={handleFormSubmit}>
			<div>
				name: <input value={person.name} onChange={handleNameChange} />
			</div>
			<div>
				number: <input value={person.number} onChange={handleNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default Form;
