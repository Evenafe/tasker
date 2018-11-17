import React from 'react';

const Form = props => {
    console.log(props);
    return(
        <form onSubmit={props.onSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input name="title" type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label htmlFor="body">Body:</label>
                <textarea name="body" type="text" className="form-control"/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
};

export default Form;