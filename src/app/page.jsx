import Nav from "@/components/Nav";
import Gallery from "@/components/Gallery";
import Preloader from "@/components/Preloader";

const Home = () => {
  return (
    <div>
      <Preloader />
      <Nav />
      <Gallery />
    </div>
  );
};

export default Home;
