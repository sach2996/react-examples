import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const activeStyle = {
    color: "#F06000",
    fontWeight: "bold",
    textDecoration: "none",
  };
  const inActiveStyle = {
    color: "white",
    fontWeight: "bold",
    textDecoration: "none",
  };
  const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/todo", label: "Todo" },
  ];
  return (
    <nav className="navbar-container">
      {navigationItems.map((item) => (
        <div key={item.path} className="navbar-item">
          <Link
            to={item.path}
            style={
              location.pathname === item.path ? activeStyle : inActiveStyle
            }
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
