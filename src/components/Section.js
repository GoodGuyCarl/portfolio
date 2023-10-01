import React from "react";

const Section = ({ title, children, grid }) => {
	return (
		<section id={title.toLowerCase()}>
			<h1 className="text-5xl text-white/25 font-poppins font-bold my-[80px]">
				{title}
			</h1>
			{grid ? (
				<div className="grid grid-cols-2 gap-8">{children}</div>
			) : (
				children
			)}
			{/* <div className="grid grid-cols-2 gap-8">{children}</div> */}
		</section>
	);
};

export default Section;
