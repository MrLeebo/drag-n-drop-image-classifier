import React from "react";
import ReactDOM from "react-dom";
import Dropzone from "react-dropzone";
import ImageClassifier from "./ImageClassifier";
import henry from "./henry.png";
import "./index.css";

class App extends React.Component {
  state = { img: henry };

  handleDrop = ([file]) => this.setState({ img: file.preview });

  renderRow = ({ className, probability }) => (
    <tr key={className}>
      <td>{`${className[0].toUpperCase()}${className.slice(1)}`}</td>
      <td>{`${(100 * probability).toFixed(2)}%`}</td>
    </tr>
  );

  render() {
    const { img } = this.state;

    return (
      <div className="container">
        <div className="item">
          <p>Drop an image below to see its classifications from MobileNet</p>
          <Dropzone onDrop={this.handleDrop} multiple={false}>
            <img src={img} className="preview" alt="" />
          </Dropzone>
        </div>
        <div className="item">
          <ImageClassifier key={img} image={img}>
            {result => (
              <table>
                <tbody>{result.map(this.renderRow)}</tbody>
              </table>
            )}
          </ImageClassifier>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
