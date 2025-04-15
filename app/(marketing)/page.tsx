import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	MessageSquare,
	BarChart,
	BookOpen,
	CheckCircle,
	Award,
	TrendingUp,
	ArrowRight,
} from "lucide-react";

export default function LandingPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
										Ace Your Next Interview with AI-Powered Practice
									</h1>
									<p className="max-w-[600px] text-muted-foreground md:text-xl">
										Simulay generates realistic mock interviews tailored to your
										industry, role, and experience level. Practice, receive
										feedback, and build confidence before the real thing.
									</p>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Button size="lg" asChild>
										<Link href="/sign-up">Try For Free</Link>
									</Button>
									{/* <Button variant="outline" size="lg" asChild> */}
									{/*   <Link href="#features">Learn More</Link> */}
									{/* </Button> */}
								</div>
							</div>
							<Image
								src="/images/hero-interview-preparation.jpg"
								width={550}
								height={550}
								alt="Professional using Simulay for interview preparation"
								className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
							/>
						</div>
					</div>
				</section>

				<section
					id="features"
					className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
				>
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									Powerful Interview Preparation
								</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Everything you need to prepare for your next interview,
									powered by advanced AI.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
							<Card className="bg-background">
								<CardContent className="pt-6">
									<div className="flex flex-col items-center space-y-4 text-center">
										<div className="rounded-full bg-primary/10 p-3">
											<MessageSquare className="h-6 w-6 text-primary" />
										</div>
										<h3 className="text-xl font-bold">AI-Powered Interviews</h3>
										<p className="text-muted-foreground">
											Generate realistic interview scenarios based on your
											target role, industry, and experience level.
										</p>
									</div>
								</CardContent>
							</Card>
							<Card className="bg-background">
								<CardContent className="pt-6">
									<div className="flex flex-col items-center space-y-4 text-center">
										<div className="rounded-full bg-primary/10 p-3">
											<BarChart className="h-6 w-6 text-primary" />
										</div>
										<h3 className="text-xl font-bold">Personalized Feedback</h3>
										<p className="text-muted-foreground">
											Receive detailed analysis and actionable suggestions to
											improve your interview performance.
										</p>
									</div>
								</CardContent>
							</Card>
							<Card className="bg-background">
								<CardContent className="pt-6">
									<div className="flex flex-col items-center space-y-4 text-center">
										<div className="rounded-full bg-primary/10 p-3">
											<BookOpen className="h-6 w-6 text-primary" />
										</div>
										<h3 className="text-xl font-bold">Question Bank</h3>
										<p className="text-muted-foreground">
											Access thousands of industry-specific questions and
											prepare comprehensive answers.
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				<section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="grid gap-10 lg:grid-cols-2">
							<Image
								src="/images/benefits-visualization.jpg"
								width={600}
								height={400}
								alt="Professional celebrating successful interview after using Simulay"
								className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
							/>
							<div className="flex flex-col justify-center space-y-8">
								<div>
									<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
										Why Choose Simulay?
									</h2>
									<p className="mt-2 text-muted-foreground">
										Our platform is designed to give you the edge in your job
										search.
									</p>
								</div>
								<div className="grid gap-4">
									<div className="flex items-start gap-4">
										<CheckCircle className="mt-1 h-5 w-5 text-primary" />
										<div>
											<h3 className="font-bold">
												Improved Interview Performance
											</h3>
											<p className="text-sm text-muted-foreground">
												Practice makes perfect. Regular mock interviews
												significantly increase your chances of success.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<Award className="mt-1 h-5 w-5 text-primary" />
										<div>
											<h3 className="font-bold">Increased Confidence</h3>
											<p className="text-sm text-muted-foreground">
												Face real interviews with confidence after practicing
												with our realistic AI interviewers.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<TrendingUp className="mt-1 h-5 w-5 text-primary" />
										<div>
											<h3 className="font-bold">Better Job Prospects</h3>
											<p className="text-sm text-muted-foreground">
												Stand out from other candidates with polished,
												well-prepared interview responses.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"> */}
				{/*   <div className="container px-4 md:px-6"> */}
				{/*     <div className="flex flex-col items-center justify-center space-y-4 text-center"> */}
				{/*       <div className="space-y-2"> */}
				{/*         <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2> */}
				{/*         <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"> */}
				{/*           Don't just take our word for it. Here's what people who landed their dream jobs have to say. */}
				{/*         </p> */}
				{/*       </div> */}
				{/*     </div> */}
				{/*     <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"> */}
				{/*       <Card> */}
				{/*         <CardContent className="pt-6"> */}
				{/*           <div className="flex flex-col items-center space-y-4 text-center"> */}
				{/*             <Image */}
				{/*               src="/images/testimonial-sarah.jpg" */}
				{/*               width={80} */}
				{/*               height={80} */}
				{/*               alt="Sarah Johnson" */}
				{/*               className="rounded-full object-cover h-20 w-20" */}
				{/*             /> */}
				{/*             <div> */}
				{/*               <h3 className="font-bold">Sarah Johnson</h3> */}
				{/*               <p className="text-sm text-muted-foreground">Software Engineer at Google</p> */}
				{/*             </div> */}
				{/*             <p className="text-muted-foreground"> */}
				{/*               "Simulay was a game-changer for my tech interviews. The AI asked me questions that actually came */}
				{/*               up in my Google interview!" */}
				{/*             </p> */}
				{/*           </div> */}
				{/*         </CardContent> */}
				{/*       </Card> */}
				{/*       <Card> */}
				{/*         <CardContent className="pt-6"> */}
				{/*           <div className="flex flex-col items-center space-y-4 text-center"> */}
				{/*             <Image */}
				{/*               src="/images/testimonial-michael.jpg" */}
				{/*               width={80} */}
				{/*               height={80} */}
				{/*               alt="Michael Chen" */}
				{/*               className="rounded-full object-cover h-20 w-20" */}
				{/*             /> */}
				{/*             <div> */}
				{/*               <h3 className="font-bold">Michael Chen</h3> */}
				{/*               <p className="text-sm text-muted-foreground">Product Manager at Amazon</p> */}
				{/*             </div> */}
				{/*             <p className="text-muted-foreground"> */}
				{/*               "The feedback I received helped me refine my answers and approach. I felt so much more confident */}
				{/*               in my actual interviews." */}
				{/*             </p> */}
				{/*           </div> */}
				{/*         </CardContent> */}
				{/*       </Card> */}
				{/*       <Card> */}
				{/*         <CardContent className="pt-6"> */}
				{/*           <div className="flex flex-col items-center space-y-4 text-center"> */}
				{/*             <Image */}
				{/*               src="/images/testimonial-priya.jpg" */}
				{/*               width={80} */}
				{/*               height={80} */}
				{/*               alt="Priya Patel" */}
				{/*               className="rounded-full object-cover h-20 w-20" */}
				{/*             /> */}
				{/*             <div> */}
				{/*               <h3 className="font-bold">Priya Patel</h3> */}
				{/*               <p className="text-sm text-muted-foreground">Marketing Director at Netflix</p> */}
				{/*             </div> */}
				{/*             <p className="text-muted-foreground"> */}
				{/*               "After 5 practice sessions with Simulay, I walked into my dream job interview and nailed it. Worth */}
				{/*               every penny!" */}
				{/*             </p> */}
				{/*           </div> */}
				{/*         </CardContent> */}
				{/*       </Card> */}
				{/*     </div> */}
				{/*   </div> */}
				{/* </section> */}
				{/**/}

				<section
					id="cta"
					className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
				>
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									Ready to Ace Your Next Interview?
								</h2>
								<p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-dark-300">
									Start practicing today and see the difference in your next
									interview.
								</p>
							</div>
							<div className="mx-auto w-full max-w-sm space-y-2">
								<div className="grid gap-2">
									<Button size="lg" variant="secondary" className="w-full">
										<Link href="/sign-up">Try For Free</Link>
									</Button>
									{/* <Button */}
									{/* 	size="lg" */}
									{/* 	variant="outline" */}
									{/* 	className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90" */}
									{/* > */}
									{/* 	Request a Demo */}
									{/* </Button> */}
								</div>
								<p className="text-xs dark:text-dark-300">
									No credit card required. Start for free and practice mock
									interviews.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Features Showcase */}
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="grid gap-10 lg:grid-cols-2">
							<div className="flex flex-col justify-center space-y-4">
								<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
									Advanced Technology
								</div>
								<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
									How Simulay Works
								</h2>
								<p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
									Our platform uses advanced AI to create personalized interview
									experiences that adapt to your responses in real-time.
								</p>
								<ul className="grid gap-2">
									<li className="flex items-center gap-2">
										<CheckCircle className="h-4 w-4 text-primary" />
										<span className="text-muted-foreground">
											Select your industry and target role
										</span>
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="h-4 w-4 text-primary" />
										<span className="text-muted-foreground">
											Choose interview difficulty and duration
										</span>
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="h-4 w-4 text-primary" />
										<span className="text-muted-foreground">
											Practice with realistic AI interviewer
										</span>
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="h-4 w-4 text-primary" />
										<span className="text-muted-foreground">
											Receive detailed feedback and improvement tips
										</span>
									</li>
								</ul>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Button className="gap-1" asChild>
										<Link href="/sign-up">
											Get Started <ArrowRight className="h-4 w-4" />
										</Link>
									</Button>
								</div>
							</div>
							<Image
								src="/images/simulay-interface.jpg"
								width={600}
								height={400}
								alt="Simulay platform interface showing AI interview in progress"
								className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
							/>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
