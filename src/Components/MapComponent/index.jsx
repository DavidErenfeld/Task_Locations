import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { Icon, Style } from "ol/style";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import "./style.css";

const MapComponent = ({ stores }) => {
  const mapRef = useRef();
  const mapInstance = useRef();

  useEffect(() => {
    try {
      const vectorSource = new VectorSource({
        features: stores.map(
          (store) =>
            new Feature({
              geometry: new Point(
                fromLonLat([store.longitude, store.latitude])
              ),
              name: store.name,
            })
        ),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            src: "https://openlayers.org/en/v6.14.1/examples/data/icon.png",
            scale: 0.5,
          }),
        }),
      });

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              maxZoom: 19,
            }),
          }),
          vectorLayer,
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
        controls: defaultControls({
          zoom: false, // Disable default zoom controls
          attribution: false, // Disable default attribution control if needed
        }),
      });

      mapInstance.current = map;

      return () => map.setTarget(null);
    } catch (error) {
      console.error("Error initializing the map:", error);
    }
  }, [stores]);

  const zoomIn = () => {
    const view = mapInstance.current.getView();
    const zoom = view.getZoom();
    view.setZoom(zoom + 1);
  };

  const zoomOut = () => {
    const view = mapInstance.current.getView();
    const zoom = view.getZoom();
    view.setZoom(zoom - 1);
  };

  return (
    <>
      <div ref={mapRef} className="map"></div>
      <div className="zoom-buttons">
        <button onClick={zoomIn} className="zoom-button zoom-in">
          +
        </button>
        <button onClick={zoomOut} className="zoom-button zoom-out">
          -
        </button>
      </div>
    </>
  );
};

export default MapComponent;
