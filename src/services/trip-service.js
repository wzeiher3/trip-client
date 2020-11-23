import TokenService from './token-service';
import config from '../config';

const TripApiService = {
  getTrips() {
    return fetch(`${config.API_ENDPOINT}/trips`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getStops(trip_id) {
    return fetch(`${config.API_ENDPOINT}/trips/stops/${trip_id}`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postTrip(trip) {
    return fetch(`${config.API_ENDPOINT}/trips`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(trip),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postStop(stop) {
    return fetch(`${config.API_ENDPOINT}/trips/stops`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(stop),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteTrip(trip_id) {
    return fetch(`${config.API_ENDPOINT}/trips/${trip_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  //   getHead() {
  //     return fetch(`${config.API_ENDPOINT}/language/head`, {
  //       headers: {
  //         Authorization: `bearer ${TokenService.getAuthToken()}`,
  //       },
  //     }).then((res) =>
  //       !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  //     );
  //   },
  //   postGuess(guess) {
  //     const guessStringify = JSON.stringify(guess);
  //     return fetch(`${config.API_ENDPOINT}/language/guess`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `bearer ${TokenService.getAuthToken()}`,
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(guess),
  //     }).then((res) =>
  //       !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  //     );
  //   },
  //   getLanguages() {
  //     return fetch(`${config.API_ENDPOINT}/user/listlanguages`, {
  //       headers: {
  //         Authorization: `bearer ${TokenService.getAuthToken()}`,
  //         "content-type": "application/json",
  //       },
  //     }).then((res) =>
  //       !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  //     );
  //   },
};

export default TripApiService;
