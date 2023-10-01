import React from "react";

const Project = ({ title, description, image, link, complete }) => {
	return (
		<>
			<img src={image} alt="project" className="col-span-1" />
			<div className="col-span-1 flex flex-col justify-between">
				<div>
					<h1 className="text-white text-2xl font-bold font-poppins mb-6">
						{/* School Vaccination System */ title}
					</h1>
					<p className="text-white/50 text-lg leading-normal font-poppins">
						{
							/* A web-based system that tracks the vaccination
						status of students and employees within the
						school. Built in Laravel. */ description
						}
					</p>
				</div>
				{complete ? (
					<a
						href={link}
						className="text-white underline font-poppins align-bottom text-lg mt-auto"
						target="_blank"
						rel="noreferrer"
					>
						View project &gt;
					</a>
				) : (
					<p className="text-white/25 animate-pulse font-poppins align-bottom text-lg mt-auto">
						Ongoing project
					</p>
				)}
			</div>
		</>
	);
};

export default Project;
