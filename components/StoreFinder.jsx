import axios from "axios";
import React, { Component } from "react";

class StoreFinder extends Component {
  state = {
    url: "https://apiv4.ordering.co/v400/en/farmazone/business/",
    params: {
      params: "id,name,slug,open,address,phone,cellphone,location",
      location: this.props.location.toString(),
    },
    storeDetails: [],
  };

  componentDidMount() {
    axios
      .get(this.state.url, this.state.params)
      .then((res) => this.setState({ storeDetails: res.data.result }));
  }
  render() {
    return (
      <div>
        <h1>
          {this.state.storeDetails.length
            ? "Tienda para entrega encontrada"
            : "Aún no llegamos a esta ubicación"}
        </h1>
        <pre>{JSON.stringify(this.state.storeDetails, 2, null)}</pre>
      </div>
    );
  }
}

export default StoreFinder;
