import React, { useState } from "react";
import Axios from "axios";
import "./Post.css";
import { useHistory } from "react-router-dom";
import { Button, Form, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from"../Navbar";

function Post() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  let history = useHistory();

  function createPost() {
    Axios.post(`http://localhost:5000/posts/create`,{
      postUserId: sessionStorage.getItem("userid"),
      title: title,
      description: description,
      image: image,
    }, {
      headers: {
        Authorization: sessionStorage.getItem("authToken"),
      },
    }).then((response) => {
      setPost(response.data);
       history.push("/");
    });
  }

  return (
    <>
    <Navbar/>
    <div className="Post">
      <div className="PostForm justify-content-center">
        <Form>
          <h1 className="mt-4">Create a new post</h1>
          <Form.Group
            className="justify-items-center"
            as={Col}
            md="4"
            controlId="exampleForm.Input1"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          >
            <Form.Label className="text-center">Tiltle</Form.Label>
            <Form.Control className="text-center" type="text" rows={3} />
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            controlId="exampleForm.ControlTextarea1"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          >
            <Form.Label className="text-center">Message</Form.Label>
            <Form.Control className="text-center" as="textarea" rows={3} />
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Image Upload</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => {
                setImage(event.target.value);
              }}
            />
          </Form.Group>
          <Button
            className="text-center col-md-4 mt-4"
            variant="secondary"
            size="sm"
            onClick={createPost}
          >
            Upload
          </Button>
        </Form>
      </div>
    </div>
    </>
  );
}
export default Post;
