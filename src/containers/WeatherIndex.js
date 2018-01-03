import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { WeatherList } from '../components/weather/WeatherList';
import { SearchInput } from '../components/shared/SearchInput';
import { weatherActions, weatherSelectors } from '../store/weather/index';

@connect(
  (state) => {
    return {
      params: weatherSelectors.getParams(state),
      weather: weatherSelectors.getWeather(state),
      pageNumber: weatherSelectors.getPageNumber(state)
    };
  }
)
export class WeatherIndex extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      pageNumber: 0
    }

    this.deleteWeather = this.deleteWeather.bind(this);
    this.handleSearch = this.handleSearch.bind(this, 'country_like');
  }

  componentDidMount() {
    this.fetchWeather({});
  }

  fetchWeather(params) {
    this.context.store.dispatch(weatherActions.fetchWeather(params));
  }

  deleteWeather(weather) {
    this.context.store.dispatch(weatherActions.deleteWeather(weather));
  }

  handleSearch(field, value) {
    this.fetchWeather({ q: value })
    this.context.store.dispatch(weatherActions.setPageNumber(0));
  }

  changeNumber = (event) => {
    this.context.store.dispatch(weatherActions.setPageNumber(event.target.value));
  };

  render() {
    const {
      params,
      weather,
    } = this.props;
    const pageCount = Math.ceil(weather.length / 10);
    localStorage.setItem("pageCount", pageCount);
    console.log("www", localStorage.getItem("pageCount"))

    var arr = [];
    for (var i = 0; i < pageCount; i++) {
      arr.push(<option key={i} value={i}>{i}</option>);
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <SearchInput
              value={params.q}
              onSearch={this.handleSearch}
              placeholder="Country search ..."
            />
          </div>
          <div className="col-md-6 text-right">
            <Link to="/weather/new" className="btn btn-primary">New</Link>
          </div>
        </div>
        {weather.length > 0 &&
          <WeatherList weather={weather} pageNumber={this.props.pageNumber} onDelete={this.deleteWeather} />}

        <div style={{ fontSize: 17 }}>
          Page Number
          <select onChange={this.changeNumber} value={this.props.pageNumber} style={{ width: 50, marginLeft: 10 }}>
            {arr}
          </select>
        </div>

      </div>
    );
  }
}
