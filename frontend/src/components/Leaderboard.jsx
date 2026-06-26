import { useEffect, useMemo, useState } from 'react';

function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';

    return `${baseUrl}/leaderboard/`;
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const merged = data.flatMap((board) =>
          (board.entries ?? []).map((entry) => ({
            key: `${board._id}-${entry.rank}-${entry.user?._id ?? 'unknown'}`,
            scope: board.scope,
            team: board.team?.name ?? 'Global',
            rank: entry.rank,
            user: entry.user?.name ?? 'Unknown',
            points: entry.points,
            streakDays: entry.streakDays,
          }))
        );

        setRows(merged);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
      } finally {
        setLoading(false);
      }
    };

    void fetchLeaderboard();
  }, [endpoint]);

  if (loading) {
    return <p className="text-secondary">Loading leaderboard...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5">Leaderboard</h2>
        <p className="small text-muted mb-3">Endpoint: {endpoint}</p>
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Scope</th>
                <th>Team</th>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <td className="text-capitalize">{row.scope}</td>
                  <td>{row.team}</td>
                  <td>{row.rank}</td>
                  <td>{row.user}</td>
                  <td>{row.points}</td>
                  <td>{row.streakDays} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
