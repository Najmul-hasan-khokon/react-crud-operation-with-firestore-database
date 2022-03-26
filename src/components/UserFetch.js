import React from "react";
import useFetch from "../custom hooks/useFetch";

// all the functionality from useFetch custom hook

export default function UserFetch() {
  const {
    loading,
    error,
    data: comments,
  } = useFetch("https://jsonplaceholder.typicode.com/posts/1/comments");

  return (
    <div>
      <h1>Custom React Hook Data Fetching</h1>
      {loading && <div>loading...</div>}
      {error && <div>there was an error</div>}
      {!loading &&
        !error &&
        comments.map((comment) => (
          <div key={comment.id}>
            <h2>{comment.name}</h2> <strong>{comment.email}</strong>
          </div>
        ))}
    </div>
  );
}
