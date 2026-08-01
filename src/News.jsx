import React, { useEffect, useState } from "react";
import "./News.css";
import CardActions from "@mui/material/CardActions";

// COVID-19 news feed. The original backend (a free Heroku dyno) is no longer
// available, so the component fetches defensively and degrades to a friendly
// message instead of breaking the page when the request fails or returns
// nothing. Point NEWS_ENDPOINT at any API that returns { news: [...] }.
const NEWS_ENDPOINT = "https://cryptic-ravine-96718.herokuapp.com/";

function News() {
  const [news, setNews] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | empty | error

  useEffect(() => {
    let cancelled = false;

    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_ENDPOINT);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (cancelled) return;

        const items = Array.isArray(data?.news) ? data.news : [];
        setNews(items);
        setStatus(items.length > 0 ? "ready" : "empty");
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load news", error);
        setStatus("error");
      }
    };

    fetchNews();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return <p className="news-message">Loading the latest news…</p>;
  }

  if (status !== "ready") {
    return (
      <p className="news-message">
        News is currently unavailable. Please check back later.
      </p>
    );
  }

  return (
    <div className="App">
      {news.map((item, index) => (
        <div className="App1" key={item.link || index}>
          <h3>{item.title}</h3>
          {item.img && <img src={item.img} alt={item.title} />}
          <CardActions>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </CardActions>
        </div>
      ))}
    </div>
  );
}

export default News;
