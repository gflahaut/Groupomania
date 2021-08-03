import React, { useState } from "react";
import "./Home.css";
import Axios from "axios";
import Avatar from "../../assets/img/Pix_lune.jpg";
import { FaThumbsUp } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import ResponsiveComponent from "react-responsive-component";
import { useHistory } from "react-router-dom";

function Home() {
  let history = useHistory();
  const [postsList, setPostsList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [userRole, setUserRole] = useState("");

  React.useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.clear();
      history.push("/");
    }
  });

  React.useEffect(() => {
    let userid = localStorage.getItem("userid");
    console.log(userid);

    Axios.post(`http://localhost:5000/auth/role`, { userid: userid }).then(
      (response) => {
        setUserRole(response.data[0].role);
      }
    );
  }, []);

  React.useEffect(() => {
    Axios.get(`http://localhost:5000/posts/all`).then((response) => {
      console.log(response.data);
      setPostsList(response.data);
      if (!response) return "No posts !";
    });
  }, [refresh]);

  return (
    <div>
      <div className="hfilters">
        <label htmlFor="hfilter" className="hfilterLabel">
          Rechercher les posts d'un utilisateur
        </label>
        <input
          id="hfilter"
          type="text"
          placeholder="Ex: Jacques Lachery ou jlachery"
          onChange={getUsers}
        />
        <span className="clearFilters" onClick={clearFilters}>
          <FaMinusCircle /> Clear filter
        </span>
      </div>
      <div className="userHolder">
        {usersList.map((val, index) => {
          return (
            <div key={index} data-user={val.userId} onClick={filterPosts}>
              {val.username + " - " + val.firstname + " " + val.name}
            </div>
          );
        })}
      </div>
      <div>
        <ResponsiveComponent query="only screen and (max-width: 767px)">
          <div className="hcontainer visible-xs-block" id="marker-xs">
            {postsList.map((val, index) => {
              return (
                <li className="h" key={index}>
                  <div className="hPosts" id="marker1-xs">
                    <input
                      type="hidden"
                      className="hidPost"
                      placeholder={val.idposts}
                    />
                    <input
                      type="hidden"
                      className="hidAuthor"
                      placeholder={val.postuserid}
                    />
                    <div className="Image">
                      {val.imageurl}
                      <img className="himg" alt="post" src={Avatar} />
                    </div>
                    <div className="hTitle visible-xs-block" id="marker-xs">
                      {val.title}
                    </div>
                    <div className="hAuthor"> by @{val.username}</div>
                    <div className="hDescription">{val.description}</div>
                    <div className="hDate">created in {val.date}</div>
                    <div className="hLikes">
                      {val.likes.split(",").length}
                      <FaThumbsUp
                        data-post={val.idposts}
                        data-likes={val.likes}
                        className="thumbsUp"
                        onClick={postLiked}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
            ;
          </div>
        </ResponsiveComponent>
        <ResponsiveComponent query="only screen and (min-width: 768px) and (max-width : 991px)">
          <div className="hcontainer" class="visible-sm-block" id="marker-sm">
            {postsList.map((val, index) => {
              return (
                <li className="h" key={index}>
                  <div className="hPosts" id="marker1-sm">
                    <input
                      type="hidden"
                      className="hidPost"
                      placeholder={val.idposts}
                    />
                    <input
                      type="hidden"
                      className="hidAuthor"
                      placeholder={val.postuserid}
                    />
                    <div className="Image">
                      {val.imageurl}
                      <img className="himg" alt="post" src={Avatar} />
                    </div>
                    <div className="hTitle">{val.title}</div>
                    <div className="hAuthor"> by @{val.username}</div>
                    <div className="hDescription">{val.description}</div>
                    <div className="hDate">created in {val.date}</div>
                    <div className="hLikes">
                      {val.likes.split(",").length}
                      <FaThumbsUp
                        data-post={val.idposts}
                        data-likes={val.likes}
                        className="thumbsUp"
                        onClick={postLiked}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
            ;
          </div>
        </ResponsiveComponent>
        <ResponsiveComponent query="only screen and (min-width: 992px)">
          <div className="hcontainer visible-md-block" id="marker-md">
            {postsList.map((val, index) => {
              return (
                <li className="h" key={index}>
                  <div className="hPosts" id="marker1-md">
                    <input
                      id="home"
                      type="hidden"
                      className="hidPost"
                      placeholder={val.idposts}
                    />
                    <input
                      id="home"
                      type="hidden"
                      className="hidAuthor"
                      placeholder={val.postuserid}
                    />
                    <div className="Image">
                      {val.imageurl}
                      <img className="himg" alt="post" src={Avatar} />
                    </div>
                    <div className="hTitle">{val.title}</div>
                    <div className="hAuthor"> by @{val.username}</div>
                    <div className="hDescription">{val.description}</div>
                    <div className="hDate">created in {val.date}</div>
                    <div
                      className="hLikes"
                      data-post={val.idposts}
                      data-likes={val.likes}
                      onClick={postLiked}
                    >
                      {val.likes.split(",").length}
                      {val.likes.includes(localStorage.getItem("userid")) ? (
                        <FaThumbsUp className="thumbsUpLiked" />
                      ) : (
                        <FaThumbsUp className="thumbsUp" />
                      )}
                    </div>
                    {userRole === "ADMIN" ? (
                      <>
                        <button
                          className="Buttons btn btn-danger delete col-md-8 offset-md-2 mt-4 visible-xs-block"
                          data-post={val.idposts}
                          onClick={confirmDelete}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              );
            })}
            ;
          </div>
        </ResponsiveComponent>
      </div>
    </div>
  );

  function getUsers() {
    let search = document.getElementById("hfilter").value;
    if (search.length > 2) {
      Axios.post(`http://localhost:5000/auth/filter`, { search: search }).then(
        (response) => {
          if (response.data.result) {
            setUsersList(response.data.content);
          } else {
            setUsersList(response.data.message);
          }
        }
      );
    } else {
      setUsersList([]);
    }
  }

  function filterPosts(e) {
    setUsersList([]);
    document.getElementById("hfilter").value = "";
    let userid = e.target.getAttribute("data-user");
    Axios.post(`http://localhost:5000/posts/fromUser`, { userid: userid }).then(
      (response) => {
        setPostsList(response.data);
      }
    );
  }

  function clearFilters() {
    setRefresh(!refresh);
  }

  function postLiked(e) {
    e.preventDefault();
    console.log(e.currentTarget);
    let postId = e.currentTarget.getAttribute("data-post");
    let likes = e.currentTarget.getAttribute("data-likes");
    let userId = localStorage.getItem("userid");
    console.log(postId);
    console.log(likes);
    Axios.post("http://localhost:5000/posts/like", {
      postId: postId,
      userid: userId,
      likes: likes,
    })
      .then((response) => {
        console.log("??");
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  function confirmDelete(e) {
    //setModalShow(true);
    let choice = window.confirm("Are you sure you want to delete this post ?");
    if (choice) {
      deletePost(e.target.getAttribute("data-post"));
    }
  }

  function deletePost(id) {
    Axios.post(`http://localhost:5000/posts/delete`, {
      postId: id,
    }).then(() => {
      setRefresh(!refresh);
    });
  }
}

export default Home;
