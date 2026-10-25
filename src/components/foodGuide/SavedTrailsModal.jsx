
export default function SavedTrailsModal({
  isOpen,
  onClose,
  savedTrails = [],
  onOpenTrail,
  onDeleteTrail,
  onOpenInMap
}) {
  if (!isOpen) return null;

  return (
    <div className="fg-modal-overlay" onClick={onClose}>
      <div 
        className="fg-saved-drawer-card" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog"
      >
        <button 
          type="button" 
          className="fg-modal-close" 
          onClick={onClose}
          aria-label="Close saved trails"
        >
          ✕
        </button>

        <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--fg-text-pri)', margin: '0 0 6px' }}>
          Saved Food Trails
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--fg-text-muted)', margin: '0 0 20px' }}>
          Reopen custom itineraries or launch them directly on Travio's interactive map.
        </p>

        {savedTrails.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 12px', border: '1px dashed var(--fg-border)', borderRadius: '16px' }}>
            <i className="fa-solid fa-bookmark" style={{ fontSize: '32px', color: 'var(--fg-purple)', marginBottom: '10px' }}></i>
            <p style={{ color: 'var(--fg-text-sec)', margin: 0, fontSize: '14px' }}>
              No saved food journeys yet. Create a trail to save it!
            </p>
          </div>
        ) : (
          <div>
            {savedTrails.map((trail) => (
              <div key={trail.id} className="fg-saved-trail-item">
                <div className="fg-saved-trail-meta">
                  <h4>{trail.name}</h4>
                  <p>
                    {trail.stops ? trail.stops.length : 0} Stops • Est. ₹{trail.summaryBudget || '1,200'} • Saved on {trail.date || 'Recent'}
                  </p>
                </div>

                <div className="fg-saved-trail-actions">
                  <button
                    type="button"
                    className="fg-btn-see-map"
                    onClick={() => {
                      onOpenInMap(trail.stops, { name: trail.destinationName, id: trail.destinationId });
                      onClose();
                    }}
                    title="View trail on map"
                  >
                    <i className="fa-solid fa-map-location-dot"></i>
                    <span>Map</span>
                  </button>

                  <button
                    type="button"
                    className="fg-stop-btn-delete"
                    onClick={() => onDeleteTrail(trail.id)}
                    title="Delete saved trail"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
