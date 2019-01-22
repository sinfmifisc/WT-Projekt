import PropTypes from 'prop-types';
import React from 'react';
import '../../../App.css'

function List(props) {


  return (
    <li className="list" style={{color: props.color}}>Stimmen: {props.num} x {props.name} </li>
  );
}

List.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
export default List;