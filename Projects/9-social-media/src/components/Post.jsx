import { AiFillDelete } from "react-icons/ai";

const Post = ({ post }) => {
  return (
    //style need pass an obj. and value in string
    // <div className="card" style="width: 18rem;">
    <div className="card post-card">
      {/* <img src="..." className="card-img-top" alt="..." /> */}
      <div className="card-body ">
        <h5 className="card-title">{post.title}
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        <AiFillDelete />
    <span class="visually-hidden">unread messages</span>
  </span>
        </h5>
        <p className="card-text">{post.body}</p>

        {post.tags.map((tag)=><span class="badge text-bg-primary hashtag">{tag}</span>)}
        <div class="alert alert-success reactions" role="alert">
  A simple success alert—check it out!
</div>
        
      </div>
    </div>
  );
};
export default Post;
