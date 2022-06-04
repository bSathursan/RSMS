import { useEffect, useState } from "react";
import { getAuth, logout } from "../../helper/helper";
import { roles } from "../../Util/utils";
import { fetchStudentGroup } from "../../api/studentGroupApi";
import "./Navbar.css";
import head from "../images/head.jpg";

export default function NavBar() {
  const [role, setRole] = useState(null);
  // const [userId, setUserId] = useState(null);
  const [group, setGroup] = useState([]);
  const { SUPERVISOR, STUDENT, PANEL_MEMBER, ADMIN } = roles;

  useEffect(() => {
    const auth = getAuth();
    auth && setRole(auth.role);
    getGroup();
    console.log(group);
  }, []);

  const getGroup = async () => {
    let userId = getAuth().id;
    const group = await fetchStudentGroup(`studentsId=${userId}`);
    setGroup(group.data.responseData);
    console.log(group.data.responseData);
  };

  return (
    <div>
      <div className="nav_body">
        <img
          onClick={() => (window.location.href = "/")}
          src={head}
          className="logo"
        />
        <div>
        {role === ADMIN &&
          <>
            <button
              onClick={() => (window.location.href = "/panel-management")}
            >
              Panels 
            </button>
            <br></br>
            <button onClick={() => (window.location.href = "/users")}>
              Users
            </button>
            <br></br>
            <button onClick={() => (window.location.href = "/panels")}>
              Groups
            </button>
            <button
              onClick={() => (window.location.href = "/submission-types")}
            >
              Submissions
            </button>
            <button onClick={() => (window.location.href = "/templates")}>
              Templates
            </button>
            <button onClick={() => (window.location.href = "/marking-schemes")}>
              Marking Schemes
            </button>
          </>
        }
        {role === PANEL_MEMBER && 
          <>
            <button
              onClick={() => (window.location.href = "/panel/studentgroup")}
            >
              Groups
            </button>
            <button
              onClick={() => (window.location.href = "/submissions-list")}
            >
              Student Submissions
            </button>
            <button>My Panel</button>
          </>
        }
        {role === STUDENT && group.length !== 0 ? 
          <>
            <button onClick={() => (window.location.href = "/studentgroup")}>
              My Group
            </button>
            <button onClick={() => (window.location.href = "/chat")}>
              Chat
            </button>
          </> : 
          role === STUDENT && group.length === 0 ? 
          <>
            <button
              style={{
                color: "#70707",
                fontWeight: "600",
                fontSize: "15.5px",
              }}
              onClick={() =>
                (window.location.href = "/studentgroup/registration")
              }
            > Register Student Group
               </button>
           
          </> :
          <>
          </>
        }
        {role === SUPERVISOR && (
          <>
            <button
              onClick={() => (window.location.href = "/submissions-list")}
            >
              Student Submissions
            </button>
            <button>Groups</button>
            <button onClick={() => (window.location.href = "/chat")}>
              Chat
            </button>
            <button onClick={() => (window.location.href = "/manage-topics")}>
              Requests
            </button>
          </>
        )}
        </div>
        <div className="logout">
          {role && <button onClick={logout}>Logout</button>}
          </div>

          {!role && (
            <>
              <button onClick={() => (window.location.href = "/login")}>
                Login
              </button>
              <button onClick={() => (window.location.href = "/signup")}>
                Register
              </button>
            </>
          )}
 
      </div>
    </div>
  );
}
