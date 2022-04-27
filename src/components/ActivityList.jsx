const ActivityList = (props) => {
  return (
    <div className="grid">
      {props.activities.map((activity) => (
        <div key={activity.id} className="card">
          <h3>{activity.name}</h3>
          <div className="distance">{getMiles(activity.distance)}</div>
          <div className="miles">miles</div>
          <div className="date">{getDate(activity.start_date)}</div>
          <button onClick={() => props.selectActivity(activity.id)}>
            View Activity
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;

const getMiles = (meters) => {
  return (meters / 1609.344).toFixed(2);
};

const getDate = (date) => {
  const newDate = new Date(date);
  return newDate.toDateString();
};
