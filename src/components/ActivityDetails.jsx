import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, TOKEN } from "../globals";
import defaultImage from "../images/kulfi-roar.jpeg";
import calIcon from "../images/calendar.svg";

const ActivityDetails = (props) => {
  const [activityDetails, setActivityDetails] = useState(null);
  const [activityDetailsPhoto, setPhoto] = useState(null);
  const [activityDetailsSplits, setSplits] = useState(null);
  useEffect(() => {
    const getActivityDetails = async () => {
      const response = await axios.get(
        `${BASE_URL}/activities/${props.selectedActivity}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      setActivityDetails(response.data);
      setPhoto(response.data.photos.primary.urls[600]);
      setSplits(response.data.splits_standard);
    };
    getActivityDetails();
  }, [props.selectedActivity]);

  return (
    <div>
      {activityDetails ? (
        <div className="details">
          <div className="card">
            {activityDetailsPhoto ? (
              <img
                src={activityDetailsPhoto}
                alt="poster"
                className="pickgradient"
              />
            ) : (
              <img src={defaultImage} alt="poster" className="pickgradient" />
            )}
            <div className="container">
              <div>
                {" "}
                <h1>{activityDetails.name}</h1>{" "}
              </div>
              <div>
                {" "}
                <h3>{getMetersToMiles(activityDetails.distance)} mi</h3>{" "}
              </div>
              <div className="flexboxParent">
                <div className="childFlex date">
                  <img src={calIcon} alt="Calendar Icon" className="icon" />
                  {getDate(activityDetails.start_date)}
                </div>
              </div>
              <div className="flexboxParent metadata">
                <div className="childFlex">
                  <div>Time</div>
                  <div className="value">
                    {getTime(activityDetails.moving_time)}
                  </div>
                </div>
                <div className="childFlex">
                  <div>Elevation</div>
                  <div className="value">
                    {convertMetersToFeet(activityDetails.total_elevation_gain)}{" "}
                    ft
                  </div>
                </div>
                <div className="childFlex">
                  <div>Pace</div>
                  <div className="value">
                    {calcPace(
                      activityDetails.moving_time,
                      activityDetails.distance
                    )}{" "}
                    /mi
                  </div>
                </div>
              </div>
            </div>
            {activityDetailsSplits ? (
              <table>
                <tr>
                  <th>Mile</th>
                  <th>Pace</th>
                  <th>Elev</th>
                </tr>
                {activityDetails.splits_standard.map((split) => (
                  <tr>
                    <td>{split.split}</td>
                    <td>{calcSplitPace(split.elapsed_time)} /mi</td>
                    <td>{split.elevation_difference} ft</td>
                  </tr>
                ))}
              </table>
            ) : (
              <div></div>
            )}
          </div>
          <button onClick={props.goBack}>Go Back</button>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default ActivityDetails;

const getMetersToMiles = (meters) => {
  return (meters / 1609.344).toFixed(2);
};

const convertMetersToFeet = (meters) => {
  return (meters * 3.28084).toFixed(0);
};

const calcPace = (time, distance) => {
  const distanceStandard = getMetersToMiles(distance);
  return (time / distanceStandard / 60).toFixed(2);
};

const calcSplitPace = (time) => {
  return (time / 60).toFixed(2);
};

const getDate = (date) => {
  const newDate = new Date(date);
  return newDate.toDateString();
};

const getTime = (time) => {
  let minutes = (time / 60).toFixed(0);
  let hours = (minutes / 60).toFixed(0);
  let remainder = minutes % 60;
  if (hours === 0) {
    return `${remainder}m`;
  } else return `${hours}h ${remainder}m`;
};
