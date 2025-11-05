import Link from 'next/link';
import { getPosts, getProjects, getAbout } from '@/sanity/lib/fetchData'

export default async function Home() {
  const [posts, projects, about] = await Promise.all([
    getPosts(),
    getProjects(),
    getAbout(),
  ])
  return (

    <div id="main" className="relative">
      <div
        x-data="{
    triggerNavItem(id) {
        $scroll(id)
    },
    triggerMobileNavItem(id) {
        mobileMenu = false;
        this.triggerNavItem(id)
    }
}"
      >


        {/* Navbar */}
        <header className="absolute top-0 left-0 w-full z-50 py-5">
          <div className="container mx-auto flex items-center justify-between px-6">
            {/* Logo */}
            <Link href="/">
              <img src="/assets/img/logo.svg" alt="Logo" className="w-32 sm:w-40" />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {["About", "Services", "Portfolio", "Clients", "Work", "Statistics", "Blog", "Contact"].map((item, i) => (
                <div key={i} className="group relative">
                  <span className="text-white font-semibold uppercase cursor-pointer text-sm tracking-wider">
                    {item}
                  </span>
                  <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </div>
              ))}
            </nav>

            {/* Mobile Menu Icon */}
            <button className="lg:hidden text-white text-4xl">
              <i className="bx bx-menu"></i>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center bg-no-repeat h-[75vh] flex items-center justify-center"
          style={{ backgroundImage: "url('/assets/img/bg-hero.jpg')" }}
        >
          {/* Purple overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4a379a]/95 to-[#7a63d9]/95 z-10"></div>

          {/* Hero Content */}
          <div className="relative z-20 container mx-auto flex flex-col lg:flex-row items-center justify-center px-6 pt-24 sm:pt-40 lg:pt-48">
            {/* Profile Image */}
            <div className="rounded-full border-8 border-[#583cc9] shadow-2xl">
              <img
                src="/assets/img/blog-author.jpg"
                alt="Author"
                className="h-48 w-48 sm:h-56 sm:w-56 rounded-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="mt-8 lg:mt-0 lg:ml-10 text-center lg:text-left">
              {/* <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold">
                Hello I’m Christy Smith!
              </h1> */}
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold">
                {posts.map((post) => (
                  <div key={post.slug.current}>
                    <h2>{post.title}</h2>
                  </div>
                ))}
              </h1>

              {/* Connect Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="uppercase text-white text-lg tracking-widest">
                    {projects.map((project) => (
                      <div key={project.slug.current}>
                        <p>{project.description}</p>
                      </div>
                    ))}
                  </div>
                  <i className="bx bx-chevron-right text-yellow-400 text-3xl"></i>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-4">
                  {[
                    "bxl-facebook-square",
                    "bxl-twitter",
                    "bxl-dribbble",
                    "bxl-linkedin",
                    "bxl-instagram",
                  ].map((icon, i) => (
                    <Link
                      key={i}
                      href="/"
                      className="text-2xl text-white hover:text-yellow-400 transition-colors duration-300"
                    >
                      <i className={`bx ${icon}`}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>

          {/* <div className="bg-[#f6f4fc] py-24 px-6" id="about">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-20">
             
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-[#5b3fd0] text-5xl sm:text-6xl font-extrabold tracking-wide uppercase">
                  Who am I?
                </h2>

                <h4 className="mt-5 text-2xl sm:text-3xl text-[#222] font-medium">
                  I’m <span className="font-semibold">Christy Smith</span>, a{" "}
                  <span className="font-semibold">Web Designer & Photographer</span>
                </h4>

                <p className="mt-6 text-[#666] leading-relaxed text-[17px] max-w-xl mx-auto lg:mx-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3">
                  <div className="flex items-center">
                    <p className="uppercase text-[15px] font-semibold text-gray-500 tracking-wider">
                      Connect with me
                    </p>
                    <i className="bx bx-chevron-right text-[26px] text-[#5b3fd0] ml-1"></i>
                  </div>
                  <div className="flex items-center space-x-4">
                    {["facebook-square", "twitter", "dribbble", "linkedin", "instagram"].map((icon, i) => (
                      <Link
                        key={i}
                        href="/"
                        className="text-[22px] text-[#5b3fd0] hover:text-[#8a6ff5] transition-colors"
                      >
                        <i className={`bx bxl-${icon}`}></i>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            
              <div className="w-full lg:w-1/2 space-y-8">
                {[
                  { title: "HTML & CSS", percent: 85 },
                  { title: "Python", percent: 70 },
                  { title: "JavaScript", percent: 98 },
                  { title: "Figma", percent: 91 },
                ].map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="uppercase text-[15px] font-semibold text-gray-800">
                        {skill.title}
                      </h4>
                      <span className="text-[#5b3fd0] font-bold text-[22px]">
                        {skill.percent}%
                      </span>
                    </div>
                    <div className="relative w-full h-[8px] bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-[8px] bg-[#5b3fd0] rounded-full"
                        style={{ width: `${skill.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
          <div className="bg-[#f6f4fc] py-24 px-6" id="about">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-20">

              {/* Left section */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-[#5b3fd0] text-5xl sm:text-6xl font-extrabold tracking-wide uppercase">
                  {about?.title || "Who am I?"}
                </h2>

                <h4 className="mt-5 text-2xl sm:text-3xl text-[#222] font-medium">
                  I’m <span className="font-semibold">{about?.name || "Christy Smith"}</span>, a{" "}
                  <span className="font-semibold">{about?.role || "Web Designer & Photographer"}</span>
                </h4>

                <p className="mt-6 text-[#666] leading-relaxed text-[17px] max-w-xl mx-auto lg:mx-0">
                  {about?.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3">
                  <div className="flex items-center">
                    <p className="uppercase text-[15px] font-semibold text-gray-500 tracking-wider">
                      Connect with me
                    </p>
                    <i className="bx bx-chevron-right text-[26px] text-[#5b3fd0] ml-1"></i>
                  </div>

                  <div className="flex items-center space-x-4">
                    {(about?.socialLinks || []).map((link, i) => (
                      <Link
                        key={i}
                        href={link?.url || "/"}
                        className="text-[22px] text-[#5b3fd0] hover:text-[#8a6ff5] transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className={`bx bxl-${link?.icon || "link"}`}></i>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right section (skills) */}
              <div className="w-full lg:w-1/2 space-y-8">
                {(about?.skills || []).map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="uppercase text-[15px] font-semibold text-gray-800">
                        {skill.title}
                      </h4>
                      <span className="text-[#5b3fd0] font-bold text-[22px]">
                        {skill.percent}%
                      </span>
                    </div>
                    <div className="relative w-full h-[8px] bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-[8px] bg-[#5b3fd0] rounded-full"
                        style={{ width: `${skill.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white py-24 px-6" id="services">
            <div className="max-w-7xl mx-auto text-center">
              {/* Heading */}
              <h2 className="text-5xl sm:text-6xl font-extrabold uppercase tracking-wide text-[#5b3fd0]">
                Here’s What I’m Good At
              </h2>
              <h3 className="mt-4 text-xl sm:text-2xl text-gray-800 font-medium">
                These are the services I offer
              </h3>

              {/* Services grid */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Web Development",
                    iconBlack: "/assets/img/icon-development-black.svg",
                    iconWhite: "/assets/img/icon-development-white.svg",
                  },
                  {
                    title: "Technical Writing",
                    iconBlack: "/assets/img/icon-content-black.svg",
                    iconWhite: "/assets/img/icon-content-white.svg",
                  },
                  {
                    title: "Mobile Development",
                    iconBlack: "/assets/img/icon-mobile-black.svg",
                    iconWhite: "/assets/img/icon-mobile-white.svg",
                  },
                  {
                    title: "Email Development",
                    iconBlack: "/assets/img/icon-email-black.svg",
                    iconWhite: "/assets/img/icon-email-white.svg",
                  },
                  {
                    title: "Graphic Design",
                    iconBlack: "/assets/img/icon-design-black.svg",
                    iconWhite: "/assets/img/icon-design-white.svg",
                  },
                  {
                    title: "Web Design",
                    iconBlack: "/assets/img/icon-graphics-black.svg",
                    iconWhite: "/assets/img/icon-graphics-white.svg",
                  },
                ].map((service, i) => (
                  <div
                    key={i}
                    className={`group rounded-xl px-10 py-14 shadow-lg transition-all duration-300 ${service.active
                      ? "bg-[#5b3fd0]"
                      : "bg-white hover:bg-[#5b3fd0]"
                      }`}
                  >
                    <div className="flex justify-center">
                      <img
                        src={service.iconBlack}
                        alt={service.title}
                        className={`h-20 w-20 transition-opacity duration-300 ${service.active ? "opacity-0 absolute" : "block group-hover:hidden"
                          }`}
                      />
                      <img
                        src={service.iconWhite}
                        alt={service.title}
                        className={`h-20 w-20 transition-opacity duration-300 ${service.active ? "block" : "hidden group-hover:block"
                          }`}
                      />
                    </div>

                    <div className="mt-8">
                      <h3
                        className={`uppercase text-lg sm:text-xl font-semibold transition-colors duration-300 ${service.active
                          ? "text-[#f6d948]"
                          : "text-[#5b3fd0] group-hover:text-[#f6d948]"
                          }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`mt-3 text-sm sm:text-base transition-colors duration-300 ${service.active
                          ? "text-white"
                          : "text-gray-600 group-hover:text-white"
                          }`}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* <div className="container py-16 md:py-20" id="portfolio">
            <h2
              className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
            >
              Check out my Portfolio
            </h2>
            <h3
              className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
            >
              Here's what I have done with the past
            </h3>

            <div
              className="mx-auto grid w-full grid-cols-1 gap-8 pt-12 sm:w-3/4 md:gap-10 lg:w-full lg:grid-cols-2"
            >
              <a
                href="/"
                className="mx-auto transform transition-all hover:scale-105 md:mx-0"
              >
                <img
                  src="/assets/img/portfolio-apple.jpeg"
                  className="w-full shadow"
                  alt="portfolio image"
                />
              </a>
              <a
                href="/"
                className="mx-auto transform transition-all hover:scale-105 md:mx-0"
              >
                <img
                  src="/assets/img/portfolio-stripe.jpeg"
                  className="w-full shadow"
                  alt="portfolio image"
                />
              </a>
              <a
                href="/"
                className="mx-auto transform transition-all hover:scale-105 md:mx-0"
              >
                <img
                  src="/assets/img/portfolio-fedex.jpeg"
                  className="w-full shadow"
                  alt="portfolio image"
                />
              </a>
              <a
                href="/"
                className="mx-auto transform transition-all hover:scale-105 md:mx-0"
              >
                <img
                  src="/assets/img/portfolio-microsoft.jpeg"
                  className="w-full shadow"
                  alt="portfolio image"
                />
              </a>
            </div>
          </div> */}
          <div className="flex justify-center py-16 md:py-20 bg-white" id="portfolio">
            <div className="w-3/4">
              <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                Check Out My Portfolio
              </h2>
              <h3 className="pt-4 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                Here's what I have done with the past
              </h3>

              <div className="mx-auto grid grid-cols-1 gap-8 pt-12 md:grid-cols-2">
                <Link
                  href="/"
                  className="mx-auto transform transition-all hover:scale-105"
                >
                  <img
                    src="/assets/img/portfolio-apple.jpeg"
                    className="w-full shadow-lg rounded-lg"
                    alt="Apple project"
                  />
                </Link>

                <Link
                  href="/"
                  className="mx-auto transform transition-all hover:scale-105"
                >
                  <img
                    src="/assets/img/portfolio-stripe.jpeg"
                    className="w-full shadow-lg rounded-lg"
                    alt="Stripe project"
                  />
                </Link>

                <Link
                  href="/"
                  className="mx-auto transform transition-all hover:scale-105"
                >
                  <img
                    src="/assets/img/portfolio-fedex.jpeg"
                    className="w-full shadow-lg rounded-lg"
                    alt="FedEx project"
                  />
                </Link>

                <Link
                  href="/"
                  className="mx-auto transform transition-all hover:scale-105"
                >
                  <img
                    src="/assets/img/portfolio-microsoft.jpeg"
                    className="w-full shadow-lg rounded-lg"
                    alt="Microsoft project"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="bg-grey-50" id="clients">
            <div className="container py-16 md:py-20">
              <div className="mx-auto w-full sm:w-3/4 lg:w-full">
                <h2
                  className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
                >
                  My latest clients
                </h2>
                <div className="flex flex-wrap items-center justify-center pt-4 sm:pt-4">
                  <span className="m-8 block">
                    <img
                      src="/assets/img/logo-coca-cola.svg"
                      alt="client logo"
                      className="mx-auto block h-12 w-auto"
                    />
                  </span>
                  <span className="m-8 block">
                    <img
                      src="/assets/img/logo-apple.svg"
                      alt="client logo"
                      className="mx-auto block h-12 w-auto"
                    />
                  </span>

                  <span className="m-8 block">
                    <img
                      src="/assets/img/logo-netflix.svg"
                      alt="client logo"
                      className="mx-auto block h-12 w-auto"
                    />
                  </span>

                  <span className="m-8 block">
                    <img
                      src="/assets/img/logo-amazon.svg"
                      alt="client logo"
                      className="mx-auto block h-12 w-auto"
                    />
                  </span>

                  <span className="m-8 block">
                    <img
                      src="/assets/img/logo-stripe.svg"
                      alt="client logo"
                      className="mx-auto block h-12 w-auto"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex justify-center bg-gray-50 py-16 md:py-20" id="clients">
            <div className="w-3/4 text-center">
              <h2 className="font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                My Latest Clients
              </h2>

              <div className="flex flex-wrap items-center justify-center pt-8 sm:pt-10">
                <span className="m-8 block">
                  <img
                    src="/assets/img/logo-coca-cola.svg"
                    alt="Coca Cola"
                    className="mx-auto h-10 sm:h-12 w-auto opacity-80"
                  />
                </span>

                <span className="m-8 block">
                  <img
                    src="/assets/img/logo-apple.svg"
                    alt="Apple"
                    className="mx-auto h-10 sm:h-12 w-auto opacity-80"
                  />
                </span>

                <span className="m-8 block">
                  <img
                    src="/assets/img/logo-netflix.svg"
                    alt="Netflix"
                    className="mx-auto h-10 sm:h-12 w-auto opacity-80"
                  />
                </span>

                <span className="m-8 block">
                  <img
                    src="/assets/img/logo-amazon.svg"
                    alt="Amazon"
                    className="mx-auto h-10 sm:h-12 w-auto opacity-80"
                  />
                </span>

                <span className="m-8 block">
                  <img
                    src="/assets/img/logo-stripe.svg"
                    alt="Stripe"
                    className="mx-auto h-10 sm:h-12 w-auto opacity-80"
                  />
                </span>
              </div>
            </div>
          </div>

          {/* <div className="container py-16 md:py-20" id="work">
            <h2
              className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
            >
              My work experience
            </h2>
            <h3
              className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
            >
              Here's what I did before freelancing
            </h3>

            <div className="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3">
              <span
                className="left-2/5 absolute inset-y-0 ml-10 hidden w-0.5 bg-grey-40 md:block"
              ></span>

              <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
                <div className="md:w-2/5">
                  <div className="flex justify-center md:justify-start">
                    <span className="shrink-0">
                      <img
                        src="/assets/img/logo-spotify.svg"
                        className="h-auto w-32"
                        alt="company logo"
                      />
                    </span>
                    <div className="relative ml-3 hidden w-full md:block">
                      <span
                        className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-grey-70"
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5">
                  <div className="relative flex md:pl-18">
                    <span
                      className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"
                    ></span>

                    <div className="mt-1 flex">
                      <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
                      <div className="md:-mt-1 md:pl-8">
                        <span className="block font-body font-bold text-grey-40"
                        >Apr 2015 - Mar 2018</span
                        >
                        <span
                          className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                        >Frontend Developer</span
                        >
                        <div className="pt-2">
                          <span className="block font-body text-black"
                          >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vestibulum mattis felis vitae risus pulvinar tincidunt. Nam ac
                            venenatis enim.</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
                <div className="md:w-2/5">
                  <div className="flex justify-center md:justify-start">
                    <span className="shrink-0">
                      <img
                        src="/assets/img/logo-microsoft.svg"
                        className="h-auto w-32"
                        alt="company logo"
                      />
                    </span>
                    <div className="relative ml-3 hidden w-full md:block">
                      <span
                        className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-grey-70"
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5">
                  <div className="relative flex md:pl-18">
                    <span
                      className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"
                    ></span>

                    <div className="mt-1 flex">
                      <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
                      <div className="md:-mt-1 md:pl-8">
                        <span className="block font-body font-bold text-grey-40"
                        >Mar 2018 - September 2019</span
                        >
                        <span
                          className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                        >Software Engineer</span
                        >
                        <div className="pt-2">
                          <span className="block font-body text-black"
                          >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vestibulum mattis felis vitae risus pulvinar tincidunt. Nam ac
                            venenatis enim.</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
                <div className="md:w-2/5">
                  <div className="flex justify-center md:justify-start">
                    <span className="shrink-0">
                      <img
                        src="/assets/img/logo-fedex.svg"
                        className="h-auto w-32"
                        alt="company logo"
                      />
                    </span>
                    <div className="relative ml-3 hidden w-full md:block">
                      <span
                        className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-grey-70"
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5">
                  <div className="relative flex md:pl-18">
                    <span
                      className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"
                    ></span>

                    <div className="mt-1 flex">
                      <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
                      <div className="md:-mt-1 md:pl-8">
                        <span className="block font-body font-bold text-grey-40"
                        >October 2019 - Feb 2021</span
                        >
                        <span
                          className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                        >DevOps Engineer</span
                        >
                        <div className="pt-2">
                          <span className="block font-body text-black"
                          >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vestibulum mattis felis vitae risus pulvinar tincidunt. Nam ac
                            venenatis enim.</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex justify-center py-16 md:py-20 bg-white" id="work">
            <div className="w-[90%] md:w-3/4">
              {/* Header */}
              <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                My Work Experience
              </h2>
              <h3 className="pt-4 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                Here's what I did before freelancing
              </h3>

              {/* Timeline */}
              <div className="relative mt-16">
                {/* Vertical Line (hidden on mobile) */}
                <div className="absolute left-[45%] top-0 h-full w-[2px] bg-gray-300 hidden md:block"></div>

                {/* ---- Item 1 ---- */}
                <div className="flex flex-col md:flex-row items-start mb-14">
                  {/* Left Side */}
                  <div className="md:w-[45%] w-full flex justify-center md:justify-end items-center mb-6 md:mb-0">
                    <img src="/assets/img/logo-spotify.svg" alt="Spotify" className="w-28 opacity-80" />
                    <div className="hidden md:block ml-3 h-[1px] w-10 bg-gray-400"></div>
                  </div>

                  {/* Right Side */}
                  <div className="md:w-[55%] w-full md:pl-16 text-center md:text-left">
                    <div className="relative">
                      {/* Timeline Dot */}
                      <div className="hidden md:block absolute -left-[56px] top-1 bg-white border-2 border-gray-400 rounded-full w-4 h-4"></div>
                      <p className="font-body font-bold text-gray-400">Apr 2015 - Mar 2018</p>
                      <h4 className="pt-2 font-header text-xl font-bold uppercase text-primary">Frontend Developer</h4>
                      <p className="pt-2 font-body text-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis felis vitae risus pulvinar tincidunt. Nam ac venenatis enim.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ---- Item 2 ---- */}
                <div className="flex flex-col md:flex-row items-start mb-14">
                  <div className="md:w-[45%] w-full flex justify-center md:justify-end items-center mb-6 md:mb-0">
                    <img src="/assets/img/logo-microsoft.svg" alt="Microsoft" className="w-28 opacity-80" />
                    <div className="hidden md:block ml-3 h-[1px] w-10 bg-gray-400"></div>
                  </div>

                  <div className="md:w-[55%] w-full md:pl-16 text-center md:text-left">
                    <div className="relative">
                      <div className="hidden md:block absolute -left-[56px] top-1 bg-white border-2 border-gray-400 rounded-full w-4 h-4"></div>
                      <p className="font-body font-bold text-gray-400">Mar 2018 - Sep 2019</p>
                      <h4 className="pt-2 font-header text-xl font-bold uppercase text-primary">Software Engineer</h4>
                      <p className="pt-2 font-body text-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis felis vitae risus pulvinar tincidunt. Nam ac venenatis enim.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ---- Item 3 ---- */}
                <div className="flex flex-col md:flex-row items-start">
                  <div className="md:w-[45%] w-full flex justify-center md:justify-end items-center mb-6 md:mb-0">
                    <img src="/assets/img/logo-fedex.svg" alt="FedEx" className="w-28 opacity-80" />
                    <div className="hidden md:block ml-3 h-[1px] w-10 bg-gray-400"></div>
                  </div>

                  <div className="md:w-[55%] w-full md:pl-16 text-center md:text-left">
                    <div className="relative">
                      <div className="hidden md:block absolute -left-[56px] top-1 bg-white border-2 border-gray-400 rounded-full w-4 h-4"></div>
                      <p className="font-body font-bold text-gray-400">Oct 2019 - Feb 2021</p>
                      <h4 className="pt-2 font-header text-xl font-bold uppercase text-primary">DevOps Engineer</h4>
                      <p className="pt-2 font-body text-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis felis vitae risus pulvinar tincidunt. Nam ac venenatis enim.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div
            className="bg-cover bg-top bg-no-repeat pb-16 md:py-16 lg:py-24"
            style={{ backgroundImage: 'url(/assets/img/experience-figure.png)' }}
            id="statistics"
          >
            <div className="container">
              <div
                className="mx-auto w-5/6 bg-white py-16 shadow md:w-11/12 lg:py-20 xl:py-24 2xl:w-full"
              >
                <div className="grid grid-cols-2 gap-5 md:gap-8 xl:grid-cols-4 xl:gap-5">
                  <div
                    className="flex flex-col items-center justify-center text-center md:flex-row md:text-left"
                  >
                    <div>
                      <img
                        src="/assets/img/icon-project.svg"
                        className="mx-auto h-12 w-auto md:h-20"
                        alt="icon project"
                      />
                    </div>
                    <div className="pt-5 md:pl-5 md:pt-0">
                      <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                        12
                      </h1>
                      <h4
                        className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl"
                      >
                        Finished Projects
                      </h4>
                    </div>
                  </div>

                  <div
                    className="flex flex-col items-center justify-center text-center md:flex-row md:text-left"
                  >
                    <div>
                      <img
                        src="/assets/img/icon-award.svg"
                        className="mx-auto h-12 w-auto md:h-20"
                        alt="icon award"
                      />
                    </div>
                    <div className="pt-5 md:pl-5 md:pt-0">
                      <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                        3
                      </h1>
                      <h4
                        className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl"
                      >
                        Awards Won
                      </h4>
                    </div>
                  </div>

                  <div
                    className="mt-6 flex flex-col items-center justify-center text-center md:mt-10 md:flex-row md:text-left lg:mt-0"
                  >
                    <div>
                      <img
                        src="/assets/img/icon-happy.svg"
                        className="mx-auto h-12 w-auto md:h-20"
                        alt="icon happy clients"
                      />
                    </div>
                    <div className="pt-5 md:pl-5 md:pt-0">
                      <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                        8
                      </h1>
                      <h4
                        className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl"
                      >
                        Happy Clients
                      </h4>
                    </div>
                  </div>

                  <div
                    className="mt-6 flex flex-col items-center justify-center text-center md:mt-10 md:flex-row md:text-left lg:mt-0"
                  >
                    <div>
                      <img
                        src="/assets/img/icon-puzzle.svg"
                        className="mx-auto h-12 w-auto md:h-20"
                        alt="icon puzzle"
                      />
                    </div>
                    <div className="pt-5 md:pl-5 md:pt-0">
                      <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                        99
                      </h1>
                      <h4
                        className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl"
                      >
                        Bugs Fixed
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div
            id="statistics"
            className="relative bg-[#5B3FD0] pb-20 pt-24 overflow-hidden"
          >
            {/* angled white overlay top */}
            <div className="absolute top-0 left-0 w-full h-20 bg-white rotate-[-3deg] origin-top"></div>

            <div className="relative z-10 flex justify-center">
              <div className="w-[75%] bg-white py-14 shadow-lg rounded-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {/* ---- 1 ---- */}
                  <div className="flex flex-col items-center">
                    <img
                      src="/assets/img/icon-project.svg"
                      alt="Projects Icon"
                      className="h-12 md:h-16 mb-4"
                    />
                    <h1 className="font-body text-2xl md:text-4xl font-bold text-[#5B3FD0]">
                      12
                    </h1>
                    <h4 className="font-header text-gray-800 text-base md:text-lg">
                      Finished Projects
                    </h4>
                  </div>

                  {/* ---- 2 ---- */}
                  <div className="flex flex-col items-center">
                    <img
                      src="/assets/img/icon-award.svg"
                      alt="Awards Icon"
                      className="h-12 md:h-16 mb-4"
                    />
                    <h1 className="font-body text-2xl md:text-4xl font-bold text-[#5B3FD0]">
                      3
                    </h1>
                    <h4 className="font-header text-gray-800 text-base md:text-lg">
                      Awards Won
                    </h4>
                  </div>

                  {/* ---- 3 ---- */}
                  <div className="flex flex-col items-center">
                    <img
                      src="/assets/img/icon-happy.svg"
                      alt="Happy Clients Icon"
                      className="h-12 md:h-16 mb-4"
                    />
                    <h1 className="font-body text-2xl md:text-4xl font-bold text-[#5B3FD0]">
                      8
                    </h1>
                    <h4 className="font-header text-gray-800 text-base md:text-lg">
                      Happy Clients
                    </h4>
                  </div>

                  {/* ---- 4 ---- */}
                  <div className="flex flex-col items-center">
                    <img
                      src="/assets/img/icon-puzzle.svg"
                      alt="Bugs Fixed Icon"
                      className="h-12 md:h-16 mb-4"
                    />
                    <h1 className="font-body text-2xl md:text-4xl font-bold text-[#5B3FD0]">
                      99
                    </h1>
                    <h4 className="font-header text-gray-800 text-base md:text-lg">
                      Bugs Fixed
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* angled white overlay bottom */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-white rotate-[3deg] origin-bottom"></div>
          </div>

          {/* <div className="bg-grey-50" id="blog">
            <div className="container py-16 md:py-20">
              <h2
                className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
              >
                I also like to write
              </h2>
              <h4
                className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
              >
                Check out my latest posts!
              </h4>
              <div
                className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10"
              >
                <a href="/post" className="shadow">
                  <div
                    style={{ backgroundImage: 'url(/assets/img/post-01.png)' }}
                    className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
                  >
                    <span
                      className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
                    ></span>
                    <span
                      className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base"
                    >Read More</span
                    >
                  </div>
                  <div className="bg-white py-6 px-5 xl:py-8">
                    <span className="block font-body text-lg font-semibold text-black"
                    >How to become a frontend developer</span
                    >
                    <span className="block pt-2 font-body text-grey-20"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.</span
                    >
                  </div>
                </a>
                <a href="/post" className="shadow">
                  <div
                    style={{ backgroundImage: 'url(/assets/img/post-02.png)' }}
                    className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
                  >
                    <span
                      className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
                    ></span>
                    <span
                      className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base"
                    >Read More</span
                    >
                  </div>
                  <div className="bg-white py-6 px-5 xl:py-8">
                    <span className="block font-body text-lg font-semibold text-black"
                    >My personal productivity system</span
                    >
                    <span className="block pt-2 font-body text-grey-20"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.</span
                    >
                  </div>
                </a>
                <a href="/post" className="shadow">
                  <div
                    style={{ backgroundImage: 'url(/assets/img/post-03.png)' }}
                    className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
                  >
                    <span
                      className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
                    ></span>
                    <span
                      className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base"
                    >Read More</span
                    >
                  </div>
                  <div className="bg-white py-6 px-5 xl:py-8">
                    <span className="block font-body text-lg font-semibold text-black"
                    >My year in review 2020</span
                    >
                    <span className="block pt-2 font-body text-grey-20"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.</span
                    >
                  </div>
                </a>
              </div>
            </div>
          </div> */}
          <div id="blog" className="bg-[#F7F6FA] py-20">
            <div className="w-11/12 md:w-5/6 mx-auto text-center">
              {/* Section Header */}
              <h2 className="font-header text-4xl sm:text-5xl lg:text-6xl font-semibold uppercase text-primary">
                I also like to write
              </h2>
              <h4 className="pt-4 font-header text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800">
                Check out my latest posts!
              </h4>

              {/* Blog Cards Grid */}
              <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                {/* ---- Blog 1 ---- */}
                <a
                  href="/post"
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className="relative h-60 bg-cover bg-center"
                    style={{ backgroundImage: "url(/assets/img/post-01.png)" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 group-hover:opacity-50 transition-opacity"></span>
                    <span className="absolute right-4 bottom-4 border-2 border-white text-white font-body font-bold uppercase text-xs md:text-sm px-5 py-2 rounded-full tracking-wide hover:bg-white hover:text-primary transition-colors">
                      Read More
                    </span>
                  </div>
                  <div className="py-6 px-6 text-left">
                    <h3 className="font-body text-lg font-semibold text-gray-900">
                      How to become a frontend developer
                    </h3>
                    <p className="pt-2 text-gray-500 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </a>

                {/* ---- Blog 2 ---- */}
                <a
                  href="/post"
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className="relative h-60 bg-cover bg-center"
                    style={{ backgroundImage: "url(/assets/img/post-02.png)" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 group-hover:opacity-50 transition-opacity"></span>
                    <span className="absolute right-4 bottom-4 border-2 border-white text-white font-body font-bold uppercase text-xs md:text-sm px-5 py-2 rounded-full tracking-wide hover:bg-white hover:text-primary transition-colors">
                      Read More
                    </span>
                  </div>
                  <div className="py-6 px-6 text-left">
                    <h3 className="font-body text-lg font-semibold text-gray-900">
                      My personal productivity system
                    </h3>
                    <p className="pt-2 text-gray-500 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </a>

                {/* ---- Blog 3 ---- */}
                <a
                  href="/post"
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className="relative h-60 bg-cover bg-center"
                    style={{ backgroundImage: "url(/assets/img/post-03.png)" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 group-hover:opacity-50 transition-opacity"></span>
                    <span className="absolute right-4 bottom-4 border-2 border-white text-white font-body font-bold uppercase text-xs md:text-sm px-5 py-2 rounded-full tracking-wide hover:bg-white hover:text-primary transition-colors">
                      Read More
                    </span>
                  </div>
                  <div className="py-6 px-6 text-left">
                    <h3 className="font-body text-lg font-semibold text-gray-900">
                      My year in review 2020
                    </h3>
                    <p className="pt-2 text-gray-500 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* <div className="container py-16 md:py-20" id="contact">
            <h2
              className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
            >
              Here's a contact form
            </h2>
            <h4
              className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
            >
              Have Any Questions?
            </h4>
            <div className="mx-auto w-full pt-5 text-center sm:w-2/3 lg:pt-6">
              <p className="font-body text-grey-10">
                Lorem ipsum dolor sit amet consectetur adipiscing elit hendrerit
                condimentum turpis nisl sem, viverra habitasse urna ante lobortis
                fermentum accumsan. Viverra habitasse urna ante lobortis fermentum
                accumsan.
              </p>
            </div>
            <form className="mx-auto w-full pt-10 sm:w-3/4">
              <div className="flex flex-col md:flex-row">
                <input
                  className="mr-3 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:w-1/2 lg:mr-5"
                  placeholder="Name"
                  type="text"
                  id="name"
                />
                <input
                  className="mt-6 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:mt-0 md:ml-3 md:w-1/2 lg:ml-5"
                  placeholder="Email"
                  type="text"
                  id="email"
                />
              </div>
              <textarea
                className="mt-6 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:mt-8"
                placeholder="Message"
                id="message"
                cols="30"
                rows="10"
              ></textarea>
              <button
                className="mt-6 flex items-center justify-center rounded bg-primary px-8 py-3 font-header text-lg font-bold uppercase text-white hover:bg-grey-20"
              >
                Send
                <i className="bx bx-chevron-right relative -right-2 text-3xl"></i>
              </button>
            </form>
            <div className="flex flex-col pt-16 lg:flex-row">
              <div
                className="w-full border-l-2 border-t-2 border-r-2 border-b-2 border-grey-60 px-6 py-6 sm:py-8 lg:w-1/3"
              >
                <div className="flex items-center">
                  <i className="bx bx-phone text-2xl text-grey-40"></i>
                  <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                    My Phone
                  </p>
                </div>
                <p className="pt-2 text-left font-body font-bold text-primary lg:text-lg">
                  (+881) 111 222 333
                </p>
              </div>
              <div
                className="w-full border-l-2 border-t-0 border-r-2 border-b-2 border-grey-60 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2"
              >
                <div className="flex items-center">
                  <i className="bx bx-envelope text-2xl text-grey-40"></i>
                  <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                    My Email
                  </p>
                </div>
                <p className="pt-2 text-left font-body font-bold text-primary lg:text-lg">
                  name@mydomain.com
                </p>
              </div>
              <div
                className="w-full border-l-2 border-t-0 border-r-2 border-b-2 border-grey-60 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2"
              >
                <div className="flex items-center">
                  <i className="bx bx-map text-2xl text-grey-40"></i>
                  <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                    My Address
                  </p>
                </div>
                <p className="pt-2 text-left font-body font-bold text-primary lg:text-lg">
                  123 New York D Block 1100, 2011 USA
                </p>
              </div>
            </div>
          </div> */}
          <div
            id="contact"
            className="min-h-screen flex flex-col justify-center bg-white px-6 py-20 sm:px-10"
          >
            {/* Headings */}
            <h2 className="text-center font-header text-4xl sm:text-5xl lg:text-6xl font-semibold uppercase text-primary">
              Here's a contact form
            </h2>
            <h4 className="pt-4 text-center font-header text-xl sm:text-2xl lg:text-3xl font-medium text-black">
              Have Any Questions?
            </h4>
            <div className="mx-auto w-full max-w-3xl pt-5 text-center">
              <p className="font-body text-grey-10 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit hendrerit
                condimentum turpis nisl sem, viverra habitasse urna ante lobortis
                fermentum accumsan. Viverra habitasse urna ante lobortis fermentum
                accumsan.
              </p>
            </div>

            {/* Contact Form */}
            <form className="mx-auto w-full max-w-4xl pt-10">
              <div className="flex flex-col md:flex-row md:space-x-6">
                <input
                  className="w-full md:w-1/2 rounded border border-grey-50 px-4 py-3 font-body text-black"
                  placeholder="Name"
                  type="text"
                  id="name"
                />
                <input
                  className="mt-6 md:mt-0 w-full md:w-1/2 rounded border border-grey-50 px-4 py-3 font-body text-black"
                  placeholder="Email"
                  type="text"
                  id="email"
                />
              </div>
              <textarea
                className="mt-6 w-full rounded border border-grey-50 px-4 py-3 font-body text-black"
                placeholder="Message"
                id="message"
                rows="8"
              ></textarea>
              <div className="flex justify-center">
                <button className="mt-6 flex items-center justify-center rounded bg-primary px-10 py-3 font-header text-lg font-bold uppercase text-white hover:bg-grey-20 transition-colors">
                  Send
                  <i className="bx bx-chevron-right ml-1 text-3xl"></i>
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="mt-20 flex flex-col lg:flex-row border border-grey-60 divide-y lg:divide-y-0 lg:divide-x">
              <div className="flex-1 px-6 py-6 sm:py-8 text-center">
                <div className="flex justify-center items-center">
                  <i className="bx bx-phone text-2xl text-grey-40"></i>
                  <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                    My Phone
                  </p>
                </div>
                <p className="pt-2 font-body font-bold text-primary lg:text-lg">
                  (+881) 111 222 333
                </p>
              </div>
              <div className="flex-1 px-6 py-6 sm:py-8 text-center">
                <div className="flex justify-center items-center">
                  <i className="bx bx-envelope text-2xl text-grey-40"></i>
                  <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                    My Email
                  </p>
                </div>
                <p className="pt-2 font-body font-bold text-primary lg:text-lg">
                  name@mydomain.com
                </p>
              </div>
              <div className="flex-1 px-6 py-6 sm:py-8 text-center">
                <div className="flex justify-center items-center">
                  <i className="bx bx-map text-2xl text-grey-40"></i>
                  <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                    My Address
                  </p>
                </div>
                <p className="pt-2 font-body font-bold text-primary lg:text-lg">
                  123 New York D Block 1100, 2011 USA
                </p>
              </div>
            </div>
          </div>

          <div
            className="h-72 bg-cover bg-center bg-no-repeat sm:h-64 md:h-72 lg:h-96"
            style={{ backgroundImage: 'url(/assets/img/map.png)' }}
          ></div>

          <div
            className="relative bg-primary bg-cover bg-center bg-no-repeat py-16 bg-blend-multiply lg:py-24"
            style={{ backgroundImage: 'url(/assets/img/bg-cta.jpg)' }}
          >
            {/* <div className="container relative z-30">
              <h3
                className="text-center font-header text-3xl uppercase leading-tight tracking-wide text-white sm:text-4xl lg:text-5xl"
              >
                Keep <span className="font-bold">up-to-date</span> <br />
                with what I'm up to
              </h3>
              <form className="mt-6 flex flex-col justify-center sm:flex-row">
                <input
                  className="w-full rounded px-4 py-3 font-body text-black sm:w-2/5 sm:py-4 lg:w-1/3"
                  type="text"
                  id="email"
                  placeholder="Give me your Email"
                />
                <button
                  className="mt-2 rounded bg-yellow px-8 py-3 font-body text-base font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-white focus:border-transparent focus:outline-none focus:ring focus:ring-yellow sm:ml-2 sm:mt-0 sm:py-4 md:text-lg"
                >
                  Join the club
                </button>
              </form>
            </div> */}
          </div>
        </div>

        {/* <div className="bg-primary">
          <div className="container flex flex-col justify-between py-6 sm:flex-row">
            <p className="text-center font-body text-white md:text-left">
              © Copyright 2022. All right reserved, ATOM.
            </p>
            <div className="flex items-center justify-center pt-5 sm:justify-start sm:pt-0">
              <a href="/">
                <i
                  className="bx bxl-facebook-square text-2xl text-white hover:text-yellow"
                ></i>
              </a>
              <a href="/" className="pl-4">
                <i className="bx bxl-twitter text-2xl text-white hover:text-yellow"></i>
              </a>
              <a href="/" className="pl-4">
                <i className="bx bxl-dribbble text-2xl text-white hover:text-yellow"></i>
              </a>
              <a href="/" className="pl-4">
                <i className="bx bxl-linkedin text-2xl text-white hover:text-yellow"></i>
              </a>
              <a href="/" className="pl-4">
                <i className="bx bxl-instagram text-2xl text-white hover:text-yellow"></i>
              </a>
            </div>
          </div>
        </div> */}
        <footer className="bg-[#5637CD] py-4">
          <div className="container mx-auto flex flex-col items-center justify-between space-y-3 text-center text-white sm:flex-row sm:space-y-0">
            {/* Left Side — Copyright */}
            <p className="text-sm">
              © Copyright 2022. All right reserved, <span className="font-semibold">ATOM.</span>
            </p>

            {/* Right Side — Social Icons */}
            <div className="flex space-x-4 text-white text-lg">
              <a href="#" className="hover:text-[#FFD700] transition-colors duration-200">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#" className="hover:text-[#FFD700] transition-colors duration-200">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#" className="hover:text-[#FFD700] transition-colors duration-200">
                <i className="bx bxl-dribbble"></i>
              </a>
              <a href="#" className="hover:text-[#FFD700] transition-colors duration-200">
                <i className="bx bxl-linkedin"></i>
              </a>
              <a href="#" className="hover:text-[#FFD700] transition-colors duration-200">
                <i className="bx bxl-instagram"></i>
              </a>
            </div>
          </div>
        </footer>


      </div >
    </div >


  );
}
