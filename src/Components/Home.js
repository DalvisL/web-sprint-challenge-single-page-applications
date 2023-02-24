import React from 'react';
import pizza from '../Assets/Pizza.jpg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styling for the Home component
const StyledHome = styled.div`
    img {
        width: 100%;
    }
    a {
        text-decoration: none;
    }

`

export default function Home() {
  return (
    <div>
        <StyledHome>
            <img src={pizza} alt='pizza' />
            <div></div>
            <button id='order-pizza'><Link to='/pizza'>Order Pizza</Link></button>
        </StyledHome>
    </div>
  )
}
