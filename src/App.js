import React, { useState , useEffect } from 'react';
import styled from 'styled-components';
import { Route, Switch, NavLink } from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home';
import Form from './Components/Form';
import * as yup from 'yup';
import schema from './Validation/schema';

// Styling for the App component
const StyledDiv = styled.div`
  header, footer { 
    display: flex;
    flex-direction: column;
    background-color: #fdfdff;
    opacity: 0.8;
    background-image:  repeating-linear-gradient(45deg, #f63c3c 25%, transparent 25%, transparent 75%, #f63c3c 75%, #f63c3c), repeating-linear-gradient(45deg, #f63c3c 25%, #fdfdff 25%, #fdfdff 75%, #f63c3c 75%, #f63c3c);
    background-position: 0 0, 40px 40px;
    background-size: 80px 80px;
    height: 7.5vh;
    p {
      font-size: 1.75rem;
    }
    nav {
      display: flex;
      justify-content: flex-end;
      font-size: 1.75rem;
      gap: 20px;
      margin-right: 20px;
      background: white;
      width: fit-content;
      align-self: flex-end;
      a {
        text-decoration: none;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-weight: bold;
        &:hover {
          color: gray;
        }
      }
    }
  }
  h1 {
    font-size: 4rem;
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 900;
    width: fit-content;
    margin-top: 15px;
    align-self: center;
    color: black;
    background: white;
  }
  
`

const App = () => {

  // State and form errors
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    topping1: false,
    topping2: false,
    special: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    size: '',
    topping1: '',
    topping2: '',
    special: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [orders, setOrders] = useState([]);
  const [checkedToppings, setCheckedToppings] = useState([]);

  // callback function that handles checkbox 
  const checkForTwoToppings = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (checkedToppings.length < 2) {
        setCheckedToppings([...checkedToppings, value]);
      } 
  } // if unchecked remove topping from checkedToppings
    else {
      setCheckedToppings(checkedToppings.filter(topping => topping !== value));
    }
  }
  const checkToppingLength = (checkedToppings) => {
    if (checkedToppings.length === 0) {
      setFormData({ ...formData, topping1: false, topping2: false });
    } else if (checkedToppings.length === 1) {
      setFormData({ ...formData, topping1: true, topping2: false });
    } else if (checkedToppings.length === 2) {
      setFormData({ ...formData, topping1: true, topping2: true });
    }
  }
  useEffect(() => {
    checkToppingLength(checkedToppings);
  }, [checkedToppings]);

  // for debugging
  useEffect(() => {
    console.log(formData)
  }, [formData]);

    // validate form data
  const setFormErrors = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(valid => {
        setErrors({...errors, [name]: ''})
        // if all fields are valid, enable the submit button
        setDisabled(!valid)
      })
      .catch(err => setErrors({...errors, [name]: err.errors[0]}))
  }

  const handleChange = (event) => {
    const { name, value, type} = event.target;
    const valueToUse = type === 'checkbox' ? event.target.checked : value;
    type === 'checkbox'
      ? checkForTwoToppings(event)
      : setFormData({ ...formData, [name]: valueToUse });
    setFormErrors(name, valueToUse);
}

const handleSubmit = (event) => {
  event.preventDefault()
  const newOrder = {
    name: formData.name,
    size: formData.size,
    topping1: formData.topping1,
    topping2: formData.topping2,
    special: formData.special
  }

  axios.post('https://reqres.in/api/orders', newOrder)
    .then(req => {
      const newArr = [...orders];
      newArr.push(req.data);
      setOrders(newArr);
      setFormData({
        name: '',
        size: '',
        topping1: false,
        topping2: false,
        special: '' 
      })
      setCheckedToppings([]);
    })
    .catch(err => console.error(err))
};

  return (
    <>
      <StyledDiv>
        <header>
          <h1>Bloomtech Eats</h1>
          <nav>
            <li><NavLink exact to='/' >Home</NavLink></li>
            <li><NavLink to='/pizza' id='order-pizza'>Order</NavLink></li>
          </nav>
        </header>
        
        {/* Routes for the app */}
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/pizza'>
            <Form 
              formData={formData} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit} 
              errors={errors} 
              disabled={disabled}
              checkedToppings={checkedToppings}
            />
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
