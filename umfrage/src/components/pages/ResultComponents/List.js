import PropTypes from 'prop-types';
import React from 'react';
import '../../../App.css'

function List(props) {


  return (
    <li className="list" style={{color: props.color}}> {props.name} (abgegebene Stimmen {props.num})</li>
  );
}

List.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
export default List;