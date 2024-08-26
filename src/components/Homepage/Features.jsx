import React from 'react';
import './Features.css'; 

const Features = () => {
    return (
        <div className="features-page">
            <header className="features-navbar navbar-expand-sm navbar-light d-print-none">
                <div className="container-xl">
                    <div className="navbar-nav flex-row order-md-last">
                        <div className="nav-item">
                            <a href="#" className="nav-link d-flex lh-1 text-reset p-0">
                                <span className="avatar avatar-sm" style={{ backgroundImage: 'url(...)' }}></span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <div className="features-wrapper">
                <div className="features-body">
                    <div className="container-xl">
                        <div className="row row-deck row-cards">
                            <div className="col-md-4">
                                <div className="card feature-card">
                                    <div className="card-body text-center">
                                        <div className="icon-container">
                                            {/* Add an icon here */}
                                        </div>
                                    
                                        <p>Empower your workflow with seamless integration and automation.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card feature-card">
                                    <div className="card-body text-center">
                                        <div className="icon-container">
                                            {/* Add an icon here */}
                                        </div>
                                        <p>Unlock new levels of efficiency with real-time analytics and insights.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card feature-card">
                                    <div className="card-body text-center">
                                        <div className="icon-container">
                                            {/* Add an icon here */}
                                        </div>
                                    
                                        <p>Enhance collaboration with intuitive and interactive tools.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card feature-card">
                                    <div className="card-body text-center">
                                        
                                        <p>Streamline your tasks with a user-friendly and customizable interface.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card feature-card">
                                    <div className="card-body text-center">
                                        
                                        <p>Stay ahead of the curve with cutting-edge technology and updates.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
