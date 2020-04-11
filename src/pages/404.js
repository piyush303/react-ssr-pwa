import React from 'react'
// import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
// import logo from '../logo.svg'

const NotFound = ({ staticContext }) => {
  if (staticContext) {
    staticContext.res.statusCode = 404
  }
  return (
    <>
      <Helmet>
        <title> Page not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div className="App">
      </div>
    </>
  )
}
export default NotFound
