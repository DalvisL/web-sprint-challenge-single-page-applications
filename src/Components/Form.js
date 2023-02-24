import React from 'react'
import styled from 'styled-components'

// Styling for the Form component
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    .topping {
        margin-top: 20px;
        h3 {
            font-size: 1.5rem;

        }
    }
`

export default function Form(props) {
    const { formData, setFormData, handleChange } = props;
    const toppingOptions = ['Pepperoni', 'Sausage', 'Bacon', 'Pineapple'];
  return (
    <div>
        <StyledForm id='pizza-form'>
            <label> Name
                <input onChange={handleChange} type='text' name='name' value={formData.name} id='name-input'></input>
            </label>
            <select onChange={handleChange} name='size' id='size-dropdown'>
                <option value=''>--Select a Size--</option>
                <option value='small'>{`Small (13")`}</option>
                <option value='medium'>{`Medium (15")`}</option>
                <option value='large'>{`Large (18")`}</option>
                <option value='party-size'>{`Party Size (24")`}</option>
            </select>
             <div className='topping'>
                <h3>Topping 1</h3>
                {/* make sure that only one checkbox is selected at a time per section by doing this:
                <input onChange={handleChange} type='checkbox' name='topping1' value={formData.topping} checked={formData.topping1} />
                
                */}
                {toppingOptions.map((topping, index) => {
                    return (
                        <label key={index}>
                            <input onChange={handleChange} type='checkbox' name='topping1'  value={formData} checked={formData.topping1} />
                            {topping}
                        </label>
                    )
                })}
             </div>

            <div className='topping'>
                <h3>Topping 2</h3>
                {toppingOptions.map((topping, index) => {
                    return (
                        <label key={index}>
                            <input onChange={handleChange} type='checkbox' name='topping2' checked={formData.topping2} />
                            {topping}
                        </label>
                    )
                })}
            </div>  
            <button >Order</button>
        </StyledForm>
    </div>
  )
}