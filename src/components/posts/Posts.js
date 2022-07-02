import * as React from "react";
import "./posts.css";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ post }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //submitComment
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
    await axios.post("http://localhost:5000/posts/api/comments", {
      author: curr_user.data.result.fullname,
      id: post._id,
      comment: cmnt,
    });
    setCmnt(" ");
  };

  //const allComments = axios.get("http://localhost:5000/posts/api/comments");

  useEffect(() => {
    const fetchComment = async () => {
      try {
        await axios
          .get("http://localhost:5000/posts/api/comments")
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

  //deleteIcon
  const deletePost = async () => {
    await axios.delete(`http://localhost:5000/posts/${post._id}`);
  };

  const [deleteIcon, setDeleteIcon] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.title[0]}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={() => setDeleteIcon(!deleteIcon)}
          >
            {deleteIcon ? (
              <DeleteIcon onClick={deletePost} />
            ) : (
              <MoreVertIcon />
            )}
          </IconButton>
        }
        title={post.title}
        subheader={`author :- ${post.author}`}
      />

      <CardMedia
        component="img"
        height="194"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.shortDesc.slice(0, 150)}...
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>{post.desc}</Typography>

          {/* Comments section  */}
          <hr />
          <Typography paragraph>Comments:</Typography>

          {user && (
            <div className="commentBox">
              <TextField
                id="outlined-size-small"
                size="small"
                label="Comment..."
                name="comment"
                multiline="true"
                minRows="3"
                onChange={commentHandler}
                value={cmnt}
                fontSize="5px"

                // defaultValue="Hello World"
              />
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={submitComment}
              >
                Submit
              </Button>
            </div>
          )}
          <br />
          <br />

          {allComments.map((comment) => {
            return post._id === comment.commentId ? (
              <Card sx={{ minWidth: 275 }} key={comment._id}>
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

          {/* <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve. 
           </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}
