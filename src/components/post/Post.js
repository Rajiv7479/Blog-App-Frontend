import React, { useState, useEffect } from "react";
import "./post.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Container } from "@mui/system";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Grow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";

const Post = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  //COMMENTS SECTION

  const [cmnt, setCmnt] = useState("");
  const [allComments, setAllComments] = useState([]);
  const commentHandler = (e) => {
    const value = e.target.value;
    setCmnt(value);
  };

  // console.log(allComments);
  const curr_user = JSON.parse(localStorage.getItem("user"));
  const submitComment = async (e) => {
    e.preventDefault();
    try {
      if (cmnt) {
        await axios.post(
          "https://blog-app2k22.herokuapp.com/posts/api/comments",
          {
            author: curr_user.data.result.fullname,
            id: post._id,
            comment: cmnt,
          }
        );
        setCmnt(" ");
      } else {
        alert("Comment Field is empty!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //const allComments = axios.get("http://localhost:5000/posts/api/comments");

  useEffect(() => {
    const fetchComment = async () => {
      try {
        await axios
          .get("https://blog-app2k22.herokuapp.com/posts/api/comments")
          .then((res) => {
            setAllComments(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchComment();

    //console.log(allComments);
  }, [allComments]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`https://blog-app2k22.herokuapp.com/posts/${id}`)
        .then((res) => {
          setPost(res.data);
        });
    }
    fetchData();
  }, []);

  //console.log(post);

  return (
    <>
      <Navbar />
      <Container className="box">
        <Grow in>
          <Grid container>
            <Grid className="details" md={6}>
              <div className="title">{post.title}</div>

              <Typography paragraph>{post.desc}</Typography>
            </Grid>

            <Grid container className="img_comment" xs={12} md={6}>
              <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                  component="img"
                  height="350"
                  image={post.image}
                  alt={post.title}
                />
              </Card>

              <CardContent>
                {/* Comments section  */}
                <hr />
                <Typography paragraph>Comments:</Typography>

                {curr_user && (
                  <Grid>
                    <CardContent className="textfield">
                      <TextField
                        id="outlined-size-small"
                        size="small"
                        label="Comment..."
                        name="comment"
                        multiline="true"
                        minRows="3"
                        minColoumn="1"
                        onChange={commentHandler}
                        value={cmnt}
                        fontSize="5px"

                        // defaultValue="Hello World"
                      />
                    </CardContent>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={submitComment}
                    >
                      Submit
                    </Button>
                  </Grid>
                )}
                <br />
                <br />

                {allComments.map((comment) => {
                  return post._id === comment.commentId ? (
                    <Card
                      sx={{ minWidth: 275 }}
                      key={comment._id}
                      className="comment_card"
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 10 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {comment.author}
                        </Typography>

                        <Typography variant="inherit">
                          {comment.comment}
                          <br />
                          {'"a benevolent smile"'}
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : null;
                })}
              </CardContent>
            </Grid>
          </Grid>
        </Grow>
      </Container>

      <Footer />
    </>
  );
};

export default Post;
