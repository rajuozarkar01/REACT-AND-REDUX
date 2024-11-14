import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store"; //name conflict

const PostList = () => {
  const { postList } = useContext(PostListData); //we get obj here
  console.log(postList);

  return (
    <>
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
export default PostList;
