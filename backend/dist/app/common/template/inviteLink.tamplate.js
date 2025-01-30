"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteLinkEmailTemplate = void 0;
const inviteLinkEmailTemplate = (inviteLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Invited to Join a Group</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
      color: #51545e;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4caf50;
      color: #ffffff;
      text-align: center;
      padding: 20px 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      font-size: 16px;
    }
    .content p {
      margin: 10px 0;
    }
    .button-container {
      text-align: center;
      margin: 20px 0;
    }
    .button {
      background-color: #4caf50;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 20px;
      font-size: 16px;
      border-radius: 5px;
      display: inline-block;
    }
    .button:hover {
      background-color: #45a049;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #999999;
      background-color: #f4f4f7;
    }
    .footer a {
      color: #4caf50;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>You're Invited to Join a Group</h1>
    </div>
    <div class="content">
      <p>Hi there,</p>
      <p>You have been invited to join a group by an admin. To join the group, simply click the button below:</p>
      <div class="button-container">
        <a href="${inviteLink}" class="button">Join Group</a>
      </div>
      <p>If you didn't receive this invitation or have any questions, please contact support.</p>
      <p>Thank you,<br>The App Team</p>
    </div>
    <div class="footer">
      <p>If you're having trouble clicking the button, copy and paste the link below into your web browser:</p>
      <p><a href="${inviteLink}">${inviteLink}</a></p>
    </div>
  </div>
</body>
</html>`;
exports.inviteLinkEmailTemplate = inviteLinkEmailTemplate;
