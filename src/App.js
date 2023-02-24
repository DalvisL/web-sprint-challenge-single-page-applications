import React, { useState , useEffect } from 'react';
import styled from 'styled-components';
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from './Components/Home';
import Form from './Components/Form';

// Styling for the App component
const StyledDiv = styled.div`
  header { 
    nav {
      display: flex;
      justify-content: flex-end;
      font-size: 2rem;
      gap: 20px;
      margin-right: 20px;
      a {
        text-decoration: none;
      }
    }
  }
  h1 {
    font-size: 3rem;
    text-align: center;
  }
`

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    topping1: false,
    topping2: false,
    special: '',
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    type === 'checkbox'
      ? setFormData({ ...formData, [name]: checked })
      : setFormData({ ...formData, [name]: value });
}

useEffect(() => {
  console.log(formData);
}, [formData]);

const handleSubmit = (event) => {
  event.preventDefault();
  setFormData({
    name: '',
    size: '',
    topping1: false,
    topping2: false,
    special: '',
  })
};

  return (
    <>
      <StyledDiv>
        <h1>Bloomtech Eats</h1>
        <header>
          <nav>
            <li><NavLink exact to='/'>Home</NavLink></li>
            <li><NavLink to='/pizza'>Order</NavLink></li>
          </nav>
        </header>
        
        {/* Routes for the app */}
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/pizza'>
            <Form formData={formData} setFormData={setFormData} handleChange={handleChange} />
          </Route>
        </Switch>

        <footer>
          <p>©2023 Dalvis Liz</p>
        </footer>
      </StyledDiv>
    </>
  );
};
export default App;
