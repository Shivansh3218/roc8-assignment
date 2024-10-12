import React from "react";
import { formatDate } from "../utils/dateFormat";
import "../App.css"; // Import CSS for styling

const EmailList = ({ emails, onSelectEmail, handleFavourite }) => (
  <div className="email-list">
    {emails.map((email) => (
      <div
        key={email.id}
        className={`email-item ${email.read ? "read" : "unread"}`}
        onClick={() => {
          onSelectEmail(email.id);
        }}
      >
        <div className="avatar">{email.from.name[0]}</div>
        <div className="email-content">
          <div className="from">
            From:{" "}
            <span>
              {email.from.name} &lt;{email.from.email}&gt;
            </span>
          </div>
          <div className="subject">
            Subject: <span>{email.subject}</span>
          </div>
          <div className="short-description">{email.short_description}</div>
          <div className="date">{formatDate(email.date)}</div>
          {email.favorite && <span className="favorite">Favorite</span>}
        </div>
      </div>
    ))}
  </div>
);

export default EmailList;
