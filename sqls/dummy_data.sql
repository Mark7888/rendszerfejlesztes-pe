INSERT INTO Users (Username, Name, Password) VALUES
('admin', 'Admin', 'admin'),
('john_doe', 'John Doe', 'password'),
('jane_smith', 'Jane Smith', 'password'),
('alex_wong', 'Alex Wong', 'password'),
('sarah_jones', 'Sarah Jones', 'password'),
('mike_smith', 'Mike Smith', 'password'),
('emily_davis', 'Emily Davis', 'password'),
('chris_brown', 'Chris Brown', 'password'),
('lisa_johnson', 'Lisa Johnson', 'password');

INSERT INTO TopicTypes (Name) VALUES
('Photography'),
('PC'),
('Media'),
('Games'),
('World'),
('Etc');

INSERT INTO Topics (Name, TypeId, Description) VALUES
('10 Tips for Stunning Landscape Photography', 1, 'Capture breathtaking landscapes with these expert photography tips.'),
('Building Your Ultimate Gaming PC: A Beginners Guide', 2, 'Embark on your PC gaming journey with this comprehensive guide to building your dream gaming rig.'),
('The Rise of Influencer Marketing in the Digital Age', 3, 'Explore how influencer marketing is reshaping the digital landscape and impacting consumer behavior.'),
('The Evolution of Video Game Consoles: From Atari to PlayStation 5', 4, 'Trace the fascinating evolution of video game consoles through the decades, from humble beginnings to cutting-edge technology.'),
('Exploring Ancient Ruins: Uncovering Lost Civilizations', 5, 'Embark on a journey through time as we uncover the mysteries of ancient ruins and lost civilizations.'),
('10 Must-Watch Films for Every Movie Buff', 3, 'Expand your cinematic horizons with this curated list of must-watch films spanning various genres and decades.'),
('The Art of Food Photography: Capturing Culinary Delights', 1, 'Learn how to elevate your food photography skills and capture the beauty of culinary delights.'),
('Mastering the Basics of Graphic Design', 3, 'Unlock the secrets of graphic design and learn how to create visually stunning designs.'),
('The Psychology of Gaming: Understanding Player Behavior', 4, 'Delve into the fascinating world of gaming psychology and explore the factors that influence player behavior.'),
('Exploring Hidden Gems: Off-the-Beaten-Path Travel Destinations', 5, 'Discover hidden gems around the world and embark on unforgettable travel adventures.'),
('10 Essential Accessories for Every PC Gamer', 2, 'Enhance your gaming experience with these must-have accessories for PC gamers.'),
('The Impact of Social Media on Mental Health', 3, 'Examine the complex relationship between social media usage and mental health, and explore strategies for maintaining a healthy balance.'),
('The Art of Street Photography: Capturing the Essence of City Life', 1, 'Immerse yourself in the vibrant world of street photography and learn how to capture the essence of city life.'),
('The Future of Virtual Reality: Beyond Gaming', 4, 'Explore the diverse applications of virtual reality beyond gaming, from healthcare to education.'),
('10 Tips for Creating Engaging Social Media Content', 3, 'Maximize your social media presence with these expert tips for creating engaging content that resonates with your audience.'),
('The Impact of Streaming Services on the Entertainment Industry', 3, 'Examine the disruptive impact of streaming services on traditional entertainment mediums, from film to music.'),
('The Science of Astrophotography: Capturing the Cosmos', 1, 'Journey into the cosmos with astrophotography and learn how to capture stunning images of the night sky.'),
('The Benefits of Building Your Own PC', 2, 'Discover the advantages of building your own PC, from customization to cost savings.'),
('The Power of Storytelling in Video Games', 4, 'Explore the art of storytelling in video games and its role in creating immersive gaming experiences.'),
('10 Tips for Better Portrait Photography', 1, 'Elevate your portrait photography skills with these essential tips for capturing stunning portraits.'),
('The Evolution of Digital Media: From Print to Online', 3, 'Trace the evolution of digital media from its print origins to the era of online journalism and social media.'),
('The Psychology of Color in Design', 3, 'Explore the psychological impact of color in design and learn how to harness its power in your creative projects.'),
('10 Hidden Gems on Steam: Indie Games Worth Playing', 4, 'Discover hidden gems on the Steam platform and explore indie games that deserve your attention.'),
('The Art of Macro Photography: Exploring the Tiny Details', 1, 'Dive into the mesmerizing world of macro photography and capture the intricate details of the world around you.'),
('The Impact of AI on the Photography Industry', 1, 'Examine how artificial intelligence is revolutionizing the photography industry, from image editing to image recognition.'),
('10 Tips for Building a Successful YouTube Channel', 3, 'Kickstart your YouTube journey with these essential tips for building a successful channel and growing your audience.'),
('The History of Board Games: From Ancient Pastimes to Modern Classics', 4, 'Take a trip through history as we explore the evolution of board games from ancient pastimes to modern classics.'),
('The Art of Minimalist Photography: Less is More', 1, 'Embrace simplicity and master the art of minimalist photography with these essential tips and techniques.'),
('The Impact of Virtual Events on the Events Industry', 3, 'Explore how virtual events are reshaping the events industry and providing new opportunities for engagement and interaction.'),
('The Beauty of Wildlife Photography: Capturing Natures Wonders', 1, 'Immerse yourself in the beauty of wildlife photography and learn how to capture natures wonders with your camera.');


INSERT INTO Comments (Username, TopicId, Body, Timestamp) VALUES
('john_doe', 1, 'These tips are gold! Cant wait to try them out on my next outdoor shoot.', '2024-04-12 08:15:00'),
('jane_smith', 1, 'Thanks for sharing! Landscape photography is my passion, and Im always looking for new techniques.', '2024-04-15 10:30:00'),
('alex_wong', 2, 'This guide is exactly what I needed to start building my gaming PC. Thank you!', '2024-04-18 12:45:00'),
('sarah_jones', 2, 'Building your own PC is so rewarding. I love the customization options it offers.', '2024-04-20 14:00:00'),
('mike_smith', 3, 'Influencer marketing is definitely changing the game. Its amazing to see its impact.', '2024-04-22 16:15:00'),
('emily_davis', 3, 'Ive been incorporating influencer marketing into my strategy, and the results have been phenomenal.', '2024-04-25 18:30:00'),
('chris_brown', 4, 'The evolution of video game consoles is fascinating. Its crazy to see how far weve come.', '2024-04-28 20:45:00'),
('lisa_johnson', 4, 'I still remember playing on my old Atari. Those were the days!', '2024-04-29 22:00:00'),
('john_doe', 5, 'Exploring ancient ruins is like stepping back in time. I love uncovering the secrets of the past.', '2024-04-14 08:15:00'),
('jane_smith', 5, 'Theres something magical about exploring lost civilizations. Its a journey unlike any other.', '2024-04-16 10:30:00'),
('alex_wong', 6, 'Ive watched most of these films, and theyre all incredible. Great recommendations!', '2024-04-19 12:45:00'),
('sarah_jones', 6, 'Im always on the lookout for new films to watch. Thanks for the suggestions!', '2024-04-21 14:00:00'),
('mike_smith', 7, 'Food photography is an art form. These tips will definitely take my photos to the next level.', '2024-04-23 16:15:00'),
('emily_davis', 7, 'Capturing the beauty of food is one of my favorite things to do. Thanks for the inspiration!', '2024-04-26 18:30:00'),
('chris_brown', 8, 'Graphic design is my passion. Im excited to learn more about mastering the basics.', '2024-04-29 20:45:00'),
('lisa_johnson', 8, 'As a designer, Im always looking for ways to improve my skills. Thanks for the valuable insights!', '2024-04-30 22:00:00'),
('john_doe', 9, 'The psychology of gaming is so interesting. Its amazing how games can influence behavior.', '2024-04-11 08:15:00'),
('jane_smith', 9, 'Understanding player behavior has definitely improved my gaming strategy. Thanks for the article!', '2024-04-13 10:30:00'),
('alex_wong', 10, 'Off-the-beaten-path destinations are my favorite! Cant wait to add these to my travel bucket list.', '2024-04-16 12:45:00'),
('sarah_jones', 10, 'Im always up for an adventure. Thanks for sharing these hidden gems!', '2024-04-19 14:00:00'),
('mike_smith', 11, 'These accessories are essential for any serious PC gamer. Great list!', '2024-04-22 16:15:00'),
('emily_davis', 11, 'Ive been looking for new accessories to enhance my gaming setup. Thanks for the recommendations!', '2024-04-25 18:30:00'),
('chris_brown', 12, 'The impact of social media on mental health is a crucial topic. Thanks for shedding light on it.', '2024-04-28 20:45:00'),
('lisa_johnson', 12, 'Maintaining a healthy balance with social media is so important. Thanks for the insightful article!', '2024-04-29 22:00:00'),
('john_doe', 13, 'Street photography is my favorite genre. Cant wait to put these tips into practice!', '2024-04-15 08:15:00'),
('jane_smith', 13, 'Capturing the essence of city life is what drew me to photography. Thanks for the inspiration!', '2024-04-17 10:30:00'),
('alex_wong', 14, 'Virtual reality has so much potential beyond gaming. Exciting times ahead!', '2024-04-20 12:45:00'),
('sarah_jones', 14, 'I cant wait to see how VR technology evolves in the coming years. The possibilities are endless!', '2024-04-22 14:00:00'),
('mike_smith', 15, 'Creating engaging social media content is key to building a loyal following. Thanks for the advice!', '2024-04-24 16:15:00'),
('emily_davis', 15, 'Im always looking for new ways to connect with my audience. These tips are invaluable.', '2024-04-27 18:30:00'),
('chris_brown', 16, 'Streaming services have definitely changed the game. Its a whole new era of entertainment.', '2024-04-30 20:45:00'),
('lisa_johnson', 16, 'I love being able to stream my favorite shows and movies. Thanks for exploring this topic!', '2024-05-01 22:00:00'),
('john_doe', 17, 'Astrophotography is my passion. Cant wait to try out these tips under the night sky!', '2024-04-13 08:15:00'),
('jane_smith', 17, 'Theres nothing quite like capturing the beauty of the cosmos through photography. Thanks for sharing!', '2024-04-15 10:30:00'),
('alex_wong', 18, 'Building my own PC was one of the best decisions Ive made. Highly recommend it to others!', '2024-04-18 12:45:00'),
('sarah_jones', 18, 'The customization options you get with a custom-built PC are unbeatable. Thanks for highlighting the benefits!', '2024-04-20 14:00:00'),
('mike_smith', 19, 'Storytelling is such a powerful tool in gaming. Its what keeps me coming back for more.', '2024-04-23 16:15:00'),
('emily_davis', 19, 'I love getting lost in the stories of video games. Thanks for exploring this aspect of gaming!', '2024-04-26 18:30:00'),
('chris_brown', 20, 'Portrait photography is my specialty. These tips are great for honing my skills even further.', '2024-04-29 20:45:00'),
('lisa_johnson', 20, 'Ive been wanting to improve my portrait photography. Thanks for the helpful advice!', '2024-04-30 22:00:00'),
('john_doe', 21, 'The evolution of digital media is fascinating to witness. Its a constantly changing landscape.', '2024-04-11 08:15:00'),
('jane_smith', 21, 'Im always intrigued by how digital media continues to evolve. Thanks for the insightful article!', '2024-04-13 10:30:00'),
('alex_wong', 22, 'Color psychology is such an interesting topic. Thanks for diving into it and explaining its significance.', '2024-04-16 12:45:00'),
('sarah_jones', 22, 'As a designer, understanding the psychology of color is crucial. Thanks for the informative read!', '2024-04-19 14:00:00'),
('mike_smith', 23, 'Indie games have a special place in my heart. Cant wait to check out these hidden gems!', '2024-04-22 16:15:00'),
('emily_davis', 23, 'Discovering new indie games is always exciting. Thanks for the recommendations!', '2024-04-25 18:30:00'),
('chris_brown', 24, 'Macro photography opens up a whole new world of possibilities. Cant wait to explore it further!', '2024-04-28 20:45:00'),
('lisa_johnson', 24, 'Capturing the tiny details is what makes macro photography so fascinating. Thanks for the tips!', '2024-04-29 22:00:00'),
('john_doe', 25, 'AI is transforming every industry, including photography. Exciting times ahead!', '2024-04-14 08:15:00'),
('jane_smith', 25, 'Im always amazed by the advancements in AI technology. Thanks for discussing its impact on photography!', '2024-04-15 10:30:00'),
('alex_wong', 26, 'Building a successful YouTube channel takes dedication and hard work. Thanks for the valuable advice!', '2024-04-18 12:45:00'),
('sarah_jones', 26, 'Im always looking for ways to grow my YouTube channel. Thanks for sharing these tips!', '2024-04-20 14:00:00'),
('mike_smith', 27, 'Board games have a rich history. Its fascinating to see how theyve evolved over time.', '2024-04-23 16:15:00'),
('emily_davis', 27, 'I love playing board games with friends. Thanks for highlighting their importance!', '2024-04-26 18:30:00'),
('chris_brown', 28, 'Thanks for sharing your insights into board games. Im excited to try out some new ones!', '2024-04-29 20:45:00'),
('lisa_johnson', 28, 'Board games are a great way to spend quality time with loved ones. Thanks for the recommendations!', '2024-04-30 22:00:00'),
('john_doe', 29, 'These tips are incredibly helpful for improving my photography skills. Thanks for sharing!', '2024-04-16 08:15:00'),
('jane_smith', 29, 'Im always eager to learn new techniques to enhance my photography. Thanks for the inspiration!', '2024-04-17 10:30:00'),
('alex_wong', 30, 'Ive been wanting to delve into graphic design. Thanks for the helpful tips to get started!', '2024-04-20 12:45:00'),
('sarah_jones', 30, 'Graphic design has always fascinated me. Thanks for providing valuable resources!', '2024-04-22 14:00:00');
