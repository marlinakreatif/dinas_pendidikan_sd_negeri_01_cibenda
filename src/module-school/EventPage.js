import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

export default class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    console.log(editorState);
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }
}
