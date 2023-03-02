import React from 'react';
import pizza from '../Assets/Pizza.jpg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styling for the Home component
const StyledHome = styled.div`
    display: flex;
    flex-direction: column;
    img {
        width: 100%;
    }
    a {
        text-decoration: none;
    }
    
    .overlay {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 30%;
        color: white;
        font-size: 5rem;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        text-align: center;
        width: 100%;
        gap: 50px;
        button {
            width: fit-content;
            align-self: center;
            background: none;
            border: none;
            font-size: 4rem;
            color: white;
            &:hover {
                color: darkgray;
            }
        }
    }

`

export default function Home() {
  return (
    <div>
        <StyledHome>
            <img src={pizza} alt='pizza' />
            <div className='overlay'>
                <span>Your favorite food delivered while coding.</span>
                <button id='order-pizza'><Link to='/pizza'>Order Pizza</Link></button>
            </div>
        </StyledHome>
    </div>
  )
}
