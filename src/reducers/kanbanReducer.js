import { 
  UPDATE_LISTS,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  ADD_POST,
  DELETE_POST
} from "../actions/kanbanActionTypes";

const initialState = {
  lists: null,
};

const kanbanReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_LISTS:
      return {
        ...state,
        lists: payload,
      };
    case ADD_LIST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [payload.id]: {
            ...payload,
            posts: [],
          },
        },
      };
    case EDIT_LIST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [payload.id]: {
            ...state.lists[payload.id],
            ...payload
          }
        },
      };
    case DELETE_LIST:
      const updatedLists = payload;
      return {
        ...state,
        lists: updatedLists,
      };
    case ADD_POST:
      return {
        ...state,
        lists: {
          ...state.lists,
          [payload.list_id]: {
            ...state.lists[payload.list_id],
            posts: [...state.lists[payload.list_id].posts, payload],
          },
        },
      };
    case DELETE_POST:
      const updatedPosts = state.lists[payload.list_id].posts.filter(post => post.id !== payload.id);
      return {
        ...state,
        lists: {
            ...state.lists,
            [payload.list_id]: {
                ...state.lists[payload.list_id],
                posts: updatedPosts
            }
        }
      };
    default:
      return state;
  }
};

export default kanbanReducer;
