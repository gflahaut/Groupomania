import React, { useState } from 'react';
import './Profile.css';
import Axios from "axios";
import "../../.env";
import Avatar from '../../assets/Logos/icon-left-font-monochrome-black.png';
import Image from '../../assets/img/plage.jpg';
import ResponsiveComponent from "react-responsive-component";
import { Card, Button, ListGroup, ListGroupItem, CardGroup, Row, Col, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaThumbsUp } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { ImFloppyDisk } from "react-icons/im";
import { useHistory } from 'react-router-dom';

function Profile(props) {
  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [infos, setInformations] = useState([]);
  const [updatingMode, setUpdatingMode] = useState(-1);
  const [postTitleBckp, setPostTitleBckp] = useState("");
  const [postDescBckp, setPostDescBckp] = useState("");
  const [postPassword, setPostPassword] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [postsLength, setPostsLength] = useState(0);
  // const [modalShow, setModalShow] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.clear();
      history.push("/");
    }
  });

  React.useEffect(() => {
    // Axios.get(`${process.env.BASE_URL}/users/infos`).then((response) => {
    //   setInformations(response.data);
    // });
    Axios.post(`http://localhost:5000/auth/infos`, { userid: localStorage.getItem("userid") }).then((response) => {
      console.log(response.data);
      setInformations(response.data);
      // setInformationsLength(response.data.length);
    });
  }, []);

  React.useEffect(() => {
    Axios.post(`http://localhost:5000/posts/fromUser`, { userid: localStorage.getItem("userid") }).then((response) => {
      setPosts(response.data);
      setPostsLength(response.data.length);
    });
  }, [refresh]);


  return (
    <div className="profile-content">
      <ResponsiveComponent query="only screen and (min-width: 320px)">
        <div id="lateral-panel">
          <input id="lateral-panel-input" type="checkbox" />
          <label id="lateral-panel-label" htmlFor="lateral-panel-input"></label>
          <div id="lateral-panel-bloc">
            { infos.map((val, idx) => {
              return (
                <div className="ml-2 mr-2" id="profile" key={ idx }>
                  <Table striped bordered hover responsive="sm" className="puser_profile table-active">
                    <thead>
                      <tr>
                        <th className="pprofile">Personal Account</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      <tr>
                        <td className="pusername">
                        <img className="pimg" src={ Avatar } alt="logo groupomania" />Username : { val.username }</td>
                      </tr>
                      <tr>
                        <td className="center-block ppassword">
                          Password :
                          { updatingMode !== val.idposts ? (
                            <>
                              <input className="infosPassword" type='text' placeholder={ val.password }></input>
                            </>
                          ) : (
                            <>
                              <input type='text' placeholder={ val.password }></input>
                            </>
                          ) }
                        </td>
                      </tr>
                      <tr>
                        <td className="center-block pparameters">
                          { updatingMode !== val.idposts ? (
                            <>
                              <Button variant=" secondary " className="Buttons update col-md-8 offset-md-2 mt-4 visible-xs-block" data-post={ val.idposts } onClick={ updateMode }> <FcSettings /> Change it </Button>
                            </>
                          ) : (
                            <>
                              <Button variant=" secondary " className="Buttons update col-md-8 offset-md-2 mt-4 visible-xs-block" data-post={ val.idposts } onClick={ updatePost }><ImFloppyDisk />Save changes</Button>
                            </>
                          ) }
                        </td>
                      </tr>
                      <tr>
                        <td className="pfirstname">Firstname : { val.firstname }</td>
                      </tr>
                      <tr>
                        <td className="pname">Name : { val.name }</td>
                      </tr>
                      <tr>
                        <td className="pemail">Email : { val.email }</td>
                      </tr>
                      <tr>
                        <td className="prole">Role : { val.role }</td>
                      </tr>
                      <tr>
                        <td className="center-block pfonction">Fonction : { val.fonction }</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              );
            }) }
          </div>
        </div>
      </ResponsiveComponent>


      <div className="container">
        { console.log(postsLength) }
        { posts.map((val, index) => {
          return (
            <div key={index} className="pcontent">
              <ResponsiveComponent query="only screen and (max-width: 767px)">
                <Container fluid="xs">
                  <Row>
                    <Col >
                      <CardGroup className="pPosts" key={ index }>
                        <Card className="center-block visible-xs-block mt-2 mb-2  ml-2 mr-2" id="marker-xs" style={ { width: '10rem' } } id={ `Post${val.idposts}` }>
                          <input className="pinput" type="hidden" placeholder={ val.idposts }></input>
                          <input className="pinput" type="hidden" placeholder={ val.postuserid }></input>
                          <Card.Img className="visible-xs-block pimg2" id="marker-xs" variant="top" src={ Image } alt="Card image" />
                          <Card.Body className="visible-xs-block pCardBody" id="marker-xs" className="Title">
                            { updatingMode !== val.idposts ? (
                              <>
                                <Card.Title className=""><input className="pinput postTitle" type="text" placeholder={ val.title }></input></Card.Title>
                              </>
                            ) : (
                              <>
                                <Card.Title className="" contentEditable="true"><input className="pinput postTitle" type="text" placeholder={ val.title }></input></Card.Title>
                              </>
                            ) }
                            <Card.Text className="pDescription">
                              { updatingMode !== val.idposts ? (
                                <>
                                  <Card.Text className="postDescription"><input className="pinput" type="text" placeholder={ val.description }></input></Card.Text>
                                </>
                              ) : (
                                <>
                                  <Card.Text className="postDescription" contentEditable="true"><input className="pinput" type="text" placeholder={ val.description }></input></Card.Text>
                                </>
                              ) }
                            </Card.Text>
                            <ListGroup className="plist-group-flush">
                              <ListGroupItem className="pDate">created on { val.date }</ListGroupItem>
                              <ListGroupItem className="Likes">{ val.likes.split(",").length }<FaThumbsUp className="pThumbsUp"/></ListGroupItem>
                            </ListGroup>
                          </Card.Body>
                          <Button id="marker-xs" variant="primary" className="col-md-8 offset-md-2 mt-4 visible-xs-block">Send Message</Button>
                          { updatingMode !== val.idposts ? (
                            <>
                              <Button variant="success" className="Buttons update col-md-8 offset-md-2 mt-4 visible-xs-block" data-post={ val.idposts } onClick={ updateMode }>Update</Button>
                              <Button variant="danger" className="Buttons delete col-md-8 offset-md-2 mt-4 visible-xs-block" data-post={ val.idposts } onClick={ confirmDelete }>Delete</Button>
                            </>
                          ) : (
                            <>
                              <Button variant="success" className="Buttons update col-md-8 offset-md-2 mt-4 visible-xs-block" data-post={ val.idposts } onClick={ updatePost }>Save changes</Button>
                              <Button variant="danger" className="Buttons delete col-md-8 offset-md-2 mt-4 visible-xs-block" data-post={ val.idposts } onClick={ readMode }>Cancel changes</Button>
                            </>
                          ) }
                        </Card>
                      </CardGroup>

                    </Col>
                  </Row>
                </Container>
              </ResponsiveComponent>
              <ResponsiveComponent query="only screen and (min-width: 768px) and (max-width : 991px)">
                <Container fluid="sm">
                  <Row>
                    <Col >
                      <CardGroup key={ index }>
                        <Card className="Posts visible-sm-block" id="marker-sm" id={ `Post${val.idposts}` }>
                          <input type="hidden" className="pinput" placeholder={ val.idposts }></input>
                          <input type="hidden" className="pinput" placeholder={ val.postuserid }></input>
                          <Card.Img className="visible-sm-block pimg2" id="marker-sm" src={ Image } alt="Card image" />
                          <Card.Body className="Title visible-sm-block pCardBody" id="marker-sm">
                            { updatingMode !== val.idposts ? (
                              <>
                                <Card.Title className="pTitle">{ val.title }</Card.Title>
                              </>
                            ) : (
                              <>
                                <Card.Title className="pTitle" contentEditable="true">{ val.title }</Card.Title>
                              </>
                            ) }
                            <Card.Text className="pDescription">
                              { updatingMode !== val.idposts ? (
                                <>
                                  <Card.Text className="pDescription">{ val.description }</Card.Text>
                                </>
                              ) : (
                                <>
                                  <Card.Text className="pDescription" contentEditable="true">{ val.description }</Card.Text>
                                </>
                              ) }
                            </Card.Text>
                            <ListGroup className="plist-group-flush">
                              <ListGroupItem className="pDate">created on { val.date }</ListGroupItem>
                              <ListGroupItem className="pThumbsUp Likes">{ val.likes.split(",").length }<FaThumbsUp className="pThumbsUp" /></ListGroupItem>

                            </ListGroup>
                          </Card.Body>
                          <Button id="marker-sm" variant="primary" className="pButton col-md-8 offset-md-2 mt-4 visible-sm-block">Send Message</Button>
                          { updatingMode !== val.idposts ? (
                            <>
                              <Button variant="success" id="marker-sm" className="Buttons update col-md-8 offset-md-2 mt-4 visible-sm-block" data-post={ val.idposts } onClick={ updateMode }>Update</Button>
                              <Button variant="danger" id="marker-sm" className="Buttons delete col-md-8 offset-md-2 mt-4 visible-sm-block" data-post={ val.idposts } onClick={ confirmDelete }>Delete</Button>
                            </>
                          ) : (
                            <>
                              <Button variant="success" id="marker-sm" className="Buttons update col-md-8 offset-md-2 mt-4 visible-sm-block" data-post={ val.idposts } onClick={ updatePost }>Save changes</Button>
                              <Button variant="danger" id="marker-sm" className="Buttons delete col-md-8 offset-md-2 mt-4 visible-sm-block" data-post={ val.idposts } onClick={ readMode }>Cancel changes</Button>
                            </>
                          ) }
                        </Card>
                      </CardGroup>


                    </Col>
                  </Row>
                </Container>
              </ResponsiveComponent>
              <ResponsiveComponent query="only screen and (min-width: 992px)">
                <Container fluid="md">
                  <Row>
                    <Col >
                      <CardGroup key={ index }>
                        <Card className="Posts visible-lg-block" id="marker-md" id={ `Post${val.idposts}` } style={ { width: '25rem' } }>
                          <input type="hidden" placeholder={ val.idposts }></input>
                          <input type="hidden" placeholder={ val.postuserid }></input>
                          <Card.Img className="visible-lg-block pimg2" id="marker-md" src={ Image } alt="Card image" />
                          <Card.Body className="Title visible-lg-block" id="marker-md">
                            { updatingMode !== val.idposts ? (
                              <>
                                <Card.Title className="postTitle">{ val.title }</Card.Title>
                              </>
                            ) : (
                              <>
                                <div className="postTitle" contentEditable="true">{ val.title }</div>
                              </>
                            ) }
                            <Card.Text className="Description">
                              { updatingMode !== val.idposts ? (
                                <>
                                  <Card.Text className="postDesc">{ val.description }</Card.Text>
                                </>
                              ) : (
                                <>
                                  <div className="postDesc" contentEditable="true">{ val.description }</div>
                                </>
                              ) }
                            </Card.Text>
                            <ListGroup className="list-group-flush">
                              <ListGroupItem className="Date">created on { val.date }</ListGroupItem>
                              <ListGroupItem className="pThumbsUp Likes">{ val.likes.split(",").length }<FaThumbsUp className="pThumbsUp" /></ListGroupItem>

                            </ListGroup>
                          </Card.Body>
                          <Button id="marker-md" variant="primary" className="col-md-8 offset-md-2 mt-4 visible-lg-block">Send Message</Button>
                          { updatingMode !== val.idposts ? (
                            <>
                              <Button id="marker-md" variant="success" className="Buttons update col-md-8 offset-md-2 mt-2 visible-lg-block" data-post={ val.idposts } onClick={ updateMode }>Update</Button>
                              <Button id="marker-md" variant="danger" className="Buttons delete col-md-8 offset-md-2 mt-2 visible-lg-block" data-post={ val.idposts } onClick={ confirmDelete }>Delete</Button>
                            </>
                          ) : (
                            <>
                              <Button id="marker-md" variant="success" className="Buttons update col-md-8 offset-md-2 mt-2 visible-lg-block" data-post={ val.idposts } onClick={ updatePost }>Save changes</Button>
                              <Button id="marker-md" variant="danger" className="Buttons delete col-md-8 offset-md-2 mt-2 visible-lg-block" data-post={ val.idposts } onClick={ readMode }>Cancel changes</Button>
                            </>
                          ) }
                        </Card>

                      </CardGroup>

                    </Col>
                  </Row>
                </Container>
              </ResponsiveComponent>
            </div>
          );
        }) }
      </div>
    </div>
  );

  function updateMode(e) {
    let idPost = e.target.getAttribute("data-post");
    console.log(document.querySelector("#Post"+idPost+" .postTitle"));
    console.log(document.querySelector("#Post"+idPost+" .postDesc"));
    setPostTitleBckp(document.querySelector("#Post"+idPost+" .postTitle").innerText);
    setPostDescBckp(document.querySelector("#Post"+idPost+" .postDesc").innerText);
    setUpdatingMode(parseInt(idPost));
  }
  // setPostPasswordBckp(document.querySelector("#Post"+postId+" .postPassword").innerText);
  // let postPassword = document.querySelector("#Post"+postId+" .postPassword").innerText;

  function readMode(e) {
    let idPost = e.target.getAttribute("data-post");
    console.log(idPost)
    document.querySelector("#Post"+idPost+" .postTitle").innerText = postTitleBckp;
    document.querySelector("#Post"+idPost+" .postDesc").innerText = postDescBckp;

    setPostTitleBckp("");
    setPostDescBckp("");
    setUpdatingMode(-1);
  }

  function updatePost(e) {
    let postId = e.target.getAttribute("data-post");
    let postTitle = document.querySelector("#Post"+postId+" .postTitle").innerText;
    let postDesc = document.querySelector("#Post"+postId+" .postDesc").innerText;

    console.log(postTitle);
    console.log(postDesc);
    Axios.post(`http://localhost:5000/posts/update`, {
      postId: postId, postTitle: postTitle, postDesc: postDesc
    })
      .then((response) => {
        setUpdatingMode(-1);
        setRefresh(!refresh);
      });
  }

  function confirmDelete(e) {
    //setModalShow(true);
    let choice = window.confirm('Are you sure you want to delete this post ?');
    if (choice) {
      deletePost(e.target.getAttribute("data-post"));
    }
  }

  function deletePost(id) {
    Axios
      .post(`http://localhost:5000/posts/delete`, {
        postId: id
      })
      .then(() => {
        setRefresh(!refresh);
      });
  }

}
export default Profile;;