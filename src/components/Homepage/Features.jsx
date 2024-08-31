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
                            {/* Elevator Pitch Section */}
                            <div className="col-12 mb-4">
                                <div className="card feature-card">
                                    <div className="card-body text-center">
                                        <h2 className="font-bold text-xl mb-3">What is This Platform ?</h2>
                                        <p className="text-lg leading-relaxed">
                                            Liza is your all-in-one platform for AI-powered workflow and task management. 
                                            Designed for AI enthusiasts, developers, and content creators,This Platforms makes advanced AI tools accessible and useful for everyone. 
                                            manage AI Models effortlessly, while automating your tasks and projects with cutting-edge AI models.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Feature 4 */}
                            <div className="col-12">
                                <div className="card feature-card">
                                    <div className="card-body text-center">
                                        <p className="text-md leading-relaxed">
                                            Streamline your tasks with a user-friendly and customizable interface.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 5 */}
                            <div className="col-12">
                                <div className="card feature-card">
                                    <div className="card-body text-center">
                                        <p className="text-md leading-relaxed">
                                            Stay ahead of the curve with cutting-edge technology and continuous updates.
                                        </p>
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
