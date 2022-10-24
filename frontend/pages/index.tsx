import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
	const [stickerData, setStickerData] = useState<any>(null);
	const [coverage, setCoverage] = useState<string | number>("-");
	const [runTime, setRunTime] = useState<string | number>("-");
	const [windowDims, setWindowDims] = useState<any>([]);

	useEffect(() => {
		setWindowDims([window.innerWidth, window.innerHeight]);
		window.addEventListener(
			"resize",
			() => {
				setWindowDims([window.innerWidth, window.innerHeight]);
			},
			true
		);
	}, [setWindowDims]);

	const overlayStickers = async () => {
		// get outline path for all svg stickers
		let stickerPaths = [];
		for (let i = 1; i < 43; i++) {
			const res = await fetch(`/stickers/Sticker_${i}.svg`, {
				method: "GET"
			});
			if (res.status === 200) {
				const data = await res.text();
				// regex to get only the outline path
				let outline = data
					.split("\n")[1]
					.match(/"[^"]*"/)![0]
					.replace(/['"]+/g, "");
				// regex to get only width
				let width = data.match(/width="[0-9]+"/)![0].match(/[0-9]+/)![0];
				// regex to get only height
				let height = data.match(/height="[0-9]+"/)![0].match(/[0-9]+/)![0];
				stickerPaths.push({
					outline: outline,
					width: width,
					height: height,
					i: i
				});
			} else {
			}
		}

		const res = await fetch("/api/server", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				stickerPaths: stickerPaths,
				windowDims: windowDims
			})
		});
		if (res.status === 200) {
			const data = await res.json();
			setStickerData(data.stickers);
			setCoverage(data.coverage);
			setRunTime(data.runTime);
		} else {
		}
	};

	return (
		<div id="container">
			<Head>
				<title>Laptop Stickers</title>
				<meta
					name="description"
					content="Solesca's Junior SWE Programming Challenge"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div id="topContainer">
				<div id="scoreboard">
					<div className="scoreboardSection">
						<div id="scoreboardLogoContainer">
							<Image
								src="/scoreboard_logo.svg"
								alt="scoreboard logo"
								layout="fill"
							/>
						</div>
						<h2>Scoreboard</h2>
					</div>
					<div className="dividerLine" />
					<div className="scoreboardSection">
						<div className="resultsSection">
							<p>COVERAGE</p>
							<h2>{coverage}%</h2>
						</div>
					</div>
					<div className="dividerLine" />
					<div className="scoreboardSection">
						<div className="resultsSection">
							<p>RUN TIME</p>
							<h2>{runTime} ms</h2>
						</div>
					</div>
				</div>
				<div id="run" onClick={() => overlayStickers()}>
					<h1>Run</h1>
				</div>
			</div>
			<div id="pearBook">
				{stickerData
					? stickerData.map((sticker: any) => {
							return (
								<>
									<div
										className="sticker"
										style={{
											left: sticker.position[0],
											top: sticker.position[1],
											transform: `rotate(${sticker.rotation}deg)`,
											transformOrigin: `${sticker.size[0] / 2}px ${
												sticker.size[1] / 2
											}px`
										}}
									>
										<Image
											src={`/stickers/Sticker_${sticker.i}.svg`}
											alt="sticker1"
											width={sticker.size[0]}
											height={sticker.size[1]}
										/>
									</div>
								</>
							);
					  })
					: null}

				<div id="pearLogoContainer">
					<Image
						src="/pear_logo.svg"
						alt="pear logo"
						layout="fill"
						id="pearLogo"
						priority={true}
					/>
				</div>
			</div>
			<div id="copyright">
				© Solesca Energy Inc., {new Date().getFullYear()}. All Rights Reserved
			</div>
		</div>
	);
};

export default Home;
