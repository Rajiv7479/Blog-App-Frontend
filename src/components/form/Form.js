import * as React from "react";
import "./form.css";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";

export default function MediaCard() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    desc: "",
    shortDesc: "",
    image: "",
  });

  const handelInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { title, author, desc, shortDesc, image } = formData;

    await axios.post("http://localhost:5000/posts", {
      title: title,
      author: author,
      image: image,
      shortDesc: shortDesc,
      desc: desc,
    });

    setFormData({
      title: "",
      author: "",
      desc: "",
      shortDesc: "",
      image: "",
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {user && (
        <Card sx={{ maxWidth: 400 }}>
          <Typography gutterBottom variant="h5" component="div">
            Create a Blog
          </Typography>
          <CardContent className="textfield">
            <TextField
              required
              label="Title"
              id="outlined-size-small"
              size="small"
              value={formData.title}
              onChange={handelInput}
              name="title"
              // defaultValue="Hello World"
            />
          </CardContent>
          <CardContent className="textfield">
            <TextField
              required
              id="outlined-size-small"
              size="small"
              label="Author"
              value={formData.author}
              onChange={handelInput}
              name="author"
              // defaultValue="Hello World"
            />
          </CardContent>
          <CardContent className="textfield">
            <TextField
              required
              id="outlined-size-small"
              size="small"
              label="Short Description"
              value={formData.shortDesc}
              onChange={handelInput}
              name="shortDesc"
              // defaultValue="Hello World"
            />
          </CardContent>
          <CardContent className="textfield">
            <TextField
              required
              id="outlined-size-small"
              size="small"
              label="Description"
              value={formData.desc}
              onChange={handelInput}
              name="desc"
              multiline="true"
              minRows="5"
              // defaultValue="Hello World"
            />
          </CardContent>
          {/* <CardContent className="textfield">
        <input
          type="file"
          value={formData.image}
          name="image"
          onChange={handelInput}
        />
      </CardContent> */}
          <CardContent className="textfield">
            <TextField
              required
              id="outlined-size-small"
              size="small"
              label="Upload image url"
              value={formData.image}
              onChange={handelInput}
              name="image"
              // defaultValue="Hello World"
            />
          </CardContent>

          <CardActions>
            <Button onClick={postData} variant="contained" color="success">
              Create
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}
