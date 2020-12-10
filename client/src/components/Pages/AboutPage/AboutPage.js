import React from "react";
import { Link } from "react-router-dom";
import CatDog from "../../../images/13.jpg"
import SearcImg from "../../../images/searchpet.png";
import MeetImg from "../../../images/meet.png";
import AdoptImg from "../../../images/adopt.png";
import DeleteImg from "../../../images/delete-icon-17-256.png";
// import video from "../../../videos/meeting.mp4"

import "./About.css";

const AboutPage = () => {
	return (
		<div style={{ backgroundColor:"rgba(253, 250, 253, 0.699)" }}>
			<div>
			{/* <video autoPlay muted poster={video}>
        <source src={video} type='video/mp4' style={{width: '100%', height: '100%' }}/>
      </video> */}
				<img style={{ alignSelf: 'center', width: '100%', height: '100%' }}
					src={CatDog} alt="CatDog" ></img>
			</div>
			<div className="aboutPageDiv1" >
				<h1>"WANT TO ADOPT" JOURNEY</h1>

				<section className=" sectionSearch">
						<img style={{ width: '200px', height: '150px' }}
							src={SearcImg} alt="searcImg" className="middleImg"></img>
						<h2>Search</h2>
						<p >It's easy to find a dog or cat who's right for you at a rescue group. </p>
				</section>

				<section className=" sectionMeet" >
					{/* <Link to="/adopt" style={{ textDecoration: 'none' }}> */}
						<img style={{ width: '200px', height: '150px' }}
							src={MeetImg} alt="MeetImg" className="middleImg"></img>
						<h2>Meet</h2>
						<p> Once you find a pet, click "learn more about me" to get contact info for their rescue.
					Contact them to learn more about how to meet and adopt the pet.</p>
					{/* </Link> */}
				</section>

				<section className=" sectionAdopt">
					{/* <Link to="/adopt" style={{ textDecoration: 'none' }}> */}
						<img style={{ width: '200px', height: '150px' }}
							src={AdoptImg} alt="AdoptImg" className="middleImg"></img>
						<h2>Adopt</h2>
						<p> The rescue will walk you through their adoption process.
					Prepare your home for the arrival of your dog or cat to help them adjust to their new family. </p>
					{/* </Link> */}
				</section>

				<Link to="/adopt" className="site-btn1">
					Want To Adopt
                  </Link>
			</div>

			<div className="aboutPageDiv2">
				<h1> "ADOPT MY PET" JOURNEY </h1>

				<section className=" sectionShare">
					{/* <Link to="/findhomepage" style={{ textDecoration: 'none' }}> */}
						<img style={{ width: '200px', height: '150px' }}
							src={SearcImg} alt="searcImg" className="middleImg"></img>
						<h2>Share</h2>
						<p >It's easy to sharing your dog or cat's information thanks to petAdopt web page. </p>
						{/* </Link> */}
				</section>

				<section className=" sectionMeet2" >
					{/* <Link to="/findhome" style={{ textDecoration: 'none' }}> */}
						<img style={{ width: '200px', height: '150px' }}
							src={MeetImg} alt="MeetImg" className="middleImg"></img>
						<h2>Meet</h2>
						<p> The person who wants to adopt your pet or the pet you find on the street will make an appointment to meet you.
		If you find that person reliable at the end of the meeting, you can give your animal to its new family.</p>
		{/* </Link> */}
				</section>

				<section className=" sectionDelete" >
					{/* <Link to="/findhome" style={{ textDecoration: 'none' }}> */}
						<img style={{ width: '200px', height: '150px' }}
							src={DeleteImg} alt="DeleteImg" className="middleImg"></img>
						<h2>Delete</h2>
						<p> And the last step! You should delete your announcement from the web page.</p>
						{/* </Link> */}
				</section>

				<Link to="/findhome" className="site-btn1">
					Adopt My Pet
                  </Link>
			</div>

		</div>



	);
};


export default AboutPage;





