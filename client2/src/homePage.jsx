import React, { useEffect, useState } from "react";
import "./homePage.css";

import FileBase64 from "react-filebase64";
import Axios from "axios";

const HomePage = () => {
  const [pageState, setPageState] = useState(0);
  const [foundList, setFoundList] = useState([]);
  const [lostList, setLostList] = useState([]);

  useEffect(() => {
    clickHandler(0);
  }, []);

  function clickHandler(data) {
    if (data === 1) {
      Axios.post("http://localhost:8080/founditem", {
        email: localStorage.getItem("User-email"),
      }).then((res) => {
        if (!res.data) {
          alert("You have not uploaded any items!!");
          window.location.href = "/homepage";
        } else {
          setFoundList(res.data.item);
        }
      });
    } else if (data === 0) {
      Axios.get("http://localhost:8080/lostitem").then((res) => {
        setLostList(res.data);
      });
    } else if (data === 3) {
      window.location.href = "/chat";
    }
    setPageState(data);
  }
  return (
    <>
      <div class="parent-container">
        <div class="container2">
          <div class="menu">Menu</div>
          <ol>
            <li>
              <a onClick={() => clickHandler(0)}>
                <i class="lost"></i>Lost-item
              </a>
            </li>
            <li>
              <a onClick={() => clickHandler(1)}>
                <i class="found"></i>Found-items
              </a>
            </li>
            <li>
              <a onClick={() => clickHandler(2)}>
                <i class="upload"></i>Upload-item
              </a>
            </li>
            <li>
              <a onClick={() => clickHandler(3)}>
                <i class="upload"></i>Chats
              </a>
            </li>
          </ol>
          <ol class="btm">
            <li>
              <a href="http://localhost:3000/#about">
                <i class="about"></i>About
              </a>
            </li>
            <li>
              <a href="http://localhost:3000/#contact">
                <i class="contact"></i>Contact-us
              </a>
            </li>
          </ol>
        </div>
        {pageState === 0 ? (
          <div class="container3">
            <h2 class="heading">Lost and Found</h2>
            {lostList.map((ele) => {
              return ele.item.map((d) => {
                return (
                  <LostList
                    email={ele.email}
                    itemName={d.itemName}
                    itemPlace={d.itemPlace}
                    itemImage={d.itemImage}
                  />
                );
              });
            })}
          </div>
        ) : pageState === 1 ? (
          <div class="container3">
            <h2 class="heading">Lost and Found</h2>
            {foundList.map((ele) => {
              return (
                <FoundList
                  itemName={ele.itemName}
                  itemPlace={ele.itemPlace}
                  itemImage={ele.itemImage}
                />
              );
            })}
          </div>
        ) : (
          <UploadItem />
        )}
      </div>
    </>
  );
};

const FoundList = (props) => {
  const { itemName, itemPlace, itemImage } = props;

  function removeFromList(data) {
    const dataTobedeleted = {
      itemName: data,
      email: localStorage.getItem("User-email"),
    };
    Axios.post("http://localhost:8080/deleteitem", dataTobedeleted)
      .then((res) => {
        if (res.data === "deleted") {
          alert("Item removed");
          window.location.href = "/homepage";
        }
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  }

  return (
    <div class="itemlist">
      <img class="image" src={itemImage} alt="Image not found" />
      <ul>
        <h1 class="itemname">{itemName}</h1>
        <p class="Place">{itemPlace}</p>
        <button class="cancel" onClick={() => removeFromList(itemName)}>
          Remove from list
        </button>
      </ul>
    </div>
  );
};

const LostList = (props) => {
  const { email, itemName, itemPlace, itemImage } = props;
  function clickHandler(data) {
    var temp = localStorage.getItem("User-email");
    console.log(data);
    if (data === temp) {
      alert("This is Posted by you");
    } else {
      Axios.post("http://localhost:8080/addfriend", {
        myEmail: localStorage.getItem("User-email"),
        friendEmail: data,
      }).then((res) => {
        if (res === "exist") {
          alert("Friend exist");
        }
        window.location.href = "/chat";
      });
    }
  }
  return (
    <div class="itemlist">
      <img className="image" src={itemImage} alt="Uploaded" />

      <ul>
        <h1 class="itemname">{itemName}</h1>
        <p class="Place">{itemPlace}</p>
        <button onClick={() => clickHandler(email)}>Chat</button>
      </ul>
    </div>
  );
};

const UploadItem = () => {
  const data = { itemName: "", itemPlace: "", email: "", itemImage: "" };
  const [inputData, setInputData] = useState(data);
  const [selectedFile, setSelectedFile] = useState(null);

  function handleData(e) {
    if (e.target.name === "itemImage") {
      setSelectedFile(e.target.files[0]);
    } else {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!inputData.itemName || !inputData.itemPlace || !inputData.itemImage) {
      alert("Please fill all details");
    } else {
      const fdata = {
        item: {
          itemName: inputData.itemName,
          itemPlace: inputData.itemPlace,
          itemImage: inputData.itemImage,
        },
        email: localStorage.getItem("User-email"),
      };
      //console.log(fdata.item.itemImage);

      try {
        Axios.post("http://localhost:8080/adduseritem", fdata).then(
          (response) => {
            if (response.data === "done1" || response.data === "updated") {
              alert("Item uploaded");
              window.location.href = "/homepage";
            }
          }
        );
      } catch (error) {
        console.error("Error:", error);
        alert("Error in item uploading");
      }
    }
  }

  return (
    <div className="container">
      <h1>Upload Item</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            onChange={handleData}
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemPlace">Item Place:</label>
          <input
            type="text"
            id="itemPlace"
            name="itemPlace"
            onChange={handleData}
          />
        </div>

        <FileBase64
          multiple={false}
          onDone={({ base64 }) =>
            setInputData({ ...inputData, itemImage: base64 })
          }
        />
        <div className="form-group">
          <input type="submit" className="btn-submit" value="Upload" />
        </div>
      </form>
    </div>
  );
};

export default HomePage;
