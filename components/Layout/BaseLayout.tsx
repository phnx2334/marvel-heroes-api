import Header from "../Header/Header";

const BaseLayout: React.FC = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default BaseLayout;
