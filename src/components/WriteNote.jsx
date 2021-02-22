import { Layout, Button, Input } from "antd";
import React, { useState } from "react";

import { useNotes } from "./Store";

import styled from "styled-components";
import "antd/dist/antd.css";

const StyledHeader = styled(Layout.Header)`
  text-align: right;
  background-color: #ddd;
`;

const WriteNote = () => {
  const [state, actions] = useNotes();
  const [value, setValue] = useState("");

  const addNote = () => {
    const notes = [...state.notes];

    if(value.length === 0) return;

    notes.push({ id: notes.length, text: value });
    actions.addNotes(notes);
    setValue("");
  };

  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };

  return ( 
      <Layout>
        <StyledHeader>
          <Button 
          type="primary" 
          onClick={addNote}>
            Zapisz!
          </Button>
        </StyledHeader>
        <Input.TextArea
          allowClear
          placeholder="Autosize height based on content lines"
          autoSize={{ minRows: 16, maxRows: 16 }}
          value={value}
          onChange={handleChangeInput}
        />
      </Layout>
   );
}
 
export default WriteNote;