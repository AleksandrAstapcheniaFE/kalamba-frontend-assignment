export const ErrorState = ({ error = 'Unable to load. Please try again.' }: { error?: string }) => {
  return (
    <div className="article-page">
      <div className="container">
        <p className="text-xs-center text-danger" role="alert">
          {error}
        </p>
      </div>
    </div>
  );
};
