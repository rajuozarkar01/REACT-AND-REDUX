import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostList } from "../store/post-list-store";
// import {PostList} from "./PostList"

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card post-card">
      <div className="card-body ">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <AiFillDelete />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtag">
            {tag}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          This post has {post.reactions.likes} likes and{" "}
          {post.reactions.dislikes} dislikes.
        </div>
        //If some posts do not have reactions, handle it safely:
        <div className="alert alert-success reactions" role="alert">
          This post has {post.reactions?.likes ?? 0} likes and{" "}
          {post.reactions?.dislikes ?? 0} dislikes.
        </div>
      </div>
    </div>
  );
};
export default Post;
