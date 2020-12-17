import './App.css';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import Home from './component/Home';
import Raw from './component/Raw';

function App() {
  const [transformedData, setTransformedData] = useState({});

  const filterGender = ({ gender, raw }) => {
    return raw.filter(x => x.gender.toLowerCase() === gender);
  }

  const filterByLetter = (data) => {
    const gender = data[0].gender.toLowerCase();
    // Get every first letter but exclude doubles (this is done automatically by the fact that we are using a Set)
    let letters = new Set();
    data.forEach(person => letters.add(person.first_name[0].toLowerCase()))

    // Sort all letters of object into an array
    const sortedLetters = Array.from(letters).sort((a, b) => {
      if (a < b) return -1;
      else if (a > b) return +1;
      else return 0;
    })

    // Create key for each letter initialized with an empty array
    const obj = {};
    sortedLetters.forEach(letter => obj[letter] = []);

    for (const letter in obj) {
      const namesByLetter = data.filter(person => person.first_name[0].toLowerCase() === letter);
      // Delete gender
      namesByLetter.forEach(person => delete person.gender)
      obj[letter] = namesByLetter;
    }
    // console.log(obj);
    return {
      [gender]: obj
    }
  }

  const fetchRawData = async () => {
    const response = await fetch(`https://raw.githubusercontent.com/machieajones/instagramChallenges/main/dummyUsers.json`).catch(err => console.log(`Error occurred while fetching data: ${err}`));
    const json = await response.json().catch((err) => console.log(`Error occured while parsin to JSON: ${err}`));
    return json;
  }

  const transformData = (raw) => {
    // Get all males
    const males = filterGender({ raw, gender: 'male' });
    // Get all females
    const females = filterGender({ raw, gender: 'female' });

    // Filter males by letter
    const malesFilterdByLetter = filterByLetter(males);
    // Filter females by letter
    const femalesFilterdByLetter = filterByLetter(females);

    // // Sort 
    // Object.entries(malesFilterdByLetter).sort((x, y) => {
    //   if (x.first_name < y.first_name) { return -1; }
    //   if (x.first_name > y.first_name) { return 1; }
    //   return 0;
    // })
    return {
      ...malesFilterdByLetter,
      ...femalesFilterdByLetter
    }
  }

  const executeAll = async () => {
    const raw = await fetchRawData();
    const transformed = transformData(raw);
    setTransformedData(transformed);
  }

  useEffect(() => {
    executeAll();
  })

  return (
    <>
      <Router>
        <div className="container">
          <Route render={() => <Home data={transformedData} />} path="/" exact />
        </div>
        <Route render={() => <Raw data={transformedData} />} path="/raw" />
      </Router>
    </>
  );
}

export default App;
