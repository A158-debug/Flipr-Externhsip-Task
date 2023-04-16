import axios from 'axios';

const url = 'http://localhost:5000/';

export const fetchNotes = ()=> axios.get(url)
export const createNote = (newNote) => axios.post(url, newNote);
export const updateNote = (id, updatedNote) => axios.patch(`http://localhost:5000/${id}`, updatedNote);
export const deleteNote = (id) => axios.delete(`http://localhost:5000/${id}`);


