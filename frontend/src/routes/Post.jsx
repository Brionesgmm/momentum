import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

const Post = () => {
  const { user } = useOutletContext();
  const postId = useParams().id;
  const navigate = useNavigate();
  const [post, setPost] = useState();

  useEffect(() => {
    fetch(`/api/post/${postId}`)
      .then((res) => res.json())
      .then(({ post }) => setPost(post));
  }, [setPost, postId]);

  if (post === undefined) {
    return null;
  } else if (post === null) {
    return <h2>Post not found</h2>;
  }

  const handleLike = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const response = await fetch(form.action, {
      method: form.method,
    });
    const likes = await response.json();
    setPost({ ...post, likes });
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const response = await fetch(form.action, {
      method: form.method,
    });
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-6">
          <h2>{post.title}</h2>
          <img className="img-fluid" src={post.image} alt={post.caption} />
          <div className="row justify-content-between">
            <form
              className="col-1"
              action={`/api/post/likePost/${post._id}?_method=PUT`}
              method="POST"
              onSubmit={handleLike}
            >
              <button
                className="btn btn-primary fa fa-heart"
                type="submit"
              ></button>
            </form>
            <h3 className="col-3">Likes: {post.likes}</h3>
            {post.user === user._id && (
              <form
                action={`/api/post/deletePost/${post._id}?_method=DELETE`}
                method="POST"
                className="col-3"
                onSubmit={handleDelete}
              >
                <button
                  className="btn btn-primary fa fa-trash"
                  type="submit"
                ></button>
              </form>
            )}
          </div>
        </div>
        <div className="col-3 mt-5">
          <p>{post.caption}</p>
        </div>
        <div className="col-6 mt-5">
          <Link className="btn btn-primary" to="/profile">
            Return to Profile
          </Link>
          <Link className="btn btn-primary" to="/feed">
            Return to Feed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
