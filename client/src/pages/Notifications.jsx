import { useEffect, useState } from "react";
import API from "../api/axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get(`/notifications/${user._id}`);
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}`);

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Notifications 🔔
      </h1>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-10 text-center">
          No Notifications Yet
        </div>
      ) : (
        notifications.map((item) => (
          <div
            key={item._id}
            className={`mb-4 p-5 rounded-xl shadow ${
              item.isRead
                ? "bg-white"
                : "bg-blue-100"
            }`}
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="font-semibold">
                  {item.message}
                </p>

                <small className="text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </small>
              </div>

              {!item.isRead && (
                <button
                  onClick={() => markAsRead(item._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Mark Read
                </button>
              )}

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default Notifications;