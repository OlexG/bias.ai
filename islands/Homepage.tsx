const Homepage = () => {
  return (
    <div>
      <img
        className="-z-10 fixed inset-0 w-full h-full object-cover"
        src="bg.png"
        alt="bg"
      />
      <div className="flexible flex flex-col items-center justify-center min-h-screen py-2">
        <div className="mb-10 rounded-2xl flex relative text-center bg-white bg-opacity-80 shadow-2xl p-12 inline-block border border-cyan-500">
          <h1 className="text-6xl font-bold text-red-400 pb-8">
            welcome to <span className="text-blue-600">bias.ai</span>
          </h1>
          <p className="text-2xl text-red-800">
            the platform to make your AI models bias-free
          </p>
        </div>
        <a
          href="#info"
          className="transition duration-300 ease-in-out flex flex-row items-center justify-center mb-24 pl-5 pr-2 py-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-900 g-white bg-opacity-80 shadow-2xl  hover:border-blue-900 z-10"
        >
          About Us
          <span
            className="animate-bounce h-6 w-6 mt-1 ml-2 font-bold text-white"
          >
            ↓
          </span>
        </a>
      </div>
      <div id="info" className="z-10 py-16 px-4 w-3/5 mx-auto mb-40">
        <div className="panel w-full bg-white shadow-md p-8 mb-8 rounded-lg mr-4 border border-cyan-500">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">
            About Us
          </h2>
          <p className="text-gray-700">
            At bias.ai, our goal is to ensure the development of socially responsible AI models. We are dedicated to guiding you through the entire process, from training to creating and testing your AI model, with a strong focus on addressing bias.
            With the rapid advancement of artificial intelligence, it has become crucial to consider the potential biases that can be embedded in these models. We understand the significance of mitigating bias in AI, as it can have far-reaching implications across various domains such as finance, healthcare, and criminal justice.
          </p>
        </div>
        <div className="flex justify-between px-28">
          <a
            href="/upload"
            className="panel bg-white shadow-md p-8 rounded-lg w-1/2 mr-4 border border-cyan-500"
          >
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-blue-600">
                Upload Panel
              </h2>
              <p className="text-gray-700">
                Our platform allows you to upload your AI model and test it for
                bias. We will provide you with a report that will help you
                understand the bias in your model.
              </p>
            </div>
          </a>
          <a
            href="/analyze"
            className="panel bg-white shadow-md p-8 rounded-lg w-1/2 ml-4 border border-cyan-500"
          >
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-blue-600">
                Analyze Panel
              </h2>
              <p className="text-gray-700">
                Finished training your AI model? Upload it to our platform and
                we will provide you with an accurate report that will help you understand
                the bias your model may have.
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
