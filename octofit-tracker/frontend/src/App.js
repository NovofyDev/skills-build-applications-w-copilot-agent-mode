import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Enhanced Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="octofit-logo"
              />
              OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link fw-medium px-3" to="/activities">
                    <i className="fas fa-running me-1"></i>Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-medium px-3" to="/leaderboard">
                    <i className="fas fa-trophy me-1"></i>Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-medium px-3" to="/teams">
                    <i className="fas fa-users me-1"></i>Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-medium px-3" to="/users">
                    <i className="fas fa-user me-1"></i>Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-medium px-3" to="/workouts">
                    <i className="fas fa-dumbbell me-1"></i>Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container-fluid px-4 py-3">
          <Routes>
            <Route path="/" element={
              <div className="fade-in">
                {/* Welcome Hero Section */}
                <div className="welcome-section">
                  <div className="container">
                    <h1 className="welcome-title">
                      <i className="fas fa-heartbeat me-3"></i>
                      Welcome to OctoFit Tracker
                    </h1>
                    <p className="welcome-subtitle">
                      Track your fitness journey, compete with your team, and achieve your goals!
                    </p>
                    <div className="row justify-content-center mt-4">
                      <div className="col-auto">
                        <Link to="/activities" className="btn btn-light btn-lg me-3">
                          <i className="fas fa-play me-2"></i>Start Tracking
                        </Link>
                        <Link to="/leaderboard" className="btn btn-outline-light btn-lg">
                          <i className="fas fa-chart-line me-2"></i>View Rankings
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Cards */}
                <div className="row g-4 mt-2">
                  <div className="col-md-3 col-sm-6">
                    <div className="card octofit-card text-center h-100">
                      <div className="card-body">
                        <div className="display-4 text-primary mb-3">
                          <i className="fas fa-running"></i>
                        </div>
                        <h5 className="card-title">Track Activities</h5>
                        <p className="card-text text-muted">Log your workouts and monitor progress</p>
                        <Link to="/activities" className="btn btn-octofit-primary btn-sm">
                          View Activities
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="card octofit-card text-center h-100">
                      <div className="card-body">
                        <div className="display-4 text-warning mb-3">
                          <i className="fas fa-trophy"></i>
                        </div>
                        <h5 className="card-title">Compete</h5>
                        <p className="card-text text-muted">See how you rank against others</p>
                        <Link to="/leaderboard" className="btn btn-octofit-primary btn-sm">
                          View Leaderboard
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="card octofit-card text-center h-100">
                      <div className="card-body">
                        <div className="display-4 text-info mb-3">
                          <i className="fas fa-users"></i>
                        </div>
                        <h5 className="card-title">Team Up</h5>
                        <p className="card-text text-muted">Join teams and work together</p>
                        <Link to="/teams" className="btn btn-octofit-primary btn-sm">
                          View Teams
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="card octofit-card text-center h-100">
                      <div className="card-body">
                        <div className="display-4 text-success mb-3">
                          <i className="fas fa-dumbbell"></i>
                        </div>
                        <h5 className="card-title">Get Workouts</h5>
                        <p className="card-text text-muted">Discover personalized routines</p>
                        <Link to="/workouts" className="btn btn-octofit-primary btn-sm">
                          View Workouts
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-light py-4 mt-5">
          <div className="container text-center">
            <div className="row">
              <div className="col">
                <p className="mb-1">
                  <strong>🏋️‍♂️ OctoFit Tracker</strong>
                </p>
                <small className="text-muted">
                  Built with ❤️ using React & Django | Track. Compete. Achieve.
                </small>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
