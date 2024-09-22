export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};

// ---Yeh line jo theFunction pass kiya gaya hai usko execute karta hai aur req, res, aur next parameters pass karta hai.

// ---Promise.resolve ensure karta hai ki agar theFunction ek promise return kare, to hum usko resolve ya reject kar sakein.

// ---.catch(next) ka matlab hai ki agar koi error throw hoti hai, to wo next function ko pass kar di jati hai. Express.js mein next function errors ko handle karta hai.
