import { Map, Marker } from 'mapbox-gl';

class MarkerControl {
  protected _map: Map | undefined;
  protected _container: HTMLDivElement | undefined;
  protected _button: HTMLButtonElement | undefined;

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._button = document.createElement('button');
    this._container.appendChild(this._button);
    this._button.className = 'marker-ctrl';
    this._button.onclick = this.addMarker.bind(this);
    return this._container;
  }

  onRemove() {
    if (this._container)
      this._container.parentNode?.removeChild(this._container);
    this._map = undefined;
  }

  addMarker() {
    if (this._map) {
      console.log('inside');
      const center = this._map?.getCenter();
      const marker = new Marker({ draggable: true })
        .setLngLat(center)
        .addTo(this._map);
    }
  }
}

export default MarkerControl;
