import React, {Component} from 'react';
import CurrencyInput from 'react-currency-input';

export default class CreateCar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: props.brands,
            car: [], content: props.content,
            carSelected: props.carSelected
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ brands: nextProps.brands });
    }

    componentWillUnmount() {
        this.setState({ carSelected: null });
    }

    saveCar(event) {
        event.preventDefault();

    }

    handleSubmit = (event) => {
        event.preventDefault()
        let car = Object.assign({}, this.state.car);

        if(car && Object.keys(car).length === 7) {
            fetch('https://private-anon-78e9bed112-tradersclubapi.apiary-proxy.com/api/cars', {
                method: 'POST',
                body: JSON.stringify({car})
            })
        }
    }

    handleChange(e) {
      let car = this.state.car;
      car[e.target.name] = e.target.value;
      this.setState({ car });
    }

    cancel() {
      this.setState({ content: 'home' });
    }

    render() {
      return (
          <div className="form-car">
              <form onSubmit={this.handleSubmit.bind(this)}>
                  <input
                        required
                        defaultValue={this.state.carSelected ? this.state.carSelected.title : ''}
                        name="title"
                        className="name"
                        placeholder="Nome"
                        onChange={this.handleChange.bind(this)}
                  />
                  <input
                        required
                        defaultValue={this.state.carSelected ? this.state.carSelected.model : ''}
                        name="model"
                        className="model"
                        placeholder="Modelo"
                        onChange={this.handleChange.bind(this)}
                  />
                  <input
                        required name="year"
                        defaultValue={this.state.carSelected ? this.state.carSelected.year : ''}
                        className="year"
                        placeholder="Ano"
                        onChange={this.handleChange.bind(this)}
                  />
                  <select
                        name="brand"
                        className="brands"
                        onChange={this.handleChange.bind(this)}
                  >
                      <option selected="selected">
                            {this.state.carSelected ? this.state.carSelected.brand : 'Selecione a marca do carro'}
                      </option>
                      {this.props.brands.map(brand => {
                        return <option value={brand.name} key={brand.id}>{brand.name}</option>
                      })}
                  </select>
                  <input
                        required
                        defaultValue={this.state.carSelected ? this.state.carSelected.color : ''}
                        name="color"
                        className="model"
                        placeholder="Cor"
                        onChange={this.handleChange.bind(this)}
                  />

                  <CurrencyInput
                        className="year"
                        value={this.state.carSelected ? this.state.carSelected.price : ''}
                        decimalSeparator=","
                        thousandSeparator="."
                        onChangeEvent={this.handleChange.bind(this)}
                  />

                  <input
                        required
                        defaultValue={this.state.carSelected ? this.state.carSelected.km : ''}
                        name="km"
                        className="model"
                        placeholder="km"
                        onChange={this.handleChange.bind(this)}
                  />

                  <div className="buttons">
                    <div className="options">
                        <a type="reset" className="remove">Remover</a>
                        <a className="cancel" onClick={this.cancel.bind(this)}>Cancelar</a>
                    </div>
                    <button type="submit" className="save" id="save">Salvar</button>
                  </div>
              </form>
          </div>
      )
    }
}