
import React, { useState } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const MyMapComponent = withScriptjs(withGoogleMap((props) => {

  const [latitude, setLatitude] = useState(24.902752)
  const [longitude, setLongitude] = useState(67.1124084)
  const [places, setPlaces] = useState([])

  const setCoordinates = (event) => {
    setLatitude(event.latLng.lat)
    setLongitude(event.latLng.lng)


    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=CB4EVPMCHKDR3GLQWAQYG1GWVCVVFXRX1X2PMZ0IQKXLQCAT&client_secret=NNUXDZDAYQNFBR22PMHD4XKGSRZVC5WIYX141QW1YDDUMN5D
&v=20180323&ll=${latitude},${longitude}`)
      .then(res => res.json())
      .then(res => setPlaces(res.response.groups[0].items)
      )
  }


  return (
    <div>
        <br></br>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 24.902752, lng: 67.1124084 }}
      >
        {props.isMarkerShown && 
        <Marker draggable={true} 
        onDragEnd={(event) => setCoordinates(event)} 
        position={{ lat: latitude, lng: longitude }} />}
      </GoogleMap>
      <br></br>
    
      <h5>Drag marker to select Places</h5>
      <select>
        {places.map((place, index) => {
          return <option key={index} value={place}>{place.venue.name}</option>
        })}
      </select>
    
    

    </div>
  )
}))

export default MyMapComponent