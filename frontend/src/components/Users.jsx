import { useEffect, useMemo, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';

    return `${baseUrl}/users/`;
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    void fetchUsers();
  }, [endpoint]);

  if (loading) {
    return <p className="text-secondary">Loading users...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5">Users</h2>
        <p className="small text-muted mb-3">Endpoint: {endpoint}</p>
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Level</th>
                <th>Goal (min)</th>
                <th>Points</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-capitalize">{user.fitnessLevel}</td>
                  <td>{user.weeklyGoalMinutes}</td>
                  <td>{user.totalPoints}</td>
                  <td>{user.team?.name ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
