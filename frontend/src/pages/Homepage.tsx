import Jumbotron from "../components/Jumbotron";
import {Diskon} from "../components/Diskon";
import {Megasale} from "../components/Megasale";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Jumbotron />
      <Diskon />
      <Megasale />
      <Newsletter />
      <Footer />
    </>
  )
};

export default Home;