import React from 'react'
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai';
import { Link } from 'react-router-dom';

const Home = ({ data }) => {
  return (
    <>
      <h1>Adamthedev JS Challenge #1</h1>
      <h3><a target="_blank" rel="noreferrer" href="https://www.instagram.com/p/CI5l-3oAJYe/">Assignment description</a></h3>
      <span>GitHub repo: <a target="_blank" rel="noreferrer" href="https://github.com/jarnobogaert9/adamthedev-js-challenge-1">https://github.com/jarnobogaert9/adamthedev-js-challenge-1</a></span>
      <br /><br />
      <Link to="/raw">Raw</Link>
      {data && <JSONPretty id="json-pretty" data={data} theme={JSONPrettyMon}></JSONPretty>}
    </>
  )
}

export default Home
