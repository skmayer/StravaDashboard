const ActivityList = (props) => {
  return (
    <div className="grid">
      {props.activities.map((activity) => (
        <div key={activity.id} className="card">
          <h3>{activity.name}</h3>
          <h6>{getMiles(activity.distance)} miles</h6>
          <h6>{getDate(activity.start_date)}</h6>
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
