import { useRecoilState, useRecoilValue } from "recoil";
import Navbar from "../../Navbar";
import { groupsAtom } from "../store/friends";
import { tokenAtom } from "../store/token";
import Topbar from "./Topbar";
import { useEffect } from "react";
import { Friend } from "./Friends";
import axios from "axios";
import config from "../../../../config";
import GroupProfile from "./GroupProfile";
import ProfilePicture from "./ProfilePicture";

interface Group {
  groupName: string;
  description: string;
  users: Friend[];
}

export default function Groups() {
  const [groups, setGroups] = useRecoilState(groupsAtom);
  const token = useRecoilValue(tokenAtom);

  useEffect(() => {
    const groupsList = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/group`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroups(response.data.groups);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      groupsList();
    }
  }, []);
  return (
    <div className="home-style">
      <Navbar />
      <div className="split-home">
        <Topbar />
        <div className="friends-top-bar">
          Groups
          <button hidden>Create Group</button>
        </div>
        <div>
          {groups.map((group: Group) => (
            <div key={group.groupName} className="group-item">
              <GroupProfile firstName={group.groupName} lastName="G" />
              <div className="group-details">
                {group.groupName}

                <p>
                  {group.users.map((user: Friend, index) => (
                    <span key={user.username} style={{ marginRight: "2px" }}>
                      {user.firstname}
                      {index === group.users.length - 1 ? "" : ","}
                    </span>
                  ))}
                </p>
                <div style={{ display: "flex" }}>
                  {group.users.map((user: Friend) => (
                    <ProfilePicture
                      firstName={user.firstname}
                      lastName={user.lastname}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
