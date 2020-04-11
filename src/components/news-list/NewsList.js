import React, { Component } from 'react';
import './NewsList.css';

export default class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      page: 1,
      news: [],
      hidden: [],
      updated: []
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { page, news } = this.state;

    fetch(`https://hn.algolia.com/api/v1/search?page=${page}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            news: [...news, ...result.hits]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  loadMore() {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1
      }),
      this.loadData
    );
  }

  getDomain(url) {
    const beg = url.indexOf('www') > 0 ? 'www.' : '//';
    const end = '/'
    const matcher = new RegExp(`${beg}(.*?)${end}`,'gm');
    return url.match(matcher).map((str) => str.slice(beg.length,end.length*-1))
  }

  getTime(time) {
    const current = new Date();
    const postTime = new Date(time)

    const difference = Math.abs(current.getTime() / 1000 - postTime.getTime() / 1000);
    return `${Math.floor(difference / 3600) + ' hours'} ago`;
  }

  onHide(item) {
    const news = [...this.state.news];
    const index = news.findIndex(x => x.objectID === item.objectID);
    news.splice(index, 1);

    this.state.hidden.push(item);

    this.setState({
      news,
    })
    
    // stroing hidden items in local storage
    localStorage.setItem('hidden-news', JSON.stringify(this.state.hidden));
  }

  onUpvote(item) {
    const news = [...this.state.news];
    const index = news.indexOf(item);

    // checking if item already exits in updated-new
    const updated = this.state.updated;
    const updatedIndex = updated.findIndex(x => x.objectID === item.objectID);

    item.points++;
    news.splice(index, 1, item);

    // updating this.state.updated
    updatedIndex >= 0 ? updated.splice(updatedIndex, 1, item): updated.push(item);

    this.setState({
      news,
      updated
    });

    // storing updated item in local storage
    localStorage.setItem('updated-news', JSON.stringify(this.state.updated));
  }

  render() {
    return (
      <div className="news-wrapper">
        <ul>
          {this.state.news.map((item, i) => {
            return <li key={i}>
              <span className="comments">{item.num_comments || 0 }</span>
              <span className="votes">
                {item.points}
                <span className="arrow_up" onClick={() => this.onUpvote(item)}></span>
              </span>
              <span className="title">{item.title}</span>
              {item.url 
                ? <span className="domain">
                    (<a href={item.url}>{this.getDomain(item.url)}</a>)
                  </span>
                : ''
              }
              by <span className="author">{item.author}</span>
              <span className="created-at">{this.getTime(item.created_at)}</span>
              <span className="hide" onClick={() => this.onHide(item)}>
                [ hide ]
              </span>
            </li>
          })}
        </ul>
        <span className="load-more" onClick={() => this.loadMore()}>More</span>
      </div>
    )
  }
}