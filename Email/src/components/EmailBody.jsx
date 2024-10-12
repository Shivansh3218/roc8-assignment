import React from "react";
import { formatDate } from "../utils/dateFormat";


const EmailBody = ({ email, onMarkFavorite }) => (
  <div className="email-body">
    <h2>{email.subject}</h2>
    <button onClick={() => onMarkFavorite(email.id)}>Mark as Favorite</button>
    <div dangerouslySetInnerHTML={{ __html: email.body }} />
    <div className="date">{formatDate(email.date)}</div>
  </div>
);

export default EmailBody;
