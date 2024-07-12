const AboutSection = () => (
  <section id="about">
    <div
      className="bg-home-about-image relative
         z-0  flex min-h-screen
         flex-col  items-center justify-center
         overflow-hidden bg-cover
         bg-top bg-no-repeat px-1 py-8 lg:min-h-fit lg:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="bg-gray-1 pointer-events-none absolute -z-20 h-screen w-full opacity-20" />
        <div className="text-dark-blue-100 flex flex-col gap-6 text-center lg:max-w-[450px] lg:text-left">
          <h2 className="italic">Get ready for the best year of your life!</h2>
          <div>
            <h4>
              The University of Auckland Snowsports Club is back again for
              another banging year, and it's time to lock in your membership for
              2024!
            </h4>
            <p className="mt-2">
              Whether you're new to the club or an old fart coming back for
              more, we can't wait to see your pretty face for a year of sending
              and shredding on and off the slopes!
            </p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <iframe
            className="aspect-[350/274] w-full max-w-[350px] rounded-md"
            src="https://www.youtube.com/embed/HBB9h_rBJOc?si=uyYmhlmQosbDFIB9"
            title="O Week UASC"
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
)

export default AboutSection
