import React, { useState, useEffect, useCallback } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  const API_ENDPOINT = `${API_BASE_URL}/api/leaderboard/`;

  const fetchLeaderboard = useCallback(async () => {
    try {
      console.log('Fetching leaderboard from:', API_ENDPOINT);
      const response = await fetch(API_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Leaderboard API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const leaderboardData = data.results ? data.results : (Array.isArray(data) ? data : []);
      console.log('Processed leaderboard data:', leaderboardData);
      
      setLeaderboard(leaderboardData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [API_ENDPOINT]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

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
        Error loading leaderboard: {error}
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header text-center">
        <div className="container">
          <h1 className="page-title">
            <i className="fas fa-trophy me-3"></i>Leaderboard
          </h1>
          <p className="page-subtitle">See who's leading the fitness competition</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="card octofit-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="fas fa-medal me-2"></i>Current Rankings
          </h5>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm">
              <i className="fas fa-sync-alt me-1"></i>Refresh
            </button>
            <select className="form-select form-select-sm" style={{width: 'auto'}}>
              <option>This Week</option>
              <option>This Month</option>
              <option>All Time</option>
            </select>
          </div>
        </div>
        <div className="card-body p-0">
          {leaderboard.length > 0 ? (
            <div className="table-responsive">
              <table className="table octofit-table mb-0">
                <thead>
                  <tr>
                    <th><i className="fas fa-hashtag me-1"></i>Rank</th>
                    <th><i className="fas fa-user me-1"></i>User</th>
                    <th><i className="fas fa-star me-1"></i>Points</th>
                    <th><i className="fas fa-running me-1"></i>Activities</th>
                    <th><i className="fas fa-users me-1"></i>Team</th>
                    <th><i className="fas fa-chart-line me-1"></i>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    let rankBadgeClass = 'badge bg-secondary';
                    let rankIcon = 'fas fa-user';
                    
                    if (rank === 1) {
                      rankBadgeClass = 'badge badge-rank-1';
                      rankIcon = 'fas fa-crown';
                    } else if (rank === 2) {
                      rankBadgeClass = 'badge badge-rank-2';
                      rankIcon = 'fas fa-medal';
                    } else if (rank === 3) {
                      rankBadgeClass = 'badge badge-rank-3';
                      rankIcon = 'fas fa-award';
                    }

                    return (
                      <tr key={entry.id || index} className={rank <= 3 ? 'table-warning' : ''}>
                        <td>
                          <span className={rankBadgeClass} style={{minWidth: '40px'}}>
                            <i className={`${rankIcon} me-1`}></i>
                            {rank}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                              <span className="text-white fw-bold">
                                {(entry.user_name || entry.name || 'U').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="fw-bold">{entry.user_name || entry.name || 'Unknown User'}</div>
                              {rank <= 3 && (
                                <small className="text-muted">
                                  <i className="fas fa-fire me-1"></i>Top Performer
                                </small>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-points fs-6">
                            <i className="fas fa-star me-1"></i>
                            {entry.total_points || entry.points || 0}
                          </span>
                        </td>
                        <td>
                          <div className="text-center">
                            <div className="fw-bold text-primary">
                              {entry.activity_count || entry.activities || 0}
                            </div>
                            <small className="text-muted">activities</small>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-team rounded-pill">
                            <i className="fas fa-users me-1"></i>
                            {entry.team_name || entry.team || 'No Team'}
                          </span>
                        </td>
                        <td>
                          <div className="text-center">
                            {rank <= 3 ? (
                              <i className="fas fa-arrow-up text-success" title="Rising"></i>
                            ) : rank <= 5 ? (
                              <i className="fas fa-minus text-warning" title="Stable"></i>
                            ) : (
                              <i className="fas fa-arrow-down text-danger" title="Falling"></i>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="display-1 text-muted mb-3">
                <i className="fas fa-trophy"></i>
              </div>
              <h4 className="text-muted">No Competition Data</h4>
              <p className="text-muted">Start logging activities to see the leaderboard!</p>
              <button className="btn btn-octofit-primary">
                <i className="fas fa-plus me-2"></i>Log Activity
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Top Performers Cards */}
      {leaderboard.length >= 3 && (
        <div className="row g-4 mt-4">
          {leaderboard.slice(0, 3).map((entry, index) => {
            const rank = index + 1;
            const cardClass = rank === 1 ? 'border-warning' : rank === 2 ? 'border-secondary' : 'border-danger';
            const iconClass = rank === 1 ? 'fas fa-crown text-warning' : rank === 2 ? 'fas fa-medal text-secondary' : 'fas fa-award text-danger';
            
            return (
              <div key={entry.id || index} className="col-md-4">
                <div className={`card octofit-card ${cardClass} text-center h-100`}>
                  <div className="card-body">
                    <div className="display-4 mb-3">
                      <i className={iconClass}></i>
                    </div>
                    <h5 className="card-title">{entry.user_name || entry.name || 'Unknown'}</h5>
                    <p className="text-muted">{entry.team_name || entry.team || 'No Team'}</p>
                    <div className="d-flex justify-content-around mt-3">
                      <div className="text-center">
                        <div className="h5 text-primary mb-0">{entry.total_points || entry.points || 0}</div>
                        <small className="text-muted">Points</small>
                      </div>
                      <div className="text-center">
                        <div className="h5 text-success mb-0">{entry.activity_count || entry.activities || 0}</div>
                        <small className="text-muted">Activities</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;