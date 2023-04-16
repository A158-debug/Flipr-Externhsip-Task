
const notesReducer=  (notes = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      // console.log(action.payload)
      return action.payload.noteMessage;
    case "CREATE":
      return [...notes, action.payload];
    case "UPDATE":
      return notes.map((note) => (note._id === action.payload._id ? action.payload : note));
    case "DELETE":
      return notes.filter((note) => note._id !== action.payload);
    default:
      return notes;
  }
};
export default notesReducer;
