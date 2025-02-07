import React, { useState, useEffect } from "react";
import { addUrlToUser, getUserUrls } from "../utils/storage";

interface ShortenerPageProps {
  user: string;
}

const ShortenerPage: React.FC<ShortenerPageProps> = ({ user }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState<{ short: string; original: string }[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setUrls(getUserUrls(user));
  }, [user]);

  const generateShortCode = (): string => {
    // Simple random string generator
    return Math.random().toString(36).substring(2, 8);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urls.length >= 10) {
      setMessage("You have reached the maximum of 10 short URLs.");
      return;
    }
    const short = generateShortCode();
    const success = addUrlToUser(user, { short, original: originalUrl });
    if (success) {
      setUrls(getUserUrls(user));
      setMessage(`Short URL created: ${window.location.origin}/${short}`);
      setOriginalUrl("");
    } else {
      setMessage("Failed to add URL. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create a Short URL</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Original URL</label>
          <input
            type="url"
            className="form-control"
            required
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Shorten URL
        </button>
      </form>
      <h3>Your Short URLs</h3>
      {urls.length === 0 ? (
        <p>You haven't created any short URLs yet.</p>
      ) : (
        <ul className="list-group">
          {urls.map((url, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{url.short}</strong> →{" "}
                <a
                  href={url.original}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.original}
                </a>
              </span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/${url.short}`
                  )
                }
              >
                Copy Link
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShortenerPage;
