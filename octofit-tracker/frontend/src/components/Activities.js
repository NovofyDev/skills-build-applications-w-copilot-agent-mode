import React, { useState, useEffect, useCallback } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000');

  const API_ENDPOINT = `${API_BASE_URL}/api/activities/`;

  const fetchActivities = useCallback(async () => {
    try {
      console.log('Fetching activities from:', API_ENDPOINT);
      const response = await fetch(API_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Activities API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const activitiesData = data.results ? data.results : (Array.isArray(data) ? data : []);
      console.log('Processed activities data:', activitiesData);
      
      setActivities(activitiesData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [API_ENDPOINT]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

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
        Error loading activities: {error}
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header text-center">
        <div className="container">
          <h1 className="page-title">
            <i className="fas fa-running me-3"></i>Activities
          </h1>
          <p className="page-subtitle">Track and monitor your fitness activities</p>
        </div>
      </div>

      {/* Activities Table */}
      <div className="card octofit-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="fas fa-list me-2"></i>Recent Activities
          </h5>
          <button className="btn btn-light btn-sm">
            <i className="fas fa-plus me-1"></i>Add Activity
          </button>
        </div>
        <div className="card-body p-0">
          {activities.length > 0 ? (
            <div className="table-responsive">
              <table className="table octofit-table mb-0">
                <thead>
                  <tr>
                    <th><i className="fas fa-user me-1"></i>User</th>
                    <th><i className="fas fa-tag me-1"></i>Activity</th>
                    <th><i className="fas fa-clock me-1"></i>Duration</th>
                    <th><i className="fas fa-fire me-1"></i>Calories</th>
                    <th><i className="fas fa-calendar me-1"></i>Date</th>
                    <th><i className="fas fa-cog me-1"></i>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id || index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                            <i className="fas fa-user text-white"></i>
                          </div>
                          <span className="fw-medium">{activity.user || activity.user_name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-activity rounded-pill">
                          {activity.activity || activity.activity_type || activity.name || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className="text-primary fw-bold">
                          {activity.duration || 'N/A'} 
                          {activity.duration && <small className="text-muted ms-1">min</small>}
                        </span>
                      </td>
                      <td>
                        <span className="text-success fw-bold">
                          {activity.calories_burned || 'N/A'}
                          {activity.calories_burned && <small className="text-muted ms-1">cal</small>}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">
                          {activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}
                        </small>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1" title="Edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" title="Delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="display-1 text-muted mb-3">
                <i className="fas fa-running"></i>
              </div>
              <h4 className="text-muted">No Activities Yet</h4>
              <p className="text-muted">Start tracking your fitness journey by adding your first activity!</p>
              <button className="btn btn-octofit-primary">
                <i className="fas fa-plus me-2"></i>Add Your First Activity
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Cards */}
      {activities.length > 0 && (
        <div className="row g-4 mt-4">
          <div className="col-md-4">
            <div className="card octofit-card text-center">
              <div className="card-body">
                <div className="display-6 text-primary mb-2">
                  <i className="fas fa-list-ol"></i>
                </div>
                <h5 className="text-primary">{activities.length}</h5>
                <small className="text-muted">Total Activities</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card octofit-card text-center">
              <div className="card-body">
                <div className="display-6 text-success mb-2">
                  <i className="fas fa-clock"></i>
                </div>
                <h5 className="text-success">
                  {activities.reduce((total, activity) => total + (parseInt(activity.duration) || 0), 0)}
                </h5>
                <small className="text-muted">Total Minutes</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card octofit-card text-center">
              <div className="card-body">
                <div className="display-6 text-warning mb-2">
                  <i className="fas fa-fire"></i>
                </div>
                <h5 className="text-warning">
                  {activities.reduce((total, activity) => total + (parseInt(activity.calories_burned) || 0), 0)}
                </h5>
                <small className="text-muted">Calories Burned</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;