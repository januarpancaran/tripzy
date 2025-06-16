import Jumbotron from "../components/Jumbotron";
import { Diskon } from "../components/Diskon";
import TripEstimator from "../components/KalkulatorTrip";

const Home = () => {
  return (
    <>
      <Jumbotron />
      <Diskon />
      <TripEstimator />
    </>
  );
};

export default Home;
