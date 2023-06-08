
const postReducer = (state = { isLoading: true, posts: [] }, action) => {

  // console.log("state ", state)
  // console.log("action ", action)

  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true }

    case "END_LOADING":
      return { ...state, isLoading: false }

    case "FETCH_ALL":
      console.log(state.posts)
      console.log(Array.isArray(action.payload.data))
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case "FETCH_BY_SEARCH":
      return {
        ...state,
        posts: action.payload.data,
      }

    case "FETCH_BY_CREATOR":
      return { ...state, posts: action.payload.data };

    case "CREATE":
      return { ...state, posts: [...state.posts, action.payload] }

    case "UPDATE":
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }

    case "LIKE":
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }

    case "COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        }),
      };

    case "DELETE":
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }

    default:
      return state;
  }
};
export default postReducer;
