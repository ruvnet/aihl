export const SponsorSection = () => {
  const sponsors = [
    "OpenAI", "Google Cloud", "Microsoft Azure", "AWS", "NVIDIA", "IBM Watson"
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Powered by Industry Leaders</h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {sponsor}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};