import React, {Component} from 'react';

export default class CreateCar extends Component {

    constructor(props) {
        super(props);
        this.state = { brands: props.brands, car: [], content: props.content };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ brands: nextProps.brands });
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
                  <input required name="title" onChange={this.handleChange.bind(this)} className="name" placeholder="Nome" />
                  <input required name="model" onChange={this.handleChange.bind(this)} className="model" placeholder="Modelo" />
                  <input required name="year" onChange={this.handleChange.bind(this)} className="year" placeholder="Ano" />
                  <select name="brand" onChange={this.handleChange.bind(this)} className="brands">
                      <option selected="selected">Selecione a marca do carro</option>
                      {this.props.brands.map(brand => {
                        return <option value={brand.name} key={brand.id}>{brand.name}</option>
                      })}
                  </select>
                  <input required name="color" onChange={this.handleChange.bind(this)} className="model" placeholder="Cor" />
                  <input required name="price" onChange={this.handleChange.bind(this)} className="year" placeholder="Preço" />
                  <input required name="km" onChange={this.handleChange.bind(this)} className="model" placeholder="km" />

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