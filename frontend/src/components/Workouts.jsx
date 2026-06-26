import { useEffect, useMemo, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';

    return `${baseUrl}/workouts/`;
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setWorkouts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch workouts');
      } finally {
        setLoading(false);
      }
    };

    void fetchWorkouts();
  }, [endpoint]);

  if (loading) {
    return <p className="text-secondary">Loading workouts...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5">Workouts</h2>
        <p className="small text-muted mb-3">Endpoint: {endpoint}</p>
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Focus</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id}>
                  <td>{workout.title}</td>
                  <td>{workout.focus}</td>
                  <td className="text-capitalize">{workout.difficulty}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{(workout.tags ?? []).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
