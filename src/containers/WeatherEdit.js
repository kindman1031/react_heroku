import React from 'react';
import Textarea from 'react-textarea-autosize';
import { weatherActions, weatherSelectors } from '../store/weather/index';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

@connect(
  (state, props) => {
    return {
      weatherOne: weatherSelectors.getWeatherOne(state, props.params.weatherId),
    };
  }
)
export class WeatherEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
  };

  static propTypes = {
    params: React.PropTypes.object,
    weatherOne: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.state,
      weatherId: this.props.params.weatherId,
      weatherOne: { country: '', state: '', snow: '', wind: '', seismic1: '', seismic2: '' }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.weatherOne, this.state.weatherOne)) {
      this.setState({ ...this.state, weatherOne: nextProps.weatherOne });
    }
  }

  componentDidMount() {
    if (this.state.weatherId) {
      this.context.store.dispatch(weatherActions.fetchWeatherOne(this.props.params.weatherId));
    }
  }

  handleChange(field, e) {
    const weatherOne = Object.assign({}, this.state.weatherOne, { [field]: e.target.value });
    this.setState(Object.assign({}, this.state, { weatherOne }));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.weatherId) {
      this.context.store.dispatch(weatherActions.updateWeather(this.state.weatherOne));
    } else {
      this.context.store.dispatch(weatherActions.createWeather(this.state.weatherOne));
      this.context.store.dispatch(weatherActions.setPageNumber(localStorage.getItem("pageCount") - 1));
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} noValidate>
        <div className="form-group">
          <label className="label-control">Country</label>
          <input
            type="text"
            className="form-control"
            value={this.state.weatherOne.country}
            onChange={this.handleChange.bind(this, 'country')} />
        </div>

        <div className="form-group">
          <label className="label-control">State</label>
          <input
            type="text"
            className="form-control"
            value={this.state.weatherOne.state}
            onChange={this.handleChange.bind(this, 'state')} />
        </div>

        <div className="form-group">
          <label className="label-control">Wind</label>
          <input
            type="text"
            className="form-control"
            value={this.state.weatherOne.wind}
            onChange={this.handleChange.bind(this, 'wind')} />
        </div>

        <div className="form-group">
          <label className="label-control">Snow</label>
          <input
            type="text"
            className="form-control"
            value={this.state.weatherOne.snow}
            onChange={this.handleChange.bind(this, 'snow')} />
        </div>

        <div className="form-group">
          <label className="label-control">Seismic1</label>
          <input
            type="text"
            className="form-control"
            value={this.state.weatherOne.seismic1}
            onChange={this.handleChange.bind(this, 'seismic1')} />
        </div>

        <div className="form-group">
          <label className="label-control">Seismic2</label>
          <input
            type="text"
            className="form-control"
            value={this.state.weatherOne.seismic2}
            onChange={this.handleChange.bind(this, 'seismic2')} />
        </div>

        <button type="submit" className="btn btn-default">
          {this.state.weatherId ? 'Update' : 'Create'}
        </button>
      </form>
    );
  }
}
