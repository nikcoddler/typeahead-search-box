import React from 'react';

const CommentBox = ({ comment }) => {
  const commentData = comment;

  return (
    <ul>
      {commentData.comments.length > 0 ? (
        <>
          <li>{commentData.text}</li>
          {commentData.comments.length > 0 &&
            commentData.comments.map((comment) => (
              <CommentBox comment={comment} />
            ))}
        </>
      ) : (
        <li>{commentData.text}</li>
      )}
    </ul>
  );
};

export default CommentBox;
