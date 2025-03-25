import react, { useState } from 'react';
import './css/Address.css'
import CardRegistration from './CardRegistration';
import AddressRegistration from './AddressRegistration';
import Sidebar from './components/Sidebar';
function Address() {
    const [activeTab, setActiveTab] = useState('card');

    return (
        <div className="mypageSide">
            <Sidebar />
            <div className="card-container" style={{margin:'20px 20px'}}>
                <div className='tab-buttons'>
                    <button className={activeTab === 'card' ? 'active' : ''}
                        onClick={() => setActiveTab('card')}
                    >카드등록</button>
                    <button className={activeTab === 'address' ? 'active' : ''}
                        onClick={() => setActiveTab('address')}
                    >주소등록</button>

                </div>
                <div className='tab-content'>
                    {activeTab === 'card' ? <CardRegistration /> : <AddressRegistration />}
                </div>
            </div>
        </div>
    );
}

export default Address;