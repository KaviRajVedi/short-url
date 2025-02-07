import React, { useState, useEffect } from "react";

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("url_shortener_users");
    if (storedData) {
      setUsers(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="container my-4">
      <h2>Admin Dashboard</h2>
      {users.length === 0 ? (
        <p>No user data found.</p>
      ) : (
        <div>
          {users.map((user, index) => (
            <div key={index} className="card mb-3">
              <div className="card-header">
                <strong>User:</strong> {user.username}
              </div>
              <div className="card-body">
                <p>
                  <strong>Password:</strong> {user.password}
                </p>
                <h5>URLs:</h5>
                {user.urls && user.urls.length > 0 ? (
                  <ul className="list-group">
                    {user.urls.map((url: any, idx: number) => (
                      <li key={idx} className="list-group-item">
                        <strong>{url.short}</strong> →{" "}
                        <a
                          href={url.original}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.original}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No URLs created.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
