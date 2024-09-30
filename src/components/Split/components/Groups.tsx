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
import { balanceAtom } from "../store/balance";
import { useNavigate } from "react-router-dom";

interface Group {
  groupName: string;
  description: string;
  users: Friend[];
  transactions: string;
}

interface GroupItem {
  groupName: string;
  balance: number;
}
export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useRecoilState(groupsAtom);
  const token = useRecoilValue(tokenAtom);

  const balance = useRecoilValue(balanceAtom);

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
          Groups
          <button hidden>Create Group</button>
        </div>
        <div>
          {groups.map((group: Group) => (
            <div key={group.groupName} className="group-item">
              <div className="group-details-left" style={{ display: "flex" }}>
                <div>
                  <GroupProfile firstName={group.groupName} lastName="G" />
                </div>
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
              {balance.groups.map(
                (groupItem: GroupItem) =>
                  group.groupName === groupItem.groupName && (
                    <div
                      key={groupItem.balance}
                      className="group-details-right"
                    >
                      {groupItem.balance > 0 && (
                        <span
                          style={{
                            backgroundColor: "#aed1ae",
                            padding: "2px",
                            borderRadius: "6px",
                            color: "green",
                          }}
                        >
                          You get CA$ {(groupItem.balance / 100).toFixed(2)}
                        </span>
                      )}
                      {groupItem.balance < 0 && (
                        <span
                          style={{
                            backgroundColor: "#fca5a5",
                            padding: "2px",
                            borderRadius: "6px",
                            color: "red",
                          }}
                        >
                          You owe CA$ {(groupItem.balance / 100).toFixed(2)}
                        </span>
                      )}
                      {groupItem.balance == 0 && (
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
                  )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
