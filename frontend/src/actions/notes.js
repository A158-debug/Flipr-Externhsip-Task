import * as api from '../api/index'

// redux thunk is used --> so that data can be fetched asynchronously
// it just add one more arrow fucntion and instead of returning we just have tp dispatch that action

export const getNotes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchNotes();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error)
  }
}

export const createNote = (note) => async (dispatch) => {
  try {
    const { data } = await api.createNote(note);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error)
  }
}

export const updateNote = (id, note) => async (dispatch) => {
  try {
    const { data } = await api.updateNote(id, note);
    dispatch({ type: 'UPDATE', payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteNote = (id) => async (dispatch) => {
  try {
    await api.deleteNote(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likeNote = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeNote(id);
    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};