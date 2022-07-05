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
import { Link } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

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
  const [share, setShare] = useState(false);

  const shareHandler = () => {
    setShare(!share);
  };
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  // //submitComment
  // const [cmnt, setCmnt] = useState("");
  // const [allComments, setAllComments] = useState([]);
  // const commentHandler = (e) => {
  //   const value = e.target.value;
  //   setCmnt(value);
  // };

  // // console.log(allComments);
  // const curr_user = JSON.parse(localStorage.getItem("user"));
  // const submitComment = async (e) => {
  //   e.preventDefault();
  //   await axios.post("https://blog-app2k22.herokuapp.com/posts/api/comments", {
  //     author: curr_user.data.result.fullname,
  //     id: post._id,
  //     comment: cmnt,
  //   });
  //   setCmnt(" ");
  // };

  // //const allComments = axios.get("http://localhost:5000/posts/api/comments");

  // useEffect(() => {
  //   const fetchComment = async () => {
  //     try {
  //       await axios
  //         .get("https://blog-app2k22.herokuapp.com/posts/api/comments")
  //         .then((res) => {
  //           setAllComments(res.data);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchComment();

  //   //console.log(allComments);
  // }, [allComments]);

  const [deleteIcon, setDeleteIcon] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const URL = `https://sri-blog-web-app.netlify.app/post/${post._id}`;

  //DELETE ICON
  const deletePost = async () => {
    await axios.delete(`https://blog-app2k22.herokuapp.com/posts/${post._id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.title[0]}
          </Avatar>
        }
        action={
          user ? (
            user.data.result.fullname === post.author ? (
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
            ) : null
          ) : null
        }
        title={post.title}
        subheader={`author :- ${post.author}`}
      />
      <Link to={`/post/${post._id}`} className="linkstyle">
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
      </Link>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={shareHandler}>
          <ShareIcon />
        </IconButton>
        {share && (
          <div className="shareIconBox">
            <FacebookShareButton url={URL}>
              <FacebookIcon size={25} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={URL}>
              <WhatsappIcon size={25} round={true} />
            </WhatsappShareButton>
            <TwitterShareButton url={URL}>
              <TwitterIcon size={25} round={true} />
            </TwitterShareButton>
            <TelegramShareButton url={URL}>
              <TelegramIcon size={25} round={true} />
            </TelegramShareButton>
            <EmailShareButton url={URL}>
              <EmailIcon size={25} round={true} />
            </EmailShareButton>
          </div>
        )}
      </CardActions>

      {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
      </ExpandMore> */}

      {/*<Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>{post.desc}</Typography>

          {/* Comments section  
        
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
        </CardContent> 
       </Collapse> */}
    </Card>
  );
}
