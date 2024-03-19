import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

const CommentAreaFunction = ({ asin }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (!asin) return;
      setIsLoading(true);
      try {
        let response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY5OTEwNzA0NTg5ZjAwMTk0OGU1N2MiLCJpYXQiOjE3MTA4NTQ0MDcsImV4cCI6MTcxMjA2NDAwN30.T-REObJCGOao4D07vuO1JhaREMyzKM33l0HMavfLgDA",
          },
        });
        if (response.ok) {
          let comments = await response.json();
          setComments(comments);
          setIsLoading(false);
          setIsError(false);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchComments();
  }, [asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentAreaFunction;
