import React, {Component} from 'react';
import ContentManager from './ContentManager';

import '../../assets/styles/Shared.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carList: null,
            brands: null,
            filteredCars: null,
            content: 'default'
        };
    }

    checkStatusAPI() {
        fetch('https://tchml.tradersclub.com.br:12000/api/')
            .then(response => response.json());
    }

    componentDidMount() {
        fetch('http://private-anon-78e9bed112-tradersclubapi.apiary-mock.com/api/cars')
            .then(response => response.json())
            .then(cars => this.setState({ carList : cars.cars }));

        fetch('http://private-anon-78e9bed112-tradersclubapi.apiary-mock.com/api/brands')
            .then(response => response.json())
            .then(brands => this.setState({ brands: brands.brands}));
    }

    searchCar(event) {
        if (event && event.target.value) {
            let updatedList = this.state.carList;
            updatedList = updatedList.filter(function(car){
                return car.title.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });
            this.setState({filteredCars: updatedList, content: 'carsList'});
        } else {
            this.setState({filteredCars: null, content: 'default'});
        }
    }

    create() {
        this.setState({content: 'createCar'});
    }

    render() {
        return (
            <div>
                <div className="side-bar">
                    <h1></h1>
                </div>
                <div className="main">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Pesquise por um veículo"
                            onChange={this.searchCar.bind(this)}
                        />
                        <button onClick={this.create.bind(this)}>Cadastrar</button>
                    </div>
                    <div className="content">
                        <ContentManager {...this.state}/>
                    </div>
                </div>
            </div>
        );
    }
}