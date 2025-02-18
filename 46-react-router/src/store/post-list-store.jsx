import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletPost: () => {},
});

const postListReducer = (currPostList, action) => {
  // console.log(action); //debbuging
  // console.log(currPostList); //debbuging
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    // newPostList = action.payload.posts;
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
 

  const addPost = (post) => {
    console.log("add post called", post);
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };
  //(12:08 stamp) will tak posts arr
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

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
    <PostList.Provider 
    value={{ postList,addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};
export default PostListProvider;
