import { useRecoilState, useRecoilValue } from "recoil";
import Navbar from "../../Navbar";
import Topbar from "./Topbar";
import { friendsAtom } from "../store/friends";
import { useEffect } from "react";
import axios from "axios";
import config from "../../../../config";
import { tokenAtom } from "../store/token";
import ProfilePicture from "./ProfilePicture";

export interface Friend {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}
export default function Friends() {
  const [friends, setFriends] = useRecoilState(friendsAtom);
  const token = useRecoilValue(tokenAtom);

  useEffect(() => {
    const friendsList = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/friend`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(response.data.friends);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      friendsList();
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
              <ProfilePicture
                firstName={friend.firstname}
                lastName={friend.lastname}
              />
              {friend.firstname} {friend.lastname}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
