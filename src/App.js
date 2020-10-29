import "./App.css";
import home from "./posts/home.md";
import code_demo from "./posts/code_demo.md";

import React, { Component } from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {xonokai} from 'react-syntax-highlighter/dist/esm/styles/prism'

const renderers = {
  code: ({language, value}) => {
    return <SyntaxHighlighter style={xonokai} language={language} children={value} />
  }
}

class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <NavBar />

        <Route exact path="/" render={() => <BlogPost contents={home} />} />
        <Route path="/code" render={() => <BlogPost contents={code_demo} />} />
      </HashRouter>
    );
  }
}

class NavBar extends Component {
  render() {
    return (
      <div>
        <ul className="sidenav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/code">Code Demo</Link>
          </li>
        </ul>
      </div>
    );
  }
}

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = { markdown_contents: null };
  }

  componentDidMount() {
    fetch(this.props.contents)
      .then((response) => response.text())
      .then((text) => {
        this.setState({ markdown_contents: text });
      });
  }

  render() {
    return (
      <div className="content">
        <ReactMarkdown renderers={renderers} source={this.state.markdown_contents} />
      </div>
    );
  }
}


export default App;
