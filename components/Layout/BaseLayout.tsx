import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const BaseLayout: React.FC = (props) => {
  return (
    <div className="relative">
      <Header />
      <div className="p-2">{props.children}</div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
