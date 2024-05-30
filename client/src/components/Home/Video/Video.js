export const Video = () => {
  return (
    <div className="overflow-hidden pb-[56.25%] relative h-0">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/i5v76hWuUGs`}
        allowFullScreen
        title="Youtube video"
        className="left-0 top-0 w-full h-full absolute"
      />
    </div>
  );
};
