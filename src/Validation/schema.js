import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'name must be at least 2 characters'),
    size: yup.string().required('Size is required').oneOf(['small', 'medium', 'large', 'party-size'], 'please choose a size'),
    topping1: yup.boolean('Topping 1 must be one of the options'),
    topping2: yup.boolean('Topping 2 must be one of the options'),
    special: yup.string().max(100, 'Special instructions must be less than 100 characters')
});

export default schema;