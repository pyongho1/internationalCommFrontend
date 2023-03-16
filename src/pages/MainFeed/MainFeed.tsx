import { Post } from "../../types/models";

interface PostProps {
  posts: Post[];
}

const MainFeed = (props: PostProps) => {
  const { posts } = props;

  // if (!posts.length) return <p>Oh no! Seems like there is no post yet...</p>;

  return (
    <div>
      <h1>Main Feed</h1>
      {posts.map((post: Post) => {
        return (
          <div key={post.id}>
            {" "}
            {/* add a unique key prop to each child element */}
            <h2>{post.title}</h2> {/* use the post title property */}
            <p>{post.content}</p> {/* use the post content property */}
          </div>
        );
      })}
    </div>
  );
};

export default MainFeed;
