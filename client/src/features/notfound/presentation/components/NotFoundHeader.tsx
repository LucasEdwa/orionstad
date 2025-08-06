export const NotFoundHeader = () => {
  return (
    <>
      {/* Animated 404 with cleaning theme */}
      <div className="mb-8">
        <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text mb-4 animate-pulse">
          404
        </div>
        <div className="text-6xl mb-4 animate-bounce">
          🧹
        </div>
      </div>

      {/* Main content */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! This page got swept away
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
          Looks like this page needs some cleaning up! Don't worry, we're excellent at finding 
          what's missing and putting everything back in its right place.
        </p>
      </div>
    </>
  );
};
