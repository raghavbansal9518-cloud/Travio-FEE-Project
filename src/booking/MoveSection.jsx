import React, { useState } from 'react';
import FlightBooking from './FlightBooking';
import TrainBooking from './TrainBooking';
import BusBooking from './BusBooking';
import CabBooking from './CabBooking';
import { useLanguage } from '../context/LanguageContext';

export default function MoveSection({ onSelectBookingItem }) {
  const { t } = useLanguage();
  const [activeTransport, setActiveTransport] = useState('flights'); // 'flights', 'trains', 'buses', 'cabs'

  const transportOptions = [
    {
      id: 'flights',
      title: t('booking.flights', 'FLIGHTS'),
      sub: t('booking.domesticIntl', 'Domestic & International'),
      icon: 'flight',
      animClass: 'anim-airplane-fly',
    },
    {
      id: 'trains',
      title: t('booking.trains', 'TRAINS'),
      sub: t('booking.highSpeedExpress', 'High Speed & Express'),
      icon: 'train',
      animClass: 'anim-train-track',
    },
    {
      id: 'buses',
      title: t('booking.buses', 'BUSES'),
      sub: t('booking.acSleeperElectric', 'AC Sleeper & Electric'),
      icon: 'directions_bus',
      animClass: 'anim-bus-road',
    },
    {
      id: 'cabs',
      title: t('booking.cabs', 'CABS'),
      sub: t('booking.outstationAirport', 'Outstation & Airport'),
      icon: 'local_taxi',
      animClass: 'anim-cab-drive',
    },
  ];

  return (
    <div className="move-section-container">
      {/* 4 Interactive Transport Option Cards */}
      <div className="transport-selector-grid">
        {transportOptions.map((opt) => {
          const isActive = activeTransport === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className={`transport-tab-card ${isActive ? 'active' : ''} ${opt.animClass}`}
              onClick={() => setActiveTransport(opt.id)}
              aria-label={`Select ${opt.title} Transport`}
            >
              <div className="transport-card-bg-glow" />
              
              {/* Dynamic Animated Transport Graphic Container */}
              <div className="transport-animation-stage">
                {opt.id === 'flights' && (
                  <div className="airplane-scene">
                    <div className="airplane-clouds-layer">
                      <span className="cloud-particle cp-1" />
                      <span className="cloud-particle cp-2" />
                    </div>
                    <div className="airplane-icon-vehicle">
                      <span className="material-symbols-rounded">flight</span>
                    </div>
                  </div>
                )}

                {opt.id === 'trains' && (
                  <div className="train-scene">
                    <div className="rail-tracks">
                      <span className="rail-tie" />
                      <span className="rail-tie" />
                      <span className="rail-tie" />
                    </div>
                    <div className="train-icon-vehicle">
                      <span className="material-symbols-rounded">train</span>
                    </div>
                  </div>
                )}

                {opt.id === 'buses' && (
                  <div className="bus-scene">
                    <div className="road-pavement">
                      <span className="road-dashes" />
                    </div>
                    <div className="bus-icon-vehicle">
                      <span className="material-symbols-rounded">directions_bus</span>
                    </div>
                  </div>
                )}

                {opt.id === 'cabs' && (
                  <div className="cab-scene">
                    <div className="cab-motion-trails" />
                    <div className="cab-icon-vehicle">
                      <span className="material-symbols-rounded">local_taxi</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="transport-tab-content">
                <h3 className="transport-tab-title">{opt.title}</h3>
                <p className="transport-tab-sub">{opt.sub}</p>
              </div>

              {/* Active Indicator Underline */}
              {isActive && <div className="transport-active-indicator" />}
            </button>
          );
        })}
      </div>

      {/* Dynamic Sub-Form Container */}
      <div className="transport-form-viewport">
        {activeTransport === 'flights' && (
          <FlightBooking onSelectBookingItem={onSelectBookingItem} />
        )}
        {activeTransport === 'trains' && (
          <TrainBooking onSelectBookingItem={onSelectBookingItem} />
        )}
        {activeTransport === 'buses' && (
          <BusBooking onSelectBookingItem={onSelectBookingItem} />
        )}
        {activeTransport === 'cabs' && (
          <CabBooking onSelectBookingItem={onSelectBookingItem} />
        )}
      </div>
    </div>
  );
}
