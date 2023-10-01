import React from "react";

const HeroSection = ({ name, description }) => {
	return (
		<>
			<section>
				<h1 className="text-7xl text-white/25 font-bold font-poppins animate-pulse">
					{name}
				</h1>
				<span className="absolute text-3xl text-white font-bold font-poppins translate-x-16 -translate-y-8">
					My name is..
				</span>
				<p className="text-white font-poppins text-3xl font-extralight my-8 leading-normal">
					{description}
				</p>
				<a
					href="#about"
					className="text-white underline font-poppins font-extralight text-lg"
				>
					More about me &gt;
				</a>
			</section>
			;
		</>
	);
};
export default HeroSection;
