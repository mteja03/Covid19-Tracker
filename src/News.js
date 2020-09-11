import React from "react";
import "./News.css";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { imageOverlay } from "leaflet";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }
  componentDidMount() {
    fetch("https://cryptic-ravine-96718.herokuapp.com/")
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          news: myJson.news,
        });
      });
  }
  render() {
    console.log(this.state);
    return (

      <div className="App">
        {this.state.news.map((item, index, img) => {
          return (
            <div className="App1">
              <h3>{item.title}</h3>
              <img src={item.img} />
              <CardActions>
                <a size="small" color="primary" href={item.link}>
                  Read More
                </a>
              </CardActions>
            </div>
          );
        })}
      </div>

    );
  }
}

export default App;