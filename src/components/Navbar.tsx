import { Link, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const location = useLocation();
//   const activeStyle = {
//     color: "#F06000",
//     fontWeight: "bold",
//     textDecoration: "none",
//   };
//   const inActiveStyle = {
//     color: "white",
//     fontWeight: "bold",
//     textDecoration: "none",
//   };
//   const navigationItems = [
//     { path: "/", label: "Home" },
//     { path: "/todo", label: "Todo" },
//     { path: "/split", label: "Split" },
//   ];
//   return (
//     <nav className="navbar-container">
//       {navigationItems.map((item) => (
//         <div key={item.path} className="navbar-item">
//           <Link
//             to={item.path}
//             style={
//               location.pathname === item.path ? activeStyle : inActiveStyle
//             }
//           >
//             {item.label}
//           </Link>
//         </div>
//       ))}
//     </nav>
//   );
// }

export default function Navbar() {
  const location = useLocation();
  const activeStyle = {
    color: "#F06000",
    fontWeight: "bold",
    textDecoration: "none",
  };
  const inActiveStyle = {
    color: "black",
    fontWeight: "bold",
    textDecoration: "none",
  };
  const navigationItems = [
    { path: "/", label: "Home", image: "public/home.svg" },
    { path: "/activity", label: "Activity", image: "public/activity.svg" },
    { path: "/friends", label: "Friends", image: "public/friends.svg" },
    { path: "/groups", label: "Groups", image: "public/groups.svg" },
    { path: "/expenses", label: "Expense", image: "public/expense.svg" },
    // { path: "/import", label: "Import", image: "public/import.svg" },
  ];
  return (
    <>
      <nav className="navbar-container">
        {navigationItems.map((item) => (
          <div key={item.path} className="navbar-item">
            <Link
              to={item.path}
              style={
                location.pathname === item.path ? activeStyle : inActiveStyle
              }
            >
              <img src={item.image} width={"15px"} height={"15px"} />{" "}
              <span>{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>
    </>
  );
}
