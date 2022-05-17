import { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';
class Form extends Component {
    state = {
        data: {},
        errors: {}
    }
    validateProperty = ({ name, value }) => {
        const singleInput = { [name]: value };
        const singleSchema = { [name]: this.schema[name] };
        const result = Joi.validate(singleInput, singleSchema);
        return (result.error) ? result.error.details[0].message : null;
    }
    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        if (!result.error) return null;
        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;

        return errors;
    }
    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit();
    }
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    }
    renderButton(label) {
        return <button disabled={this.validate()} className='btn btn-primary'> {label} </button>
    }
    renderInput(name, label , type ="text") {
        const { data, errors } = this.state;
        return (
            <Input
                type ={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }
    renderSelect(name , label , options){
        const { data, errors } = this.state;
        return (
            <Select 
                name={name}
                value={data[name]}
                label={label}
                options = {options}
                onChange = {this.handleChange}
                error = {errors[name]}
            />
        );
    }
}

export default Form;