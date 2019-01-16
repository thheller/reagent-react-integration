import React, { Component } from "react";
import ReactDOM from "react-dom";

const { Link, Image, Text } = window.app.core;

class App extends Component {
  state = {
    link: true
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Image src="logo.svg" className="App-logo" alt="logo" />
          <Text>
            Edit <code>cljs-src/core.cljs</code> and save to hot-reload.
          </Text>
          {this.state.link && (
            <>
              <Link href="http://reagent-project.github.io/">
                Learn Reagent
              </Link>
              <Link href="https://figwheel.org/">Learn Figwheel</Link>
            </>
          )}
          <button onClick={() => this.setState({ link: !this.state.link })}>
            Toggle links
          </button>
          <Text style={{ fontSize: 12, maxWidth: 420 }}>
            Toggle link visibility and change <code>app.core.link</code>{" "}
            component. This will hot-reload namespace code, but shouldn't update
            the UI since changed component is unmounted. Once you toggle it
            back, you'll see updated Reagent component.
          </Text>
        </header>
      </div>
    );
  }
}

const renderApp = () =>
  ReactDOM.render(<App />, document.getElementById("root"));

window.renderApp = renderApp;

renderApp();
