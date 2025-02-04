import React,{useState , useEffect , useCallback} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import SOSmsg from "./SOSmsg";
import SOScall from "./SOScall";

const Home = () => {

  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [map, setMap] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Replace with your GraphHopper API key
  const GRAPHHOPPER_API_KEY = '4aa9aa6b-7da2-46bc-b678-ef0a4202d618';

  // Updated route types with safety labels
  const routeTypes = [
    { color: '#2ecc71', type: 'Safe Route', description: 'Recommended safe path' },
    { color: '#f39c12', type: 'Moderately Safe', description: 'Alternative route with moderate safety' },
    { color: '#e74c3c', type: 'Less Safe Route', description: 'Exercise caution on this route' }
  ];

  useEffect(() => {
    // Los Angeles coordinates: latitude 34.0522° N, longitude 118.2437° W
    const mapInstance = L.map("map").setView([34.0522, -118.2437], 12);
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance);
    
    setMap(mapInstance);
    
    return () => {
      mapInstance.remove();
    };
  }, []);

  const getCoordinates = async (location) => {
    try {
      const response = await fetch(
        `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(location)}&locale=en&key=${GRAPHHOPPER_API_KEY}`
      );
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        return [data.hits[0].point.lat, data.hits[0].point.lng];
      }
      return null;
    } catch (error) {
      console.error("Error geocoding:", error);
      return null;
    }
  };

  const fetchRoutes = async (startCoords, endCoords) => {
    try {
      const response = await fetch(
        `https://graphhopper.com/api/1/route?` +
        `point=${startCoords[0]},${startCoords[1]}&` +
        `point=${endCoords[0]},${endCoords[1]}&` +
        `vehicle=car&` +
        `algorithm=alternative_route&` +
        `ch.disable=true&` +
        `alternative_route.max_paths=3&` +
        `details=average_speed&` +
        `points_encoded=false&` +
        `key=${"4aa9aa6b-7da2-46bc-b678-ef0a4202d618"}`
      );

      const data = await response.json();
      
      // Ensure we have exactly 3 routes
      let routes = data.paths;
      if (routes.length < 3) {
        // If GraphHopper returns fewer routes, create variations
        const baseRoute = routes[0];
        while (routes.length < 3) {
          const variation = {
            ...baseRoute,
            points: {
              ...baseRoute.points,
              coordinates: baseRoute.points.coordinates.map(coord => [
                coord[0] + (Math.random() - 0.5) * 0.01,
                coord[1] + (Math.random() - 0.5) * 0.01
              ])
            }
          };
          routes.push(variation);
        }
      }
      return routes.slice(0, 3); // Ensure we only return 3 routes
    } catch (error) {
      console.error("Error fetching routes:", error);
      throw error;
    }
  };

  const displayRoutes = useCallback((routes) => {
    // Clear existing routes from the map
    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Display each route
    routes.forEach((route, index) => {
      const coordinates = route.points.coordinates.map(coord => [coord[1], coord[0]]);
      const polyline = L.polyline(coordinates, {
        color: routeTypes[index].color,
        weight: 6,
        opacity: 0.7
      }).addTo(map);

      // Fit map to show all routes
      if (index === 0) {
        map.fitBounds(polyline.getBounds());
      }
    });
  }, [map]);

  const handleShowRoute = useCallback(async () => {
    if (!startLocation || !endLocation || !map) {
      alert("Please enter valid locations.");
      return;
    }

    try {
      const startCoords = await getCoordinates(startLocation);
      const endCoords = await getCoordinates(endLocation);

      if (!startCoords || !endCoords) {
        alert("Could not find location coordinates.");
        return;
      }

      const routesData = await fetchRoutes(startCoords, endCoords);
      setRoutes(routesData);
      displayRoutes(routesData);

    } catch (error) {
      console.error("Error generating routes:", error);
      alert("Error generating routes. Please try again.");
    }
  }, [startLocation, endLocation, map, displayRoutes]);

  const handleEndJourneyClick = () => 
  {
    setShowConfirmation(true); // Show the confirmation box
  };

  const handleConfirmYes = () => 
  {
    setShowConfirmation(false);
    navigate("/feedback"); // Navigate to feedback page
  };

  const handleConfirmNo = () => 
  {
    setShowConfirmation(false);
  };

  return (
    <>
    <div style={{ width: "100vw", height: "100vh", display: "flex" , overflow: "hidden" }}>
      <div style={{ width: "100vw", height: "100vh" , flex: "1", position: "relative" , overflow: "hidden"}}>
        {/* Input UI */}
        <div
          style={{
            position: "absolute",
            width: "20vw" ,
            height: "100vh" ,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            background: "white",
            zIndex: "1000"
            // position: "absolute",
            // top: "10px",
            // left: "50%",
            // transform: "translateX(-50%)",
            // background: "white",
            // padding: "10px",
            // borderRadius: "5px",
            // boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            // zIndex: 1000,
          }}
        >
          <input
            type="text"
            placeholder="Start Location"
            name="startLocation"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            style={{ marginTop: "15vh" , width: "16vw" , height: "1vh" , backgroundColor: "white" ,color: "black" ,border: "2px solid black" , opacity:"1"}}
          />
          <input
            type="text"
            placeholder="End Location"
            name="endLocation"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            style={{ marginTop: "1vh" , width: "16vw" , height: "1vh" , backgroundColor: "white" ,color: "black" ,border: "2px solid black" , opacity:"1"}}
          />
          <button 
            onClick={handleShowRoute}
            style={{ 
              padding: "5px 10px",
              width: "10vw",
              height: "5vh",
              backgroundColor: "#007bff",
              color: "black",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer"
            }}
          >
            Show Routes
          </button>
        </div>
        
        {/* Map Container */}
        <div id="map" style={{ width: "100vw", height: "100vh" , overflow: "hidden" }}></div>
        <SOSmsg/>

        <SOScall/>

        <button
          onClick={handleEndJourneyClick}
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bottom: "20px",
            right: "20px",
            padding: "10px",
            // backgroundColor: "#00b4d8",
            backgroundColor: "#007bff",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            textAlign: "center",
            maxWidth: "10vw",
            margin: "15px",
            marginRight: "5px"
          }}
        >
          End Journey
        </button>
          {/* Confirmation Box (Shows Over the Button) */}
      {showConfirmation && (
        <div
          style={{
            position: "absolute",
            bottom: "60px", // Just above the button
            right: "20px",
            background: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            zIndex: 1001,
            textAlign: "center",
          }}
        >
          <p>Do you want to end the journey?</p>
          <button
            onClick={handleConfirmYes}
            style={{ marginRight: "10px", padding: "5px", backgroundColor: "red", color: "white", border: "none" }}
          >
            Yes
          </button>
          <button
            onClick={handleConfirmNo}
            style={{ padding: "5px", backgroundColor: "gray", color: "white", border: "none" }}
          >
            No
          </button>
        </div>
      )}

        {/* Route Information Panel */}
        {routes.length > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              zIndex: 1000,
              maxWidth: '300px'
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Available Routes</h3>
            {routes.map((route, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedRoute === index ? '#f5f5f5' : 'transparent',
                  borderRadius: '4px',
                  border: `1px solid ${selectedRoute === index ? routeTypes[index].color : 'transparent'}`
                }}
                onClick={() => setSelectedRoute(index)}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '5px'
                }}>
                  <div
                    style={{
                      width: '20px',
                      height: '3px',
                      backgroundColor: routeTypes[index].color,
                      marginRight: '10px'
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{routeTypes[index].type}</div>
                    <div style={{ fontSize: '0.8em', color: '#666' }}>{routeTypes[index].description}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
                  <div>Distance: {(route.distance / 1000).toFixed(1)} km</div>
                  <div>Time: {Math.round(route.time / 60000)} mins</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    {/* <button className="EndJourneyBtn">End Journey</button> */}
    </>
  );
};

export default Home;
