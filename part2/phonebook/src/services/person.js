import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001/persons',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getAll = async () => {
  const response = await axiosClient.get();
  return response.data;
}

const create = async (newPerson) => {
  const response = await axiosClient.post("/", newPerson)
  return response.data;
}

const update = async (updatePerson) => {
  const response = await axiosClient.put(`/${updatePerson.id}`, updatePerson)
  return response.data;
}

const remove = async (deletePerson) => {
  const response = await axiosClient.delete(`/${deletePerson.id}`, deletePerson);
  return response.data;
}

const personService = { getAll, create, update, remove };
export default personService;