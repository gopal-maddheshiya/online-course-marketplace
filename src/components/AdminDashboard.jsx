import { useState } from 'react';
import { generateDemoData } from '../lib/demodata';

// A simple modal component for confirmation
function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-shell open" style={{ zIndex: 100 }}>
      <div className="modal-card">
        <div className="modal-body" style={{ padding: '2rem', color: 'black' }}>
          <p>{message}</p>
          <div className="actions" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn ghost" onClick={onClose}>Cancel</button>
            <button className="btn primary" onClick={onConfirm}>Load Demo Data</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onDataLoad }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLoadDataClick = () => {
    // Check if data already exists in localStorage
    if (localStorage.getItem('gopal_demo_data_loaded')) {
      setModalMessage('This will replace the existing demo data. Continue?');
    } else {
      setModalMessage('This will populate the application with demo data for presentation purposes. Continue?');
    }
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const demoData = generateDemoData();
    onDataLoad(demoData);
    setIsModalOpen(false);
    alert('✅ Demo data loaded successfully.'); // Using simple alert as toast is not available here
  };

  return (
    <section style={{ padding: '20px', backgroundColor: '#1a202c', color: 'white', margin: '20px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #4a5568', paddingBottom: '10px' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Admin Dashboard</h2>
        <button className="btn primary" onClick={handleLoadDataClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
          Load Gopal Demo Data
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Welcome, Admin. Use the button above to populate the application with sample data.</p>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        message={modalMessage}
      />
    </section>
  );
}

export default AdminDashboard;
