function Contact({ email, facebook, x, instagram, linkedin }) {
	return (
		<section>
			<p className="text-white/50 text-lg leading-normal font-poppins">
				Feel free to contact me through the following channels:
			</p>
			<ul className="text-white/50 text-lg leading-normal font-poppins my-8">
				{email && (
					<li>
						Email:{" "}
						<a
							href={`mailto:${email}`}
							className="text-white/25 underline"
						>
							{email}
						</a>
					</li>
				)}
				{facebook && (
					<li>
						Facebook:{" "}
						<a
							href={facebook}
							className="text-white/25 underline"
						>
							{facebook}
						</a>
					</li>
				)}
				{x && (
					<li>
						X:{" "}
						<a href={x} className="text-white/25 underline">
							{x}
						</a>
					</li>
				)}
				{instagram && (
					<li>
						Instagram:{" "}
						<a
							href={instagram}
							className="text-white/25 underline"
						>
							{instagram}
						</a>
					</li>
				)}
				{linkedin && (
					<li>
						LinkedIn:{" "}
						<a
							href={linkedin}
							className="text-white/25 underline"
						>
							{linkedin}
						</a>
					</li>
				)}
			</ul>
		</section>
	);
}

export default Contact;
