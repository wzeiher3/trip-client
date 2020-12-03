import React, { Component } from 'react';
import TripViewEditSelect from '../TripViewEditSelect.js';
import TripContext from '../../../contexts/TripContext';
import images from '../../../assets/images/images';

class EditStopForm extends Component {
  static contextType = TripContext;

  render() {


    
    return (
      <div className="trip-stop-wrapper" key={stop.id}>
        <div className="trip-stop edit-stop" key={index}>
          {this.context.loading && (
            <div className="bufffer-img-wrapper ">
              <img
                className="buffer-img"
                src={images.img_loading}
                alt="a plane flying over hearts loading gif"
              />
              <div className="fade-out-screen"></div>
            </div>
          )}
          <form
            action="#"
            id="EditStopForm"
            onSubmit={(e) => this.handleSubmitEditStop(e, id)}
          >
            <div className="trip-header">
              <div>
                <input
                  defaultValue={stop.stop_name}
                  name="stop_name"
                  id="edit_stop_name"
                  aria-label="stop_name"
                  maxLength={40}
                  required
                />{' '}
              </div>
              <input
                defaultValue={stop.city}
                name="city"
                aria-label="city"
                maxLength={40}
                required
              />
              <br />
              <input
                defaultValue={stop.state}
                name="state"
                aria-label="state"
                maxLength={40}
                required
              />
            </div>
            {this.state.error && (
              <>
                <br />
                {this.state.error}
                <br />
                <br />
              </>
            )}
            <TripViewEditSelect
              handleSelect={this.handleSelect}
              clearSelections={this.clearSelections}
              selections={this.state.selections}
            />
            <input
              defaultValue={stop.description}
              name="description"
              aria-label="description"
              maxLength={400}
              required
            />
            {this.isTripCreator() && (
              <div className="tripView-button-wrapper">
                <button
                  className="tripViewButton"
                  onClick={() => this.toggleEditStop(0)}
                >
                  Cancel
                </button>
                <button className="tripViewButton" type="submit">
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
        <br />
        {index === this.state.stops.length - 1 ? null : index % 2 !== 0 ? (
          <img
            className="road-img"
            src={images.road_a}
            alt="road illustration"
          ></img>
        ) : (
          <img
            className="road-img"
            src={images.road_b}
            alt="road illustration"
          ></img>
        )}
      </div>
    );
  }
}

export default EditStopForm;
