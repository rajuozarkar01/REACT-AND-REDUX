import "bootstrap/dist/css/bootstrap.min.css";
const WelcomeMessage = ( {onGetPostsClick} ) => {
  return (
    <center className="welcome-message">
      <h1>There are no posts</h1>
      <button
        type="button"
        onClick={onGetPostsClick}
        className="btn btn-primary"
      >
        Get Posts From Server
      </button>
    </center>
  );
};

export default WelcomeMessage;
