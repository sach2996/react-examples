import { useRecoilState, useRecoilValue } from "recoil";
import Navbar from "../../Navbar";
import Topbar from "./Topbar";
import { friendsAtom } from "../store/friends";
import { useEffect } from "react";
import axios from "axios";
import config from "../../../../config";
import { tokenAtom } from "../store/token";
import ProfilePicture from "./ProfilePicture";
import { useNavigate } from "react-router-dom";

export interface Friend {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  balance: number;
}

export default function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useRecoilState(friendsAtom);
  const token = useRecoilValue(tokenAtom);

  useEffect(() => {
    const friendsList = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/friend`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(response.data.friends.friends);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      friendsList();
    } else {
      return navigate("/login");
    }
  }, []);
  return (
    <div className="home-style">
      <Navbar />
      <div className="split-home">
        <Topbar />
        <div className="friends-top-bar">
          Friends
          <button hidden>Add Friend</button>
        </div>
        <div>
          {friends.map((friend: Friend) => (
            <div key={friend.username} className="friend-item">
              <div className="friend-item-left">
                <ProfilePicture
                  firstName={friend.firstname}
                  lastName={friend.lastname}
                />
                {friend.firstname} {friend.lastname}
              </div>
              <div className="friend-item-right">
                {friend.balance < 0 && (
                  <span
                    style={{
                      backgroundColor: "#fca5a5",
                      padding: "2px",
                      borderRadius: "6px",
                      color: "red",
                    }}
                  >
                    You owe CA$ {(friend.balance / 100).toFixed(2)}
                  </span>
                )}
                {friend.balance > 0 && (
                  <span
                    style={{
                      backgroundColor: "#aed1ae",
                      padding: "2px",
                      borderRadius: "6px",
                      color: "green",
                    }}
                  >
                    Owes you CA$ {(friend.balance / 100).toFixed(2)}
                  </span>
                )}
                {friend.balance == 0 && (
                  <span
                    style={{
                      backgroundColor: "#e0e0e0",
                      padding: "2px",
                      borderRadius: "6px",
                    }}
                  >
                    You are settled up.
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
