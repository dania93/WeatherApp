import React from 'react';

const Form = props => (
    <form onSubmit={props.weatherMethod}>
      <input type="text" className="input" name="city" placeholder="City" />
      <button className="btn aqua-gradient btn-rounded waves-effect waves-dark">Get The Weather</button>
    </form>
)

export default Form;
