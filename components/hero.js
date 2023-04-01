import ButtonLink from "./buttonLink";
import Chip from "./chip";
import ChevronRight from "./icons/chevronRight";
import ExternalIcon from "./icons/external";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="dark:hidden absolute -top-8 -right-[21rem] lg:right-[27%] bg-purple-40 w-72 h-96 rounded-full -rotate-[60deg] blur-3xl" />
      <div className="dark:hidden absolute top-40 -right-[21rem] lg:right-[27%] bg-[#FFF0C8] w-72 h-96 rounded-full -rotate-[60deg] blur-3xl" />
      <div className="dark:hidden absolute top-96 -right-[21rem] lg:right-[27%] bg-purple-20 w-72 h-96 rounded-full -rotate-[60deg] blur-3xl" />
      <div className="lg:bg-gradient-to-r from-transparent from-60% to-purple-100 to-60%">
        <div className="flex flex-col lg:items-stretch lg:flex-row container mx-auto px-4">
          <div className="relative lg:w-3/5 py-32">
            <a href="#">
              <Chip>
                <span className="font-medium mr-1">New release!</span> Grain
                v0.6 - Emmer{" "}
                <ExternalIcon className="text-gray-60 w-3 h-3 ml-1.5" />
              </Chip>
            </a>
            <h1 className="text-5xl lg:text-6xl max-w-[42rem] font-semibold text-gray-90 dark:text-purple-10 leading-[1.125] mt-6">
              An effortless programming language for WebAssembly
            </h1>
            <p className="w-fit max-w-[32rem] text-gray-60 dark:text-gray-variant-50 text-lg mt-6 mb-12 w-7/12">
              Designed to be a practical functional language, Grain makes
              WebAssembly simple for the world's developers solving everyday
              problems.
            </p>
            <ButtonLink href="/docs">
              Get started <ChevronRight className="h-3.5 text-white ml-1.5" />
            </ButtonLink>
            <div className="absolute hidden lg:block top-0 right-0 bg-purple-80 w-20 h-full [clip-path:polygon(0%_100%,101%_0%,101%_100%)]" />
            <div className="absolute hidden lg:block top-0 right-0 bg-purple-90 w-10 h-full [clip-path:polygon(0%_100%,101%_0%,101%_100%)]" />
          </div>
          <div className="lg:w-2/5 h-96 lg:h-auto bg-purple-100 z-10"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
