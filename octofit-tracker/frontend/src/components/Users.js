import React, { useState, useEffect, useCallback } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  const API_ENDPOINT = `${API_BASE_URL}/api/users/`;

  const fetchUsers = useCallback(async () => {
    try {
      console.log('Fetching users from:', API_ENDPOINT);
      const response = await fetch(API_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Users API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const usersData = data.results ? data.results : (Array.isArray(data) ? data : []);
      console.log('Processed users data:', usersData);
      
      setUsers(usersData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [API_ENDPOINT]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
        Error loading users: {error}
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header text-center">
        <div className="container">
          <h1 className="page-title">
            <i className="fas fa-user me-3"></i>Users
          </h1>
          <p className="page-subtitle">Community of fitness enthusiasts</p>
        </div>
      </div>

      {users.length > 0 ? (
        <>
          {/* Users Table */}
          <div className="card octofit-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="fas fa-address-book me-2"></i>All Users
              </h5>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm">
                  <i className="fas fa-search me-1"></i>Search
                </button>
                <button className="btn btn-octofit-primary btn-sm">
                  <i className="fas fa-user-plus me-1"></i>Invite User
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table octofit-table mb-0">
                  <thead>
                    <tr>
                      <th><i className="fas fa-user me-1"></i>User</th>
                      <th><i className="fas fa-envelope me-1"></i>Email</th>
                      <th><i className="fas fa-users me-1"></i>Team</th>
                      <th><i className="fas fa-star me-1"></i>Points</th>
                      <th><i className="fas fa-running me-1"></i>Activities</th>
                      <th><i className="fas fa-circle me-1"></i>Status</th>
                      <th><i className="fas fa-cog me-1"></i>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                              <span className="text-white fw-bold">
                                {(user.first_name || user.name || user.username || 'U').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="fw-bold">
                                {user.first_name && user.last_name 
                                  ? `${user.first_name} ${user.last_name}`
                                  : user.name || user.username || 'Unknown User'
                                }
                              </div>
                              <small className="text-muted">@{user.username || 'username'}</small>
                              {user.is_staff && (
                                <span className="badge bg-warning ms-2" style={{fontSize: '0.7rem'}}>
                                  <i className="fas fa-shield-alt me-1"></i>Staff
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="text-muted">
                            <i className="fas fa-envelope me-1"></i>
                            {user.email || 'No email'}
                          </div>
                        </td>
                        <td>
                          {user.team_name || user.team ? (
                            <span className="badge badge-team rounded-pill">
                              <i className="fas fa-flag me-1"></i>
                              {user.team_name || user.team}
                            </span>
                          ) : (
                            <span className="text-muted">No team</span>
                          )}
                        </td>
                        <td>
                          <span className="badge badge-points">
                            <i className="fas fa-star me-1"></i>
                            {user.total_points || 0}
                          </span>
                        </td>
                        <td>
                          <div className="text-center">
                            <div className="fw-bold text-primary">
                              {user.activity_count || 0}
                            </div>
                            <small className="text-muted">activities</small>
                          </div>
                        </td>
                        <td>
                          <span className={`badge rounded-pill ${user.is_active !== false ? 'bg-success' : 'bg-secondary'}`}>
                            <i className={`fas ${user.is_active !== false ? 'fa-check-circle' : 'fa-pause-circle'} me-1`}></i>
                            {user.is_active !== false ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button className="btn btn-sm btn-outline-primary" title="View Profile">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-secondary" title="Send Message">
                              <i className="fas fa-envelope"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-info" title="Add to Team">
                              <i className="fas fa-user-plus"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* User Stats Cards */}
          <div className="row g-4 mt-4">
            <div className="col-md-3">
              <div className="card octofit-card text-center">
                <div className="card-body">
                  <div className="display-6 text-primary mb-2">
                    <i className="fas fa-users"></i>
                  </div>
                  <h4 className="text-primary">{users.length}</h4>
                  <small className="text-muted">Total Users</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card octofit-card text-center">
                <div className="card-body">
                  <div className="display-6 text-success mb-2">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <h4 className="text-success">
                    {users.filter(user => user.is_active !== false).length}
                  </h4>
                  <small className="text-muted">Active Users</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card octofit-card text-center">
                <div className="card-body">
                  <div className="display-6 text-info mb-2">
                    <i className="fas fa-flag"></i>
                  </div>
                  <h4 className="text-info">
                    {users.filter(user => user.team_name || user.team).length}
                  </h4>
                  <small className="text-muted">In Teams</small>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card octofit-card text-center">
                <div className="card-body">
                  <div className="display-6 text-warning mb-2">
                    <i className="fas fa-star"></i>
                  </div>
                  <h4 className="text-warning">
                    {users.reduce((total, user) => total + (user.total_points || 0), 0)}
                  </h4>
                  <small className="text-muted">Total Points</small>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Joined Users */}
          <div className="card octofit-card mt-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-clock me-2"></i>Recently Joined
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                {users
                  .filter(user => user.date_joined)
                  .sort((a, b) => new Date(b.date_joined) - new Date(a.date_joined))
                  .slice(0, 4)
                  .map((user) => (
                    <div key={user.id} className="col-md-3 col-sm-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                          <span className="text-white fw-bold" style={{fontSize: '0.8rem'}}>
                            {(user.first_name || user.name || user.username || 'U').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="fw-medium">{user.name || user.username}</div>
                          <small className="text-muted">
                            {new Date(user.date_joined).toLocaleDateString()}
                          </small>
                        </div>
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
            <i className="fas fa-user-friends"></i>
          </div>
          <h4 className="text-muted">No Users Found</h4>
          <p className="text-muted">Start building your fitness community by inviting users!</p>
          <button className="btn btn-octofit-primary btn-lg">
            <i className="fas fa-user-plus me-2"></i>Invite First User
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;