import React, {Component} from 'react';
import CreateCar from './CreateCar';

export default class ContentManager extends Component {

  constructor(props) {
      super(props);

      this.state = { content: this.props.content };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({ content: nextProps.content });
  }

  changePage() {
      this.setState({ content: 'createCar'});
  }

  renderSwitch() {
      switch(this.state.content) {
          case 'carsList':
              return (
                  this.props.filteredCars.map((car, index) => {
                      return (
                          <div key={`item-${index}`} className="car-item" onClick={this.changePage.bind(this)}>
                              <div key={`left-${index}`} className="car-detail-left">
                                  <h2 key={`title-${index}`}>{car.title}</h2>
                                  <span key={`details-car-${index}`}>
                                    {car.model} • {car.brand} • {car.km}
                                  </span>
                              </div>
                              <div key={`right-${index}`} className="car-detail-right">
                                <h2 key={`price-${index}`}>R$ {car.price}</h2>
                                <span key={`year-${index}`}>{car.year}</span>
                              </div>
                          </div>
                      )
                  })
              )
              break;
          case 'createCar':
              return (
                  <CreateCar brands={this.props.brands} content={this.props.content}/>
              )
              break;
          default:
              return (
                  <h1>Pesquisa de veículos do <span className="company">TradersClub</span></h1>
              )
      }
  }

  render() {
      return (
          <div>
              {this.renderSwitch()}
          </div>
      )
  }
}