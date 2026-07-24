function Newsletter() {
  return (
    <section className="bg-blue-600 py-20">

      <div className="max-w-4xl mx-auto text-center px-8">

        <h1 className="text-4xl text-white font-bold">
          Subscribe for Latest Jobs
        </h1>

        <p className="text-white mt-4">
          Get notified whenever a new job is posted.
        </p>

        <div className="flex mt-10">

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-4 rounded-l-xl outline-none"
          />

          <button className="bg-black text-white px-8 rounded-r-xl">
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;