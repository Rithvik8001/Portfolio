

interface EmailTemplateProps {
      name: string;
      email: string;
      message: string;
  }
  
  export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    message,
    email,
  }) => (
    <div>
      <h1>New message from {name}</h1>
      <h3>Email: {email}</h3>
      <hr />
      <h2>Message:</h2>
      <h3>{message}</h3>
    </div>
  );
  