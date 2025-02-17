# Hack Western 11 Submission 🐎
Winners: 🥇 First Place Overall, 🏆 Best AI Application Built with Cloudflare

# Inspiration 💡
April 12, 2018 in Cincinnati, Ohio, a failed dispatch mission lead to the death of 16 year-old Kyle Plush. His death was caused by an array of errors, both human and computer, and was completely tragic and preventable. More details on this case can be found in the article [here](https://www.cincinnati.com/story/news/2018/04/12/how-everything-went-wrong-seven-hills-student-kyle-plush-ended-up-dead-cincinnati/511736002).

# Overview 📋
BravoDispatch is a computer-aided dispatcher (CAD) application designed to help dispatch operators better handle calls. Bravo AI extracts critical details from a live caller transcript, and helps manage a set of active cases. It reduces manual data entry, takes some tension off of operators, and improves response times.

![Home Page](./images/main_page.png)

# Demo Video 🎥

https://github.com/user-attachments/assets/a07588c4-ea67-4c58-bb8f-2a9e4973129a


# Technical Information 🖥️
BravoDispatch is built on a React framework, using Next.js for the front and backend, and Supabase as the data store. Extracting key information from transcript data is done by making a call to Cloudflare worker, which leverages the Llama 3 LLM.

![Architecture](./images//architecture_diagram.png)

# Future Outlook 🚀
We made the most of our 36 hours, but looking to the future, this app would incorporate more features. For example, the live transcription module would include more languages and robustness. Then, we would want to use DeX, and also implement address verification. Furthermore, we would add recommended actions based on the category of the call. There could also be more fine-tuning for the AI, and overall maximally reduce any friction between the dispatcher and AI.

# Team composition 🤝
At the time of writing, we are a team of final-year software engineering students from McMaster University. This is probably our last hackathon and it's been a journey and a blast, thanks to all the people at Hack Western that helped make it happen.

[Zayn Abed](https://www.linkedin.com/in/zayn-abed/), [Maged Armanios](https://www.linkedin.com/in/magedarmanios/), [Jinal Kasturiarachchi](https://www.linkedin.com/in/jinal-k/), [Jane Klavir](https://www.linkedin.com/in/janeklavir/)
