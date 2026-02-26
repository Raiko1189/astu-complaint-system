import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
const L = window.L;
import { Search, MapPin, Building2, Navigation, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/CampusMap.css';

// Custom Marker Icon (SVG)
const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #f59e0b; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            <div style="width: 8px; height: 8px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// ASTU Coordinates
const center = [8.56, 39.29];

// Component to handle map centering
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

const CampusMap = () => {
    const [offices, setOffices] = useState([]);
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOffices();
    }, []);

    const fetchOffices = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/offices');
            setOffices(res.data.data);
        } catch (error) {
            console.error('Error fetching offices:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredOffices = offices.filter(office =>
        office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        office.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOfficeSelect = (office) => {
        setSelectedOffice(office);
    };

    return (
        <div className="campus-map-container">
            <div className="map-sidebar">
                <div className="sidebar-header">
                    <Building2 className="header-icon" />
                    <h2>Campus Directory</h2>
                </div>

                <div className="search-box">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search Office or Dept..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="office-list">
                    <AnimatePresence>
                        {filteredOffices.map((office) => (
                            <motion.div
                                key={office._id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className={`office-item ${selectedOffice?._id === office._id ? 'active' : ''}`}
                                onClick={() => handleOfficeSelect(office)}
                            >
                                <MapPin size={18} className="pin-icon" />
                                <div className="office-info">
                                    <h4>{office.name}</h4>
                                    <span>{office.department}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="map-main">
                <MapContainer
                    center={center}
                    zoom={16}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%', background: '#f8fafc' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {selectedOffice && (
                        <ChangeView
                            center={[selectedOffice.latitude, selectedOffice.longitude]}
                            zoom={18}
                        />
                    )}

                    {filteredOffices.map((office) => (
                        <Marker
                            key={office._id}
                            position={[office.latitude, office.longitude]}
                            icon={customIcon}
                            eventHandlers={{
                                click: () => setSelectedOffice(office),
                            }}
                        >
                            <Popup>
                                <div className="map-info-card">
                                    <h3>{office.name}</h3>
                                    <div className="dept-tag">{office.department}</div>
                                    <p>{office.description}</p>
                                    <div className="card-actions">
                                        <button className="btn-directions">
                                            <Navigation size={14} /> Get Directions
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

const mapStyles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#1e293b" }]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{ "color": "#f8fafc" }]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{ "color": "#e2e8f0" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#f1f5f9" }]
    }
];

export default CampusMap;
