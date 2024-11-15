import { act, createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletPost: () => {},
});
//reducer method it takes 1..currentstate 2..action will return new state(currPostList). and used (postListReducer)in args in useReducer + default val
const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if(action.type==='DELETE_POST'){
    //filter keeps true element and delete falsy val
    newPostList = currPostList.filter(post => post.id !== action.payload.postId)
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = () => {};
  const deletePost = (postId) => {
    // dispatchPostList will goto  postListReducer will return new list... how(action)
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};
//default arr n inside obj with id
const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Kashmir",
    body: "Hi Friends, I am going to Kashmir for my vaction. Home to enjoy a lot. Peac out.",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "finally Engineer Ban gaya bhai",
    body: "20 year's of uncertainty and several up-n-downs in life finally the situation took me to the destiny. Pride moment for me and the blastar's get blasted out.",
    reactions: 12,
    userId: "user-12",
    tags: ["Engineer", "up-n-downs", "Pride"],
  },
];
export default PostListProvider;
