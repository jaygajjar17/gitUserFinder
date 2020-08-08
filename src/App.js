import React, { Component, useState, useEffect } from "react";
import "./App.css";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Card, Icon, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
function App() {
  const [name, setname] = useState("");
  const [follower, setfollower] = useState("");
  const [avtar, setavtar] = useState("");
  const [repos, setrepos] = useState("");
  const [Inputs, setInputs] = useState();

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({ login, followers, public_repos, avatar_url }) => {
    setname(login);
    setfollower(followers);
    setrepos(public_repos);
    setavtar(avatar_url);
  };


  const handleUserSearch=(e)=>{
    setInputs(e.target.value);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    fetch(`https://api.github.com/users/${Inputs}`)
    .then(res=>res.json())
    .then(data=>{
      setData(data);
      console.log(data);
    })
  }


  return (
    <div>
      <nav className="nav">Github Finder</nav>
      <form onSubmit={handleSubmit}>
      <div className="inputsearch">
        <Input icon="users" iconPosition="left" placeholder="Username" onChange={handleUserSearch} />
      </div>
      <div className="btn">
        <Button content="Find" primary />
      </div>
      <div className="userprofile">
        <Card>
          <Image src={avtar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {follower} followers
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {repos} Repository
            </a>
          </Card.Content>
        </Card>
      </div>
      </form>
    </div>
  );
}

export default App;
