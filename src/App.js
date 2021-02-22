import React, { useState } from "react";
import { Layout, Button, Card } from "antd";

import WriteNote from "./components/WriteNote";
import { useNotes } from "./components/Store";

import styled from "styled-components";
import "antd/dist/antd.css";

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledLi = styled.li`
  padding: 5px 10px 0 10px;
  cursor: pointer;
`;
const StyledHr = styled.hr`
  margin-top: 5px;
  margin-bottom: 1px;
`;

const App = () => {
  const [state, actions] = useNotes();
  const [showAdd, setShowAdd] = useState();
  const [showNote, setShowNote] = useState();
  const [text, setText] = useState();

  const handleShowNote = (textContent) => {
    setText(textContent);
    setShowAdd(false);
    setShowNote(true);
  };

  const handleDeleteNote = () => {
    const deleteList = state.notes.filter((note) => note.text !== text);
    setShowNote(false);
    actions.addNotes(deleteList);
  };

  const notesList = state.notes.map((note) => (
    <StyledLi key={note.id} onClick={() => handleShowNote(note.text)}>
      {note.text.length >= 80
        ? note.text.slice(0, 80).concat("...")
        : note.text}
      <StyledHr />
    </StyledLi>
  ));

  const showAddNote = () => {
    setShowAdd(!showAdd);
    setShowNote(false);
  };

  const { Sider } = Layout;

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "50vh",
          position: "relative",
          left: 0,
          color: "#fff",
        }}
      >
        <Button
          style={{ margin: "10px 60px" }}
          type="primary"
          onClick={showAddNote}
        >
          Dodaj!
        </Button>
        <StyledUl>{notesList}</StyledUl>
      </Sider>
      {showAdd ? <WriteNote /> : null}
      {showNote ? (
        <Card title="Notatka" bordered={false} style={{ width: "100%" }}>
          {text}
          <Button
            onClick={handleDeleteNote}
            style={{ display: "block", marginTop: "10px" }}
          >
            Usuń
          </Button>
        </Card>
      ) : null}
    </Layout>
  );
};

export default App;
