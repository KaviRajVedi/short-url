import React from "react";

const SystemDesignPage: React.FC = () => {
  return (
    <div>
      <h2>System Design of the URL Shortener</h2>
      <p>
        This URL Shortener is designed as a single page application (SPA) built
        using React, Vite, and TypeScript. The application includes:
      </p>
      <ul>
        <li>
          <strong>Authentication:</strong> A simple login and registration
          mechanism using a simulated backend (localStorage) that stores user
          credentials and their associated URLs.
        </li>
        <li>
          <strong>URL Shortening:</strong> Each user can create up to 10 short
          URLs. A short code is generated randomly for each URL.
        </li>
        <li>
          <strong>Persistence:</strong> Instead of using a database, the app
          simulates persistence by reading and writing to localStorage. In a
          production system, you might replace this with API calls that
          read/write to a file or database.
        </li>
        <li>
          <strong>Routing:</strong> React Router is used to manage different
          pages (Login, URL Shortener, System Design explanation).
        </li>
        <li>
          <strong>Responsive UI:</strong> The app uses Bootstrap to ensure a
          responsive and modern design.
        </li>
      </ul>

      <h3>Architecture Diagram</h3>
      <p>
        The following diagram shows a high-level overview of the system design:
      </p>
      <img
        src="https://via.placeholder.com/800x400?text=System+Design+Diagram"
        alt="System Design Diagram"
        className="img-fluid my-3"
      />

      <h3>How It Works</h3>
      <ol>
        <li>
          <strong>Login/Registration:</strong> The user enters their
          credentials. If they are new, a registration occurs. The data is
          stored in localStorage (simulating a file).
        </li>
        <li>
          <strong>URL Shortening:</strong> The user inputs an original URL. The
          app generates a random short code and stores the mapping (up to 10 per
          user).
        </li>
        <li>
          <strong>Accessing Short URLs:</strong> The user can copy the generated
          short URL and share it. In a real-world scenario, you would have
          server–side logic to redirect from the short URL to the original URL.
        </li>
        <li>
          <strong>System Limit:</strong> The system ensures that no user can
          create more than 10 short URLs by checking the current count before
          allowing a new entry.
        </li>
      </ol>
      <p>
        This design demonstrates how a simple, serverless URL shortener can be
        built with modern web technologies, while simulating persistence without
        a traditional database.
      </p>
    </div>
  );
};

export default SystemDesignPage;
