import Navbar from "./Navbar";

export default function Home() {
  return (
    <div>
      <Navbar /> <HomeInfo />
    </div>
  );
}

function HomeInfo() {
  return (
    <div className="home-info-container">
      <div className="home-info-section">
        <h2>Welcome to React Learning</h2>
      </div>
      <div className="home-info-section">
        <p>
          We will learn about different liberaries and features we use to create
          React applications i.e. React, React DOM, Recoil, MobX, Formik
        </p>
      </div>
    </div>
  );
}
