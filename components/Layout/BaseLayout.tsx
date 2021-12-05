import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const BaseLayout: React.FC = (props) => {
  return (
    <div className="relative p-2">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default BaseLayout;
