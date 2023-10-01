import { Component } from "react";
import hrmoms from "../assets/hrmoms-sample-pic.png";
import HeroSection from "../components/HeroSection";
import Section from "../components/Section";
import Project from "../components/Project";
import Contact from "../components/Contact";

class Home extends Component {
	render() {
		return (
			<>
				<HeroSection
					name="Carl Sanguyo"
					description="I am an aspiring full stack web developer based in the
					Philippines."
				/>
				<Section title="PROJECTS" grid>
					<Project
						link="https://github.com/GoodGuyCarl/School/tree/9d15bcb7b2b190a3d786c3c330d46decc99a3e30/oceans-of-knowledge"
						image="https://dummyimage.com/400x225/000/fff.png&text=No+image+found"
						title="School Vaccination System"
						description="A web-based system that tracks the vaccination
						status of students and employees within the
						school. Built in Laravel."
						complete
					/>
					<Project
						complete={false}
						image={hrmoms}
						title="Employee Management System"
						description="A web-based system that easily
						manages employee data built for the
						HRMO in the municipality of Science
						City of Muñoz."
					/>
				</Section>
				<Section id="about" title="ABOUT" grid={false}>
					<p className="text-white/50 text-lg leading-normal font-poppins">
						Hi there! My name is Carl Sanguyo and I'm a 4th
						year Information Technology student majoring in
						Web Development at Central Luzon State University.
						I'm passionate about creating beautiful and
						functional websites and applications using the
						latest technologies.
					</p>
					<p className="text-white/50 text-lg leading-normal font-poppins my-8">
						When I'm not coding, you can usually find me
						playing video games or exploring the great
						outdoors. Thanks for visiting my website, and feel
						free to get in touch if you have any questions or
						would like to work together!
					</p>
				</Section>
				<Section title="CONTACT" grid={false}>
					<Contact
						email="sanguyocarl@gmail.com"
						facebook="https://www.facebook.com/sanguyocarl/"
						x="https://www.x.com/sanguyocarl/"
						instagram="https://www.instagram.com/carlsanguyo/"
						linkedin="https://ph.linkedin.com/in/carl-sanguyo-95b871238"
					/>
				</Section>
			</>
		);
	}
}

export default Home;
