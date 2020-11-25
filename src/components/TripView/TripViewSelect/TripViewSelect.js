import React from 'react';
import './TripViewSelect.css';

export default class TripViewSelect extends React.Component {
  render() {
    return (
      <>
        <select
          onClick={(e) => this.props.handleSelect(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') this.props.handleSelect(e);
          }}
          name="category"
          multiple
        >
          <option>Bakery</option>
          <option>Bank</option>
          <option>Bar</option>
          <option>Book Store</option>
          <option>Bakery</option>
          <option>Cafe</option>
          <option>Clothing Store</option>
          <option>Convenience Store</option>
          <option>Department Store</option>
          <option>Drugstore</option>
          <option>Electronics Store</option>
          <option>Hospital</option>
          <option>Jewelry Store</option>
          <option>Movie Theater</option>
          <option>Night Club</option>
          <option>Park</option>
          <option>Pharmacy</option>
          <option>Primary School</option>
          <option>Restaurant</option>
          <option>Secondary School</option>
          <option>Shoe Store</option>
          <option>Shopping Mall</option>
          <option>Stadium</option>
          <option>Supermarket</option>
          <option>Tourist Attraction</option>
          <option>University</option>
        </select>
        <br />
        <button
          type="button"
          className="tripViewButton"
          onClick={() => this.props.clearSelections()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') this.props.clearSelections();
          }}
        >
          Clear Selections
        </button>
        <br />
        <div className="select-box">
          {this.props.selections.map((select, index) => (
            <span key={index}>
              <span>{select}</span>
            </span>
          ))}
        </div>
        <br />
      </>
    );
  }
}
