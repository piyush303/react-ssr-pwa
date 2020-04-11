import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import Header from '../components/header/Header'
import NewsList from '../components/news-list/NewsList'

class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     error: null,
  //     isLoaded: false,
  //     news: []
  //   }
  // }

  // componentDidMount() {
  //   fetch('https://hn.algolia.com/api/v1/items/1')
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           news: [result]
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }

  render() {
    return (
      <>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Awesome Home Page" />
        </Helmet>
        <div className="App">
          <Header />
          <NewsList/>
        </div>
      </>
    )
  }
}

export default Home
