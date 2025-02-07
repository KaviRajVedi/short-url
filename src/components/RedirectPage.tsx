import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers, ShortUrl } from "../utils/storage";

const RedirectPage: React.FC = () => {
  const { short } = useParams<{ short: string }>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (short) {
      const users = getAllUsers();
      let foundUrl: string | null = null;
      // Search through every user's URLs for the matching short code
      for (const user of users) {
        const urlObj = user.urls.find((u: ShortUrl) => u.short === short);
        if (urlObj) {
          foundUrl = urlObj.original;
          break;
        }
      }
      if (foundUrl) {
        // Redirect to the original URL
        window.location.href = foundUrl;
      } else {
        setError("Short URL not found.");
      }
    }
  }, [short]);

  return (
    <div className="container my-5">
      {error ? <h2>{error}</h2> : <h2>Redirecting...</h2>}
    </div>
  );
};

export default RedirectPage;
