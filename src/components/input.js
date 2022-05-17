const Input = ({name , label , error ,...other }) => {
    return (
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                id={name}
                className='form-control'
                {...other}
            />
            { error && <div className="alert alert-danger"> {error} </div> }
        </div>
    );
}

export default Input;