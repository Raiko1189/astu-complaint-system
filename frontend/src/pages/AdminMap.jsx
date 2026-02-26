import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import axios from 'axios';
const L = window.L;
import { useAuth } from '../context/AuthContext';
import { Plus, Save, Trash2, MapPin, X, LayoutDashboard } from 'lucide-react';
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

const editIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #2563eb; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            <div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
          </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

// ASTU Coordinates
const center = [8.56, 39.29];

// Component to handle map clicks for adding/editing markers
const MapEvents = ({ onClick }) => {
    useMapEvents({
        click(e) {
            onClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

// Component to handle map centering
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom || map.getZoom());
        }
    }, [center, zoom, map]);
    return null;
};

const AdminMap = () => {
    const { token } = useAuth();
    const [offices, setOffices] = useState([]);
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        description: '',
        latitude: center[0],
        longitude: center[1]
    });

    useEffect(() => {
        fetchOffices();
    }, []);

    const fetchOffices = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/offices');
            setOffices(res.data.data);
        } catch (error) {
            console.error('Error fetching offices:', error);
        }
    };

    const handleMapClick = (lat, lng) => {
        setFormData({ ...formData, latitude: lat, longitude: lng });
    };

    const handleAddNew = () => {
        setSelectedOffice(null);
        setIsEditing(true);
        setFormData({
            name: '',
            department: '',
            description: '',
            latitude: center[0],
            longitude: center[1]
        });
    };

    const handleEdit = (office) => {
        setSelectedOffice(office);
        setIsEditing(true);
        setFormData({
            name: office.name,
            department: office.department,
            description: office.description,
            latitude: office.latitude,
            longitude: office.longitude
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedOffice) {
                await axios.put(`http://localhost:5000/api/offices/${selectedOffice._id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:5000/api/offices', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            setIsEditing(false);
            fetchOffices();
        } catch (error) {
            console.error('Error saving office:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this office?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/offices/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchOffices();
        } catch (error) {
            console.error('Error deleting office:', error);
        }
    };

    return (
        <div className="campus-map-container">
            <div className="map-sidebar">
                <div className="sidebar-header">
                    <LayoutDashboard className="header-icon" />
                    <h2>Map Intelligence</h2>
                    <button className="btn-add-map" onClick={handleAddNew}>
                        <Plus size={16} /> New
                    </button>
                </div>

                <div className="office-list">
                    {offices.map((office) => (
                        <div key={office._id} className="office-item-admin">
                            <div className="admin-office-info" onClick={() => handleEdit(office)}>
                                <h4>{office.name}</h4>
                                <span>{office.department}</span>
                            </div>
                            <button className="btn-delete-map" onClick={() => handleDelete(office._id)}>
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                {isEditing && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="map-form-overlay"
                    >
                        <div className="form-header">
                            <h3>{selectedOffice ? 'Edit Office' : 'New Office'}</h3>
                            <button onClick={() => setIsEditing(false)}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                placeholder="Office Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Department"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div className="coord-grid">
                                <div>
                                    <label>Lat</label>
                                    <input value={formData.latitude.toFixed(6)} readOnly />
                                </div>
                                <div>
                                    <label>Lng</label>
                                    <input value={formData.longitude.toFixed(6)} readOnly />
                                </div>
                            </div>
                            <p className="hint-text">Click map to update location</p>
                            <button type="submit" className="btn-save-map">
                                <Save size={16} /> Save Changes
                            </button>
                        </form>
                    </motion.div>
                )}
            </div>

            <div className="map-main">
                <MapContainer
                    center={center}
                    zoom={16}
                    style={{ height: '100%', width: '100%', background: '#f8fafc' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapEvents onClick={handleMapClick} />

                    {selectedOffice && (
                        <ChangeView
                            center={[selectedOffice.latitude, selectedOffice.longitude]}
                            zoom={18}
                        />
                    )}

                    {offices.map((office) => (
                        <Marker
                            key={office._id}
                            position={[office.latitude, office.longitude]}
                            icon={customIcon}
                            eventHandlers={{
                                click: () => handleEdit(office),
                            }}
                        />
                    ))}

                    {isEditing && (
                        <Marker
                            position={[formData.latitude, formData.longitude]}
                            icon={editIcon}
                        />
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default AdminMap;
