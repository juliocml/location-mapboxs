import React, { PureComponent } from "react";
import Image from "next/image";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";
import { Container, Col, Row } from "reactstrap";
import Link from "next/link";
const mapStyle = {
  width: "100%",
  height: 600,
};

const mapboxApiKey =
  "pk.eyJ1Ijoiam9yZ2VkYWdzYXNjIiwiYSI6ImNrcGhnMDEwbzBzNW0ydnF4eGxpdTN4bGoifQ.h_owhjWx6lSGkwxoaVUkBw";

const params = {
  country: "mx",
};

class MapView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 19.341511737775104,
        longitude: -99.09983885959429,
        zoom: 16,
      },
      address: "Dirección",
      prevLatitude: 19.341511737775104,
      prevLongitude: -99.09983885959429,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.setState((prevState) => ({
        viewport: {
          ...prevState.viewport,
          latitude,
          longitude,
        },
        prevLatitude: latitude,
        prevLongitude: longitude,
      }));
    });
  }

  onSelected = (viewport, item) => {
    console.log("ON SELECTED 1")
    this.setState({
      viewport,
    });
    console.log(item);
    console.log("ON SELECTED 2")
    this.setState({ prevLatitude: item.center[1] });
    this.setState({ prevLongitude: item.center[0] });
    this.setState({ inputValue: item.center[0] });
    this.setState({ address: item.place_name });
  };
  render() {
    const { viewport } = this.state;
    return (
      <Container fluid={true}>
        <input type="checkbox" id="geocoder-checkbox" />
        <header>
          <Row>
            <Col id="holas">
              <h2>Ingresa dirección de envío</h2>
            </Col>
            <br />
            <Link href="/">Inicio</Link>
          </Row>
          <Row className="py-4">
            <Col xs={2} id="holes">

              <label for="geocoder-checkbox">
                <Geocoder
                  style={{ content: "Mexico" }}
                  className="geocoder"
                  mapboxApiAccessToken={mapboxApiKey}
                  onSelected={this.onSelected}
                  viewport={viewport}
                  hideOnSelect={true}
                  value={this.state.address}
                  queryParams={params}
                /></label>
              <div className="geocoder-section" id="geocoder-section">
                <div
                  role="navigation"
                  className="geocoder-content"
                  aria-label="geocoder content"
                >
                  <label for="geocoder-checkbox">
                    <p className="geocoder-address">{this.state.address}</p></label>
                </div>
              </div>
            </Col>
          </Row>
          {/* <Row>
          <Col>
            <ReactMapGL
              mapboxApiAccessToken={mapboxApiKey}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              {...viewport}
              {...mapStyle}
              onViewportChange={(viewport) => this.setState({ viewport })}
            >
              <Marker
                offsetLeft={0}
                offsetTop={-24}
                latitude={this.state.prevLatitude}
                longitude={this.state.prevLongitude}
              >
                <Image
                  alt="Marker Icon"
                  width={48}
                  height={48}
                  className="class"
                  src="/farmazone-marker-icon.png"
                />
              </Marker>
            </ReactMapGL>
          </Col>
        </Row> */}
          {/* <StoreFinder
          location={[
            this.state.viewport.latitude,
            this.state.viewport.longitude,
          ]}
        /> */}</header>
      </Container>
    );
  }
}

export default MapView;
