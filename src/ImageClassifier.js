import React from "react";
import ml5 from "ml5";

export default class ImageClassifier extends React.Component {
  state = { results: null };

  async componentDidMount() {
    const { image } = this.props;
    if (!image) {
      return null;
    }

    const el = document.createElement("img");
    el.setAttribute("src", image);
    el.setAttribute("crossOrigin", "anonymous");

    const classifier = await ml5.imageClassifier("MobileNet");
    const results = await classifier.predict(el);
    this.setState({ results });
  }

  render() {
    const { results } = this.state;
    if (!results) {
      return "Loading...";
    }

    return this.props.children(results);
  }
}
