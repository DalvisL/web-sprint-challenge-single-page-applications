import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters long'),
    size: yup.string().required('Size is required').oneOf(['small', 'medium', 'large', 'party-size'], 'please choose a size'),
    topping1: yup.string().oneOf(['Pepperoni', 'Sausage', 'Bacon', 'Pineapple'], 'Topping 1 must be one of the options'),
});