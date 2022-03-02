import React from 'react'
import Header from './header'
import './homepage.scss'

const Homepage = () => (
	<>
		<Header />
		<section className='page spotlight' ng-controller='HomePageSpotlightCtrl'>
			<section className='main_container'>
				<span className='spotlight-wrapper'>

					<article className='store_main selected'>
						<section className='html5'>
						{/* inline styling just temporary */}
							<div className="html5Content" style={{textShadow: "1px 1px 3px #fff", width: "600px", marginLeft: "40vw"}}>
								<h1>Create <span className="engage" style={{color: "#0093e7"}}>Engaging</span> Apps!</h1>
								<p style={{textShadow: "rgb(209 209 209) 1px 1px 7px"}}>We're proud to introduce our new, updated <b>HTML 5</b> catalog!</p>
								<p style={{textShadow: "rgb(209 209 209) 1px 1px 7px"}}>We've been toiling away in the lab polishing, improving, and re-imagining every single widget in the catalog.</p>
								<p style={{textShadow: "rgb(209 209 209) 1px 1px 7px"}}>Best of all, we now support <b>phones</b> and <b>tablets</b> for students on the go.</p>
								<p className='button_wrap'>
									<a className='action_button' href='widgets'>Get Started</a>
								</p>
							</div>
						</section>
					</article>

				</span>
			</section>
			<div className='cycler' />
		</section>

		<section className='get_started'>
		<img style={{width: "300px", right: "calc(50% - 50vw)", marginTop: "6%", marginRight: "110px", position: "absolute"}} src="/img/social-ucf-open.png"/>

			<div className='get_started_content'>
				<h1 className='subHeader'> Materia is Open Source! </h1>
		 			<p className='desc'>
						Use Materia at your organization through UCF Open.
					</p>
				</div>

				<p className='button_wrap'>
					<a className='action_button' href='widgets'>Get Materia</a>
				</p>
		</section>

		<section className='front_bottom'>
			<section className='wrapper'>
			<div>
				<h2>Create Quickly and Easily</h2>
				<p className="front_bottom_desc">
					Materia's design philosophy is to be incredibly easy to use.
					Every step of customizing and delivering apps has been finely tuned to be as clear and simple as possible.
					Players are greeted with clean and simple interfaces.
					We aim to get out of the way so your content can engage with students as quickly and clearly as possible.
				</p>
			</div>
			<img src='/img/front2.png' alt='screen shot of creating a crossword widget'/>
				<div>
					<h2>Engage Your Students</h2>
					<p className="front_bottom_desc">
						Re-imagine your course filled with diverse and interesting experiences.
						It can bring life to content modules, practice, study activities, and even assessments.
						Engage students with game mechanics like: story-telling, competition, instant feedback, and instant reward systems.
					</p>
				</div>
				<img src='/img/front1.png' alt='screen shot of a labeling widget' />
				<div>
					<h2>Integrate with Your Course</h2>
					<p className="front_bottom_desc">
						Materia integrates into Canvas seamlessly.
						As an assignment, student's scores can automatically sync to the grade book.
						Thanks to the magic of LTI, Students are logged in automatically!
					</p>
				</div>
				<img src='/img/front3.png' alt='screen shot of a widget score page'/>
			</section>

			{/* <section className='get_started use_materia' >
				<p className='desc'>
					Use Materia at <span className='bold'>your</span> organization.
				</p>
				<p className='button_wrap'>
					<a className='action_button' href='https://ucfopen.github.io/Materia-Docs/'>
						Get Materia
						<span className='little-button-text'> (It's open source!)</span>
					</a>
				</p>
			</section> */}

			<section className='p_s'>
				<h2>Built at UCF, for Everyone</h2>
				<p>
					Materia is an open source project built by the University of Central Florida's <a href='https://cdl.ucf.edu/' target='_blank'>Center for Distributed Learning</a>.
					Our team is a truly unique group of experts working directly with faculty <b>and</b> students to build enjoyable tools for teaching and learning.
				</p>
				<p>
					We're committed to building a better tomorrow through better learning tools, so our team is constantly improving and re-inventing Materia.
					If you have an idea for a new widget or simply would like to give us feedback, we'd love to hear from you on <a href='https://github.com/ucfopen' target='_blank'>Github</a>.
				</p>
				<p className='copyright'>
					&copy; {new Date().getFullYear()} University of Central Florida
				</p>
			</section>
		</section>
	</>
)

export default Homepage
