import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PostList from "../components/PostList";
import AddTasks from "../components/AddTasks";
import LiveTasks from "../components/LiveTasks";

const Profile = () => {
  const { user, setMessages } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [createdTasks, setCreatedTasks] = useState([]);
  const [userID, setUserID] = useState("");
  const [isMakingChanges, setIsMakingChanges] = useState(false);
  const [activeTab, setActiveTab] = useState({
    liveTasks: true,
    addTasks: false,
    tasksCharts: false,
    addGoals: false,
    goals: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    });
    const json = await response.json();
    if (json.messages) {
      setMessages(json.messages);
    }
    if (json.post) {
      setPosts([...posts, json.post]);
      form.reset();
    }
  };

  function changeTab(key) {
    setActiveTab({
      liveTasks: "liveTasks" === key,
      addTasks: "addTasks" === key,
      tasksCharts: "tasksCharts" === key,
      addGoals: "addGoals" === key,
      goals: "goals" === key,
    });
  }

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    if (user) {
      setUserID(user._id);
    }
  }, [user]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (userID) {
        try {
          const response = await fetch(`/api/tasks/${userID}`);
          const { tasks } = await response.json();
          setCreatedTasks(tasks);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      }
    };

    fetchTasks();
  }, [userID]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isMakingChanges) {
        const message = "Do you want to leave without saving?";
        event.preventDefault();
        event.returnValue = message; // For older browsers and some modern ones
        return message; // Might be shown in some browsers
      }
    };

    if (isMakingChanges) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isMakingChanges]);

  if (!user) {
    return null;
  }
  console.log(createdTasks);

  return (
    <div className="container">
      <div>
        <p>
          <strong>User Name</strong>: {user.userName}
        </p>
        <p>
          <strong>Email</strong>: {user.email}
        </p>
        <Link className="btn btn-primary" to="/feed">
          Return to Feed
        </Link>
      </div>

      <div>
        <button onClick={() => changeTab("liveTasks")}>Live Tasks</button>
        <button onClick={() => changeTab("addTasks")}>Add Tasks</button>
        <button onClick={() => changeTab("tasksCharts")}>Tasks charts</button>
        <button onClick={() => changeTab("goals")}>Goals</button>
        <button onClick={() => changeTab("addGoals")}>Add Goals</button>
      </div>
      <div>
        {activeTab.liveTasks && (
          <LiveTasks
            createdTasks={createdTasks}
            setIsMakingChanges={setIsMakingChanges}
          />
        )}
        {activeTab.addTasks && (
          <AddTasks
            tasks={tasks}
            setTasks={setTasks}
            userID={userID}
            setIsMakingChanges={setIsMakingChanges}
          />
        )}
        {activeTab.tasksCharts}
        {activeTab.goals}
        {activeTab.addGoals}
      </div>
      <div className="mt-5">
        <h2>Add Next Day Tasks</h2>
        <form
          action="/api/post/createPost"
          encType="multipart/form-data"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="caption" className="form-label">
              Caption
            </label>
            <textarea
              className="form-control"
              id="caption"
              name="caption"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imgUpload" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="imageUpload"
              name="file"
            />
          </div>
          <button type="submit" className="btn btn-primary" value="Upload">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
