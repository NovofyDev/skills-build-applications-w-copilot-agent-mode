import React, { useState, useEffect, useCallback } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  const API_ENDPOINT = `${API_BASE_URL}/api/teams/`;

  const fetchTeams = useCallback(async () => {
    try {
      console.log('Fetching teams from:', API_ENDPOINT);
      const response = await fetch(API_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Teams API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const teamsData = data.results ? data.results : (Array.isArray(data) ? data : []);
      console.log('Processed teams data:', teamsData);
      
      setTeams(teamsData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [API_ENDPOINT]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

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
        Error loading teams: {error}
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header text-center">
        <div className="container">
          <h1 className="page-title">
            <i className="fas fa-users me-3"></i>Teams
          </h1>
          <p className="page-subtitle">Join forces and compete together</p>
        </div>
      </div>

      {/* Teams Grid */}
      {teams.length > 0 ? (
        <>
          {/* Teams Cards */}
          <div className="row g-4">
            {teams.map((team) => (
              <div key={team.id} className="col-lg-4 col-md-6">
                <div className="card octofit-card h-100">
                  <div className="card-header bg-gradient text-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <i className="fas fa-flag me-2"></i>
                        {team.name || 'Team'}
                      </h5>
                      <span className="badge bg-light text-dark">
                        {team.member_count || team.members?.length || 0} members
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    {team.description && (
                      <p className="text-muted mb-3">
                        <i className="fas fa-info-circle me-1"></i>
                        {team.description}
                      </p>
                    )}
                    
                    {/* Team Stats */}
                    <div className="row text-center mb-3">
                      <div className="col-6">
                        <div className="border-end">
                          <h4 className="text-success mb-0">{team.total_points || 0}</h4>
                          <small className="text-muted">Total Points</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <h4 className="text-primary mb-0">{team.member_count || team.members?.length || 0}</h4>
                        <small className="text-muted">Members</small>
                      </div>
                    </div>

                    {/* Team Members */}
                    {team.members && Array.isArray(team.members) && team.members.length > 0 && (
                      <div>
                        <h6 className="fw-bold mb-2">
                          <i className="fas fa-users me-1"></i>Team Members:
                        </h6>
                        <div className="d-flex flex-wrap gap-1 mb-3">
                          {team.members.slice(0, 5).map((member, index) => (
                            <span key={index} className="badge bg-info rounded-pill">
                              <i className="fas fa-user me-1"></i>
                              {member.name || member.username || member}
                            </span>
                          ))}
                          {team.members.length > 5 && (
                            <span className="badge bg-secondary rounded-pill">
                              +{team.members.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Team Actions */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-eye me-1"></i>View Details
                      </button>
                      <button className="btn btn-octofit-primary btn-sm">
                        <i className="fas fa-user-plus me-1"></i>Join Team
                      </button>
                    </div>

                    {/* Creation Date */}
                    {team.created_at && (
                      <div className="text-center mt-3 pt-2 border-top">
                        <small className="text-muted">
                          <i className="fas fa-calendar me-1"></i>
                          Created {new Date(team.created_at).toLocaleDateString()}
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create New Team Card */}
          <div className="row mt-4">
            <div className="col-lg-4 col-md-6">
              <div className="card octofit-card h-100 border-dashed">
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <div className="display-1 text-muted mb-3">
                    <i className="fas fa-plus-circle"></i>
                  </div>
                  <h5 className="text-muted mb-3">Create New Team</h5>
                  <p className="text-muted mb-4">
                    Start your own team and invite others to join your fitness journey!
                  </p>
                  <button className="btn btn-octofit-primary">
                    <i className="fas fa-plus me-2"></i>Create Team
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Team Leaderboard */}
          <div className="card octofit-card mt-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-trophy me-2"></i>Team Rankings
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table octofit-table mb-0">
                  <thead>
                    <tr>
                      <th><i className="fas fa-hashtag me-1"></i>Rank</th>
                      <th><i className="fas fa-flag me-1"></i>Team Name</th>
                      <th><i className="fas fa-users me-1"></i>Members</th>
                      <th><i className="fas fa-star me-1"></i>Total Points</th>
                      <th><i className="fas fa-chart-bar me-1"></i>Avg per Member</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams
                      .sort((a, b) => (b.total_points || 0) - (a.total_points || 0))
                      .map((team, index) => (
                        <tr key={team.id}>
                          <td>
                            <span className={`badge ${index === 0 ? 'badge-rank-1' : index === 1 ? 'badge-rank-2' : index === 2 ? 'badge-rank-3' : 'bg-secondary'}`}>
                              {index + 1}
                            </span>
                          </td>
                          <td>
                            <div className="fw-bold">{team.name || 'Team'}</div>
                          </td>
                          <td>
                            <span className="text-primary fw-bold">
                              {team.member_count || team.members?.length || 0}
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-points">
                              {team.total_points || 0}
                            </span>
                          </td>
                          <td>
                            <span className="text-success fw-bold">
                              {team.member_count > 0 ? Math.round((team.total_points || 0) / team.member_count) : 0}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <div className="display-1 text-muted mb-3">
            <i className="fas fa-users"></i>
          </div>
          <h4 className="text-muted">No Teams Yet</h4>
          <p className="text-muted">Be the first to create a team and start competing together!</p>
          <button className="btn btn-octofit-primary btn-lg">
            <i className="fas fa-plus me-2"></i>Create First Team
          </button>
        </div>
      )}
    </div>
  );
};

export default Teams;