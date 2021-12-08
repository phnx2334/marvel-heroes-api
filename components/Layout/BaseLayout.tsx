import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const BaseLayout: React.FC = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default BaseLayout;
