import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import video from "../assets/videos/lets-talk.mp4";

const initialMessage = {
	userName: "",
	email: "",
	phone: "",
	location: "",
	plan: "",
	content: "",
};

const GetInTouch = () => {
	const [sendMessage, setSendMessage] = useState(initialMessage);

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const name = event.target.name;
		setSendMessage({
			...sendMessage,
			[name]: event.target.value,
		});
	};

	const onSubmitMessage = async (event: React.FormEvent) => {
		event.preventDefault();

		const templateParams = {
			from_name: sendMessage.userName
				.trim()
				.replace(/\b\w/g, (char) => char.toUpperCase()),
			from_email: sendMessage.email,
			to_name: "Coderammer Team",
			message: `
<div style="font-family: Arial, sans-serif; padding: 16px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0;">
  <h2 style="color: #333; font-size: 20px; margin-bottom: 12px;">📩 New Contact Message</h2>
  <table style="width: 100%; font-size: 15px; color: #444;">
    <tr>
      <td style="padding: 6px 0;"><strong>Name:</strong></td>
      <td style="padding: 6px 0; text-transform: capitalize;">${sendMessage.userName}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0;"><strong>Email:</strong></td>
      <td style="padding: 6px 0;">${sendMessage.email}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0;"><strong>Phone:</strong></td>
      <td style="padding: 6px 0;">${sendMessage.phone}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0;"><strong>Location:</strong></td>
      <td style="padding: 6px 0;">${sendMessage.location}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0;"><strong>Selected Plan:</strong></td>
      <td style="padding: 6px 0; color:#9A9BED; text-transform: capitalize; font-weight: bold;">${sendMessage.plan}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0; vertical-align: top;"><strong>Message:</strong></td>
      <td style="padding: 6px 0; white-space: pre-line ;">${sendMessage.content}</td>
    </tr>
  </table>
</div>
`,
		};

		try {
			const response = await emailjs.send(
				"service_x56l1dr", // Replace with your actual service ID
				"template_wkjkepm", // Replace with your actual template ID
				templateParams,
				"RigJPoeEWBSkEMcIt" // Replace with your actual public key
			);

			if (response.status === 200) {
				setSendMessage(initialMessage);
				toast.success("Message sent successfully!");
			} else {
				toast.error("Something went wrong. Please try again.");
			}
		} catch (error) {
			console.error("EmailJS Error:", error);
			toast.error("Failed to send message.");
		}
	};

	return (
		<>
			<div className="relative">
				<video
					autoPlay
					loop
					muted
					playsInline
					className="absolute object-cover w-full h-full"
					width={500}
					height={500}
				>
					<source src={video} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<div className="relative bg-gray-900 bg-opacity-70">
					<svg
						className="absolute inset-x-0 bottom-0 text-white"
						viewBox="0 0 1160 163"
					>
						<path
							fill="currentColor"
							d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
						/>
					</svg>
					<div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
						<div className="flex flex-col items-center justify-between xl:flex-row">
							<div
								className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12"
								data-aos="fade-up"
								data-aos-duration="1500"
							>
								<h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
									GET IN TOUCH WITH US
								</h2>
								<p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
									If you have any query regarding our service or any dispute or
									any service improvement feedback, please feel free to share it
									with us.
								</p>
							</div>
							<div className="w-full max-w-xl xl:px-8 xl:w-5/12">
								<div className="bg-white rounded shadow-2xl p-7 sm:p-10">
									<h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
										Send us a message
									</h3>
									<form onSubmit={onSubmitMessage}>
										<div className="mb-1 sm:mb-2">
											<label
												htmlFor="name"
												className="inline-block mb-1 font-medium"
											>
												Name
											</label>
											<input
												placeholder="Enter your name"
												required
												type="text"
												name="userName"
												className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
												value={sendMessage.userName}
												onChange={handleChange}
											/>
										</div>

										<div className="mb-1 sm:mb-2">
											<label
												htmlFor="email"
												className="inline-block mb-1 font-medium"
											>
												Email
											</label>
											<input
												placeholder="demo@gmail.com"
												required
												type="email"
												name="email"
												className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
												value={sendMessage.email}
												onChange={handleChange}
											/>
										</div>

										<div className="mb-1 sm:mb-2">
											<label
												htmlFor="mobile"
												className="inline-block mb-1 font-medium"
											>
												Mobile
											</label>
											<input
												placeholder="836736823"
												required
												type="tel"
												name="phone"
												className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
												value={sendMessage.phone}
												onChange={handleChange}
											/>
										</div>

										<div className="mb-1 sm:mb-2">
											<label
												htmlFor="location"
												className="inline-block mb-1 font-medium"
											>
												Location
											</label>
											<input
												placeholder="Dhaka, Bangladesh"
												required
												type="text"
												name="location"
												className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
												value={sendMessage.location}
												onChange={handleChange}
											/>
										</div>

										<div className="mb-1 sm:mb-2">
											<label
												htmlFor="plan"
												className="inline-block mb-1 font-medium"
											>
												Select Your Plan
											</label>
											<select
												required
												className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
												value={sendMessage.plan}
												onChange={handleChange}
												name="plan"
											>
												<option value="">Choose a service plan</option>
												<option value="start up plan">
													Coderammer Startup Plan
												</option>
												<option value="growth plan">
													Coderammer Growth Plan
												</option>
												<option value="enterprise plan">
													Coderammer Enterprise Plan
												</option>
											</select>
										</div>

										<div className="mb-1 sm:mb-2">
											<label
												htmlFor="content"
												className="inline-block mb-1 font-medium"
											>
												Message
											</label>
											<textarea
												rows={4}
												placeholder="Enter your message here..."
												className="flex-grow w-full px-4 py-2 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
												name="content"
												value={sendMessage.content}
												onChange={handleChange}
											></textarea>
										</div>

										<div className="mt-4 mb-2 sm:mb-4">
											<button
												type="submit"
												className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-[#989225] hover:bg-[#ada62b] focus:shadow-outline focus:outline-none"
											>
												Send
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GetInTouch;
