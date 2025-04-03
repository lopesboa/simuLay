import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Section,
	Text,
} from "@react-email/components";

interface VerifyIdentityEmailProps {
	validationCode?: string;
}

const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : "";

export const VerifyIdentityEmail = ({
	validationCode,
}: VerifyIdentityEmailProps) => (
	<Html>
		<Head />
		<Body style={main}>
			<Container style={container}>
				{/* <Img */}
				{/* 	src={`${baseUrl}/static/plaid-logo.png`} */}
				{/* 	width="212" */}
				{/* 	height="88" */}
				{/* 	alt="Plaid" */}
				{/* 	style={logo} */}
				{/* /> */}
				<Text style={tertiary}>Verify Your Identity</Text>
				<Heading style={secondary}>
					Enter the following code to finish verifying your identity.
				</Heading>
				<Section style={codeContainer}>
					<Text className="text-black text-[14px] leading-[24px]">
						Or copy and paste this URL into your browser:{" "}
						<Link href={validationCode} className="text-blue-600 no-underline">
							Verify Your Email
						</Link>
					</Text>
				</Section>
				<Text style={paragraph}>Not expecting this email?</Text>
				<Text style={paragraph}>
					Contact{" "}
					<Link href="mailto:simulay@bakongostudio.com.br" style={link}>
						simulay@bakongostudio.com.br
					</Link>{" "}
					if you did not request account verification.
				</Text>
			</Container>
		</Body>
	</Html>
);

VerifyIdentityEmail.PreviewProps = {
	validationCode: "144833",
} as VerifyIdentityEmailProps;

export default VerifyIdentityEmail;

const main = {
	backgroundColor: "#ffffff",
	fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const container = {
	backgroundColor: "#ffffff",
	border: "1px solid #eee",
	borderRadius: "5px",
	boxShadow: "0 5px 10px rgba(20,50,70,.2)",
	marginTop: "20px",
	maxWidth: "360px",
	margin: "0 auto",
	padding: "68px 0 130px",
};

const logo = {
	margin: "0 auto",
};

const tertiary = {
	color: "#0a85ea",
	fontSize: "11px",
	fontWeight: 700,
	fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
	height: "16px",
	letterSpacing: "0",
	lineHeight: "16px",
	margin: "16px 8px 8px 8px",
	textTransform: "uppercase" as const,
	textAlign: "center" as const,
};

const secondary = {
	color: "#000",
	display: "inline-block",
	fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
	fontSize: "20px",
	fontWeight: 500,
	lineHeight: "24px",
	marginBottom: "0",
	marginTop: "0",
	textAlign: "center" as const,
};

const codeContainer = {
	background: "rgba(0,0,0,.05)",
	borderRadius: "4px",
	margin: "16px auto 14px",
	verticalAlign: "middle",
	width: "280px",
};

const code = {
	color: "#000",
	fontFamily: "HelveticaNeue-Bold",
	fontSize: "32px",
	fontWeight: 700,
	letterSpacing: "6px",
	lineHeight: "40px",
	paddingBottom: "8px",
	paddingTop: "8px",
	margin: "0 auto",
	display: "block",
	textAlign: "center" as const,
};

const paragraph = {
	color: "#444",
	fontSize: "15px",
	fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
	letterSpacing: "0",
	lineHeight: "23px",
	padding: "0 40px",
	margin: "0",
	textAlign: "center" as const,
};

const link = {
	color: "#444",
	textDecoration: "underline",
};

const footer = {
	color: "#000",
	fontSize: "12px",
	fontWeight: 800,
	letterSpacing: "0",
	lineHeight: "23px",
	margin: "0",
	marginTop: "20px",
	fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
	textAlign: "center" as const,
	textTransform: "uppercase" as const,
};

export function reactVerifyEmail(pros: VerifyIdentityEmailProps) {
	return <VerifyIdentityEmail {...pros} />;
}
