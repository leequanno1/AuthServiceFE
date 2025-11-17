import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="nf-wrapper">
      <div className="nf-content">
        <div className="nf-glitch" data-text="404">
          404
        </div>

        <h2 className="nf-title">Page Not Found</h2>
        <p className="nf-desc">
          Looks like you've wandered into uncharted territory. The page you're
          looking for doesn't exist.
        </p>

        <a href="/" className="nf-btn">
          Back to Home
        </a>
      </div>

      <div className="nf-orb nf-orb1"></div>
      <div className="nf-orb nf-orb2"></div>
    </div>
  );
};

export default NotFound;
