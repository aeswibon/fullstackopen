import React from "react";
import personService from './services/person';
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Form from './components/Form'

const App = () => {
  const [allPersons, setAllPersons] = React.useState([])
  const [filterPersons, setFilterPersons] = React.useState([]);
  const [filter, setFilter] = React.useState('')
  const [newPerson, setNewPerson] = React.useState({
    name: "",
    number: "",
  })
  const [message, setMessage] = React.useState(null)

  React.useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setAllPersons(persons)
        setFilterPersons(persons);
      })
  }, [])

  React.useEffect(() => {
    setFilterPersons(persons => {
      const data = persons.filter(person => person.name?.toLowerCase().includes(filter.toLowerCase()))
      return data;
    })
  }, [filter])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const personDetails = allPersons.filter((person) =>
      person.name === newPerson.name
    )

    if (personDetails.length !== 0) {
      const updatedDetails = { ...personDetails[0], number: newPerson.number }
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(updatedDetails).then(returnedPerson => {
            console.log(`${newPerson.name} successfully updated`)
            setAllPersons(allPersons.map(personItem => personItem.id === personDetails.id ? returnedPerson : personItem))
            setMessage(
              `${newPerson.name} was successfully updated`
            )
          })
          .catch((error) => {
            console.log(error)
            setAllPersons(allPersons.filter(person => person.id !== updatedDetails.id))
            setMessage(
              `[ERROR] ${newPerson.name} was already deleted from server`
            )
          })
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setAllPersons({
            ...allPersons,
            returnedPerson
          })
          setMessage(
            `${newPerson.name} was successfully added`
          )
        })
        .catch(error => {
          setMessage(
            `[ERROR] ${error}`
          )
          console.log(error)
        })
    }
    setTimeout(() => {
      setMessage(null)
      window.location.reload();
    }, 5000)
    setNewPerson({
      name: "",
      number: "",
    })
  }

  const handleNameChange = (event) => {
    setNewPerson(person => {
      return {
        ...person,
        name: event.target.value,
      }
    })
  }

  const handleNumberChange = (event) => {
    setNewPerson(person => {
      return {
        ...person,
        number: event.target.value,
      }
    })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteClick = (event, id) => {
    if (window.confirm(`Delete ${event.target.value} ?`)) {
      const filteredPerson = allPersons.find(person => person.id === id)
      const personToBeDeleted = { ...filteredPerson }
      personService
        .remove(personToBeDeleted)
        .then(() => {
          setAllPersons(allPersons.filter(person => person.id !== personToBeDeleted.id));
          setMessage(
            `${personToBeDeleted.name} was successfully deleted`
          )
        })
        .catch((error) => {
          setMessage(`[ERROR] ${error.response.data.error}`)
        })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterName={filter} filterNameChange={handleFilterChange} />
      <h2>Add new person</h2>
      <Form handleFormSubmit={handleFormSubmit} person={newPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} handleDeleteClick={handleDeleteClick} />
    </div>
  )
}
export default App;
