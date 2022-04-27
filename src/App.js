import "./styles/App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, TOKEN } from "./globals";
import ActivityList from "./components/ActivityList";
import ActivityDetails from "./components/ActivityDetails";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const selectActivity = (id) => {
    setSelectedActivity(id);
  };

  const goBack = () => {
    setSelectedActivity(null);
  };

  useEffect(() => {
    const getActivities = async () => {
      const response = await axios.get(
        `${BASE_URL}/athlete/activities?access_token=${TOKEN}`
      );
      console.log(response);
      setActivities(response.data);
    };
    getActivities();
  }, []);

  return (
    <div>
      <h1 className="title">Strava Dashboard</h1>
      {selectedActivity ? (
        <ActivityDetails selectedActivity={selectedActivity} goBack={goBack} />
      ) : (
        <ActivityList activities={activities} selectActivity={selectActivity} />
      )}
    </div>
  );
};

export default App;
