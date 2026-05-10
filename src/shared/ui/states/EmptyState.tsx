export const EmptyState = ({ text }: { text: string }) => {
  return (
    <div className="article-preview">
      <p className="text-xs-center">No {text} available.</p>
    </div>
  );
};
