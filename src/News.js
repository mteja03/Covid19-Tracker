import React from "react";
import "./News.css";
import CardActions from "@material-ui/core/CardActions";

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
    return (

      <div className="App">
        {this.state.news.map((item, index) => {
          return (
            <div className="App1" key={item.link || index}>
              <h3>{item.title}</h3>
              <img src={item.img} alt={item.title} />
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