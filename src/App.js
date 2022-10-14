import React, { useEffect, useState } from 'react';
import './index.scss';

function Collection({ name, images }) {
  return (
    <div className="collection">
      <img className="collection__big" src={images[0]} alt="Item" />
      <div className="collection__bottom">
        <img className="collection__mini" src={images[1]} alt="Item" />
        <img className="collection__mini" src={images[2]} alt="Item" />
        <img className="collection__mini" src={images[3]} alt="Item" />
      </div>
      <h4>{name}</h4>
    </div>
  );
}




function App() {
  const cats = [
    { "name": "All" },
    { "name": "Sea" },
    { "name": "Mountains" },
    { "name": "Architecture" },
    { "name": "Cities" }
  ]
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(0);
useEffect(() => {
  setIsLoading(true);
  const category = categoryId ? `category=${categoryId}`: null;

  fetch(`https://6348705c0484786c6e99c393.mockapi.io/photo?page=${page}&limit=3&${category} `).then(res => res.json()).then(json =>{
    setCollection(json);
  }).catch(err => {
    console.warn(err);
    alert('Error');
  }).finally(() => setIsLoading(false));
},[categoryId,page])

const [searchValue, setSearchValue] = useState('');
const onChangeSearchValue = (event) =>{
  setSearchValue(event.target.value);
} 

  return (
    <div className="App">
      <h1>My collection of photo</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((item,index) => (
              <li key={item.name} onClick={() => setCategoryId(index)} className={categoryId == index ? 'active' : null}>{item.name}</li>
            ) )
          }
        </ul>
        <input value={searchValue} onChange={onChangeSearchValue} className="search-input" placeholder="Search by title" />
      </div>
      <div className="content">
       {
        isLoading ? (<h2>Loading...</h2>)
         : 
         (
          collection.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => <Collection images={item.photos} name={item.name} key={item + index}/>)
        )
       }
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((item, index) => <li className={page == index + 1 ? 'active' : null} onClick={() => setPage(index + 1)} key={index}>{index + 1}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
