import {
	FaGithub,
	FaTwitter,
	FaBehance,
	FaInstagram,
	FaDev,
} from "react-icons/fa";
import MainWrapper from "./MainWrapper";
import classes from "./pages.module.css";

const socialLinks = [
	{ id: "github", url: "https://github.com/mohitdevelops", icon: <FaGithub /> },
	{
		id: "twitter",
		url: "https://twitter.com/mohitdevelops",
		icon: <FaTwitter />,
	},
	{
		id: "behance",
		url: "https://www.behance.net/mohitcreates",
		icon: <FaBehance />,
	},
	{ id: "dev", url: "https://dev.to/mohitdevelops", icon: <FaDev /> },
	{
		id: "instagram",
		url: "https://www.instagram.com/sketch_stuffs/",
		icon: <FaInstagram />,
	},
];

export default function Footer() {
	return (
		<footer className={classes.footer__wrap}>
			<MainWrapper>
				<div className={classes.footer__inner}>
					<div className={classes.left}>
						<p>
							Designed and Developed by{" "}
							<a href={socialLinks[0].url}>@mohitdevelops</a>
						</p>
					</div>					
					<ul className={classes.social_links}>
						{socialLinks

							?.map((el) => {
								return (
									<li key={el.id}>
										<a href={el.url} target="_blank">
											{el.icon}
										</a>
									</li>
								);
							})}
					</ul>
				</div>
			</MainWrapper>
		</footer>
	);
}
