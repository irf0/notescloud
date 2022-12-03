import AddNote from "./AddNote";
import Footer from "./Footer";
import Notes from "./Notes";

function Home(props) {
  const { showAlert } = props;
  return (
    <div>
      <AddNote showAlert={props.showAlert} />
      <Notes showAlert={showAlert} />
      <Footer />
    </div>
  );
}

export default Home;
