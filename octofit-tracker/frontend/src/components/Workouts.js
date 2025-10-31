import React, { useState, useEffect, useCallback } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  const API_ENDPOINT = `${API_BASE_URL}/api/workouts/`;

  const fetchWorkouts = useCallback(async () => {
    try {
      console.log('Fetching workouts from:', API_ENDPOINT);
      const response = await fetch(API_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Workouts API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const workoutsData = data.results ? data.results : (Array.isArray(data) ? data : []);
      console.log('Processed workouts data:', workoutsData);
      
      setWorkouts(workoutsData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [API_ENDPOINT]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading workouts: {error}
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header text-center">
        <div className="container">
          <h1 className="page-title">
            <i className="fas fa-dumbbell me-3"></i>Workouts
          </h1>
          <p className="page-subtitle">Discover your next fitness challenge</p>
        </div>
      </div>

      {workouts.length > 0 ? (
        <>
          {/* Filter and Actions Bar */}
          <div className="card octofit-card mb-4">
            <div className="card-body py-3">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="d-flex gap-2">
                    <select className="form-select form-select-sm" style={{width: 'auto'}}>
                      <option value="">All Types</option>
                      <option value="cardio">Cardio</option>
                      <option value="strength">Strength</option>
                      <option value="flexibility">Flexibility</option>
                    </select>
                    <select className="form-select form-select-sm" style={{width: 'auto'}}>
                      <option value="">All Difficulties</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 text-md-end mt-2 mt-md-0">
                  <div className="d-flex gap-2 justify-content-md-end">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="fas fa-search me-1"></i>Search
                    </button>
                    <button className="btn btn-octofit-primary btn-sm">
                      <i className="fas fa-plus me-1"></i>Create Workout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workout Statistics */}
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card octofit-card text-center">
                <div className="card-body">
                  <div className="display-6 text-primary mb-2">
                    <i className="fas fa-list"></i>
                  </div>
                  <h4 className="text-primary">{workouts.length}</h4>
                  <small className="text-muted">Total Workouts</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card octofit-card text-center">
                <div className="card-body">
                  <div className="display-6 text-success mb-2">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h4 className="text-success">
                    {Math.round(workouts.reduce((total, workout) => total + (workout.duration || 0), 0) / workouts.length) || 0}
                  </h4>
                  <small className="text-muted">Avg Duration (min)</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card octofit-card text-center">
                <div className="card-body">
                  <div className="display-6 text-warning mb-2">
                    <i className="fas fa-fire"></i>
                  </div>
                  <h4 className="text-warning">
                    {Math.round(workouts.reduce((total, workout) => total + (workout.calories_burned || 0), 0) / workouts.length) || 0}
                  </h4>
                  <small className="text-muted">Avg Calories</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card octofit-card text-center">
                <div className="card-body">
                  <div className="display-6 text-info mb-2">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h4 className="text-info">
                    {new Set(workouts.map(w => w.type)).size}
                  </h4>
                  <small className="text-muted">Workout Types</small>
                </div>
              </div>
            </div>
          </div>

          {/* Workouts Grid */}
          <div className="row g-4">
            {workouts.map((workout) => (
              <div key={workout.id} className="col-md-6 col-lg-4">
                <div className="card octofit-card h-100 workout-card">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title mb-0">{workout.name}</h5>
                      <span className={`badge rounded-pill ${
                        workout.difficulty === 'beginner' ? 'bg-success' :
                        workout.difficulty === 'intermediate' ? 'bg-warning' :
                        workout.difficulty === 'advanced' ? 'bg-danger' : 'bg-secondary'
                      }`}>
                        {(workout.difficulty || 'unknown').charAt(0).toUpperCase() + (workout.difficulty || 'unknown').slice(1)}
                      </span>
                    </div>

                    <div className="mb-3">
                      <span className={`badge badge-workout-type me-2 ${
                        workout.type === 'cardio' ? 'bg-primary' :
                        workout.type === 'strength' ? 'bg-success' :
                        workout.type === 'flexibility' ? 'bg-info' : 'bg-secondary'
                      }`}>
                        <i className={`fas ${
                          workout.type === 'cardio' ? 'fa-heartbeat' :
                          workout.type === 'strength' ? 'fa-dumbbell' :
                          workout.type === 'flexibility' ? 'fa-leaf' : 'fa-circle'
                        } me-1`}></i>
                        {(workout.type || 'General').charAt(0).toUpperCase() + (workout.type || 'General').slice(1)}
                      </span>
                    </div>

                    {workout.description && (
                      <p className="card-text text-muted flex-grow-1">
                        {workout.description}
                      </p>
                    )}

                    <div className="workout-stats mb-3">
                      <div className="row text-center">
                        <div className="col-4">
                          <div className="stat-item">
                            <i className="fas fa-clock text-primary"></i>
                            <div className="fw-bold">{workout.duration || 0}</div>
                            <small className="text-muted">minutes</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="stat-item">
                            <i className="fas fa-fire text-warning"></i>
                            <div className="fw-bold">{workout.calories_burned || 0}</div>
                            <small className="text-muted">calories</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="stat-item">
                            <i className="fas fa-star text-info"></i>
                            <div className="fw-bold">4.5</div>
                            <small className="text-muted">rating</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="d-grid gap-2">
                        <button className="btn btn-octofit-primary">
                          <i className="fas fa-play me-2"></i>Start Workout
                        </button>
                        <div className="btn-group" role="group">
                          <button className="btn btn-outline-secondary btn-sm">
                            <i className="fas fa-heart"></i>
                          </button>
                          <button className="btn btn-outline-secondary btn-sm">
                            <i className="fas fa-share"></i>
                          </button>
                          <button className="btn btn-outline-secondary btn-sm">
                            <i className="fas fa-bookmark"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Workout Categories */}
          <div className="card octofit-card mt-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-th-large me-2"></i>Browse by Category
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                {[
                  { name: 'Cardio', icon: 'fa-heartbeat', color: 'primary', count: workouts.filter(w => w.type === 'cardio').length },
                  { name: 'Strength', icon: 'fa-dumbbell', color: 'success', count: workouts.filter(w => w.type === 'strength').length },
                  { name: 'Flexibility', icon: 'fa-leaf', color: 'info', count: workouts.filter(w => w.type === 'flexibility').length },
                  { name: 'HIIT', icon: 'fa-bolt', color: 'warning', count: workouts.filter(w => w.type === 'hiit').length }
                ].map((category) => (
                  <div key={category.name} className="col-md-3 col-sm-6 mb-3">
                    <div className="category-item text-center p-3 rounded border">
                      <div className={`display-6 text-${category.color} mb-2`}>
                        <i className={`fas ${category.icon}`}></i>
                      </div>
                      <h6 className="mb-1">{category.name}</h6>
                      <small className="text-muted">{category.count} workouts</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <div className="display-1 text-muted mb-3">
            <i className="fas fa-dumbbell"></i>
          </div>
          <h4 className="text-muted">No Workouts Available</h4>
          <p className="text-muted">Create your first workout to get started with your fitness journey!</p>
          <button className="btn btn-octofit-primary btn-lg">
            <i className="fas fa-plus me-2"></i>Create First Workout
          </button>
        </div>
      )}
    </div>
  );
};

export default Workouts;