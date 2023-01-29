import { useEffect, useState } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

const MyComponent = (props) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const { google } = props;

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.textSearch({
      query: 'Flipcart'
    }, (response, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(response);
        setResults(response);
      }
    });
  }, []);

  return (
    <ul>

    </ul>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDAUyECVOodLqV4H-h4b0GgX5RC2qs0pcc'
})(MyComponent);
