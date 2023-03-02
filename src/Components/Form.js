import React from 'react'
import styled from 'styled-components'

// Styling for the Form component
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: 85vh;
    margin-top: 20px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 2rem;
    .topping {
        margin-top: 20px;
        h3 {
            font-size: 2.5rem;
            text-align: center;
        }
        .options {
            display: flex;
            flex-direction: column;
            margin-left: 10%;
            margin-top: 20px;
        }
    }
    .name, .special, .size {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        input {
            width: 100%;
        }
    }
    button {
        border: none;
        background: #ffcccc; 
        font-size: 1.5rem;
        &:hover {
            background: #ff9999;
        }
        &:disabled {
            background: #fff7f7;
        }
    }
`

export default function Form(props) {
    const { formData, handleChange, handleSubmit, errors, disabled, checkedToppings } = props;
    const toppingOptions = ['Pepperoni', 'Turkey Pepperoni', 'Sausage', 'Bacon', 'Pineapple', 'Ham', 'Chicken'];
    const nameToUse = checkedToppings.length === 0 ? 'topping1' : 'topping2';
  return (
    <div>
        <div className='errors'>
            <div>{errors.name}</div>
            <div>{errors.size}</div>
            <div>{errors.topping1}</div>
            <div>{errors.topping2}</div>
            <div>{errors.special}</div>
        </div>
        <StyledForm onSubmit={handleSubmit} id='pizza-form'>
            <label>{`Name for Order `}
                <input 
                    onChange={handleChange} 
                    type='text' 
                    name='name' 
                    value={formData.name} 
                    id='name-input'
                    className='name'
                />
            </label>
            <label className='size'>{`Choose a Size `}
                <select onChange={handleChange} name='size' id='size-dropdown' >
                    <option value=''>--Select a Size--</option>
                    <option value='small'>{`Small (13")`}</option>
                    <option value='medium'>{`Medium (15")`}</option>
                    <option value='large'>{`Large (18")`}</option>
                    <option value='party-size'>{`Party Size (24")`}</option>
                </select> 
            </label>
            
             <div className='topping'>
                <h3>{`Toppings ( Only choose two (2) )`}</h3>
                {/* 
                    maps over the toppingOptions array and creates a label and an input for each option
                */}
                <div className='options'> 
                    {toppingOptions.map((topping, index) => {
                        return (
                            <label key={index}>
                                <input 
                                    onChange={handleChange} 
                                    type='checkbox' 
                                    name={nameToUse} 
                                    value={topping} 
                                    disabled={
                                        checkedToppings.length === 2 && !checkedToppings.includes(topping)
                                    }
                                    checked={checkedToppings.includes(topping)}

                                />
                                {topping}
                            </label>
                        )
                    })}
                </div>
                
             </div>
            <label className='special'>{`Special Instructions (optional - 100 characters max) `}
                <input 
                    onChange={handleChange} 
                    type='text' 
                    name='special' 
                    value={formData.special} 
                    id='special-text'
                    placeholder='Special Instructions'
                    
                />
                    
            </label>
            <button id='order-button' disabled={disabled}>Add to order</button>
        </StyledForm>
    </div>
  )
}