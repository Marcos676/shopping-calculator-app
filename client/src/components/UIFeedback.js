export const  UIFeedback = () => {
  return (
    <>
      {/* Toast */}
      <div className="toast"></div>

      {/* Overlay */}
      <div id="overlayFeedback" className="overlay-feedback">
        <div className="icon" id="overlayIcon"></div>
        <div className="text" id="overlayText"></div>
      </div>
    </>
  );
}