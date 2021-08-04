import React, { useState } from "react";
import pStyles from "./Profile.module.css";
import Axios from "axios";
import "../../.env";
import Avatar from "../../assets/Logos/icon-left-font-monochrome-black.png";
import Image from "../../assets/img/plage.jpg";
import { FcSimCardChip } from "react-icons/fc";
import Navbar from "../Navbar";
import { useHistory } from "react-router-dom";

function Profile(props) {
  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [infos, setInformations] = useState([]);
  const [updatingMode, setUpdatingMode] = useState(-1);
  const [postTitleBckp, setPostTitleBckp] = useState("");
  const [postDescBckp, setPostDescBckp] = useState("");
  const [refresh, setRefresh] = useState(false);

  React.useEffect(() => {
    Axios.post(
      `http://localhost:5000/auth/infos`,
      { userid: sessionStorage.getItem("userid") },
      {
        headers: {
          Authorization: sessionStorage.getItem("authToken"),
        },
      }
    ).then((response) => {
      console.log(response);
      setInformations(response.data);
    });
  }, []);

  React.useEffect(() => {
    Axios.post(`http://localhost:5000/posts/fromUser`, {
      userid: sessionStorage.getItem("userid"),
    },
    {
      headers: {
        Authorization: sessionStorage.getItem("authToken"),
      },
    }
    
    ).then((response) => {
      setPosts(response.data);
    });
  }, [refresh]);

  return (
    <>
      <Navbar />
      <div className={pStyles.profile_content}>
        {infos.map((val, idx) => {
          return (
            <div key={idx}>
              <div className={pStyles.profile}>
                <div className={pStyles.user_profile}>
                  <img
                    className={pStyles.avatar}
                    src={Avatar}
                    alt="Groupomania avatar"
                  />
                  <div className={pStyles.chip}>
                    <FcSimCardChip
                      className={`${pStyles.chip} ${pStyles.icon}`}
                    />
                  </div>
                  <div className={pStyles.card}>
                    <div className={pStyles.username}>
                      username : {val.username}
                    </div>
                    <div className={pStyles.name}>name : {val.name}</div>
                    <div className={pStyles.firstname}>
                      firstname : {val.firstname}
                    </div>
                    <div className={pStyles.email}>email :{val.email}</div>
                    <div className={pStyles.role}>role : {val.role}</div>
                  </div>
                </div>
                <button
                  className={`${pStyles.Buttons} ${pStyles.delete}`}
                  onClick={confirmDeleteAccount}
                >
                  Delete Your Account
                </button>
              </div>
            </div>
          );
        })}

        <div className={pStyles.container}>
          {posts.map((val, idx) => {
            return (
              <div
                id={`Post${val.idposts}`}
                key={idx}
                className={pStyles.Posts}
              >
                <input type="hidden" placeholder={val.idposts}></input>
                <input type="hidden" placeholder={val.postuserid}></input>
                <div className={pStyles.Title}>
                  {updatingMode !== val.idposts ? (
                    <>
                      <div className="postTitle">{val.title}</div>
                    </>
                  ) : (
                    <>
                      <div className="postTitle" contentEditable="true">
                        {val.title}
                      </div>
                    </>
                  )}
                </div>
                <div className={pStyles.Image}>
                  <img src={Image} alt="poster" />
                </div>
                <div className={pStyles.Description}>
                  {updatingMode !== val.idposts ? (
                    <>
                      <div className="postDesc">{val.description}</div>
                    </>
                  ) : (
                    <>
                      <div className="postDesc" contentEditable="true">
                        {val.description}
                      </div>
                    </>
                  )}
                </div>
                <div className={pStyles.Date}>created on {val.date}</div>
                <div className={pStyles.Likes}>likes : {val.likes}</div>
                {updatingMode !== val.idposts ? (
                  <>
                    <button
                      className={`${pStyles.Buttons} ${pStyles.update}`}
                      data-post={val.idposts}
                      onClick={updateMode}
                    >
                      Update
                    </button>
                    <button
                      className={`${pStyles.Buttons} ${pStyles.delete}`}
                      data-post={val.idposts}
                      onClick={confirmDelete}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`${pStyles.Buttons} ${pStyles.update}`}
                      data-post={val.idposts}
                      onClick={updatePost}
                    >
                      Save changes
                    </button>
                    <button
                      className={`${pStyles.Buttons} ${pStyles.delete}`}
                      data-post={val.idposts}
                      onClick={readMode}
                    >
                      Cancel changes
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  function updateMode(e) {
    let idPost = e.target.getAttribute("data-post");
    setPostTitleBckp(
      document.querySelector("#Post" + idPost + " .postTitle").innerText
    );
    setPostDescBckp(
      document.querySelector("#Post" + idPost + " .postDesc").innerText
    );
    setUpdatingMode(parseInt(idPost));
  }

  function readMode(e) {
    let idPost = e.target.getAttribute("data-post");
    document.querySelector("#Post" + idPost + " .postTitle").innerText =
      postTitleBckp;
    document.querySelector("#Post" + idPost + " .postDesc").innerText =
      postDescBckp;
    setPostTitleBckp("");
    setPostDescBckp("");
    setUpdatingMode(-1);
  }

  function updatePost(e) {
    let postId = e.target.getAttribute("data-post");
    let postTitle = document.querySelector(
      "#Post" + postId + " .postTitle"
    ).innerText;
    let postDesc = document.querySelector(
      "#Post" + postId + " .postDesc"
    ).innerText;
    Axios.put(`http://localhost:5000/posts/update`, {
      postId: postId,
      postTitle: postTitle,
      postDesc: postDesc,
    },
    {
      headers: {
        Authorization: sessionStorage.getItem("authToken"),
      },
    }
    ).then((response) => {
      setUpdatingMode(-1);
      setRefresh(true);
    });
  }

  function confirmDelete(e) {
    let choice = window.confirm("Are you sure you want to delete this post ?");
    if (choice) {
      console.log(e.target.getAttribute("data-post"));
      deletePost(e.target.getAttribute("data-post"));
    }
  }
  function confirmDeleteAccount() {
    let choice = window.confirm("Are you sure you want to delete this post ?");
    if (choice) {
      let userid = sessionStorage.getItem("userid");
      deleteUser(userid);
    }
  }

  function deletePost(id) {
    Axios.delete(`http://localhost:5000/posts/delete/${id}`, {
      headers: {
        Authorization: sessionStorage.getItem("authToken"),
      },
    }).then(() => {
      history.go(0);
    });
  }
  function deleteUser(id) {
    Axios.delete(`http://localhost:5000/auth/delete/${id}`,
    {
      headers: {
        Authorization: sessionStorage.getItem("authToken"),
      },
    }).then(() => {
      sessionStorage.clear();
      history.push("/login");
    });
  }
}

export default Profile;
