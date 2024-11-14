import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletPost: () => {},
});
//reducer method it takes 1..currentstate 2..action will return new state(currPostList). and used (postListReducer)in args in useReducer + default val
const postListReducer = (currPostList, action) => {
  return currPostList;
};
//PostList will be returned as PostList.Provider component
//PostListProvider: what ever children it reveives as props we render it insied <PostList.Porvider> component also need to pass empty value as prop b'cz without value will not render anything
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = () => {};
  const deletePost = () => {};

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
