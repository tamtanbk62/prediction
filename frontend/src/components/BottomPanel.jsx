import { useState, useEffect } from 'react';
import '../css/BottomPanel.css';

export default function BottomPanel({ snapshot, density, trigger, name }) {
    const [open, setOpen] = useState(true);
    const [snapshots, setSnapshots] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        if (!snapshot || !trigger) return;
      
        const isDuplicate = snapshots.some(s => s.image_url === snapshot);
        if (isDuplicate) 
            {
                setOpen(true);
                return;
            }
      
        if (snapshots.length < 3) {
          setSnapshots(prev => [...prev, { image_url: snapshot, density, name}]);
          setOpen(true);
        }
      }, [trigger]);

    const handleRemoveSelected = () => {
        if (selectedIndex === null) return;
        const updated = [...snapshots];
        updated.splice(selectedIndex, 1);
        setSnapshots(updated);
        setSelectedIndex(null);
    };

    if (snapshots.length === 0) return null;

    return (
        <div className={`bottom-panel ${open ? 'open' : 'closed'}`}>
            <div className="panel-header">
                <span className="panel-title">Danh sách camera theo dõi</span>

                <div className="panel-buttons">
                    {open && (
                        <button
                            onClick={handleRemoveSelected}
                            className="delete-panel"
                            disabled={selectedIndex === null}
                        >
                            {/*🗑️*/}Xoá
                        </button>
                    )}
                    <button onClick={() => setOpen(!open)} className="toggle-panel">
                        {open ? '▼' : '▲'}
                    </button>
                </div>
            </div>

            {open && (
                <div className="panel-content-multi">
                    {snapshots.map((snap, index) => (
                        <div
                            key={index}
                            className={`snapshot-item ${selectedIndex === index ? 'selected' : ''}`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <p className="location-text">{snap.name}</p>
                            <img src={snap.image_url} width="400" alt={`snapshot-${index}`} />
                            <p className="panel-density"><strong>Mật độ:</strong> {snap.density}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}