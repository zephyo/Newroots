# Newroots - a responsive web app to help build effective support networks - *for treehacks 2019*

![alt text](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/762/668/datas/gallery.jpg)
![alt text](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/766/593/datas/gallery.jpg)
![alt text](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/766/594/datas/gallery.jpg)
![alt text](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/766/595/datas/gallery.jpg)

## Inspiration
One need only search "social media" in the app store to be presented with a dizzying array of options. Yet one need only search "social media mental health" to see that all these apps may be doing more harm than we realize.  Even without the aid of social media, depression and other mental illnesses are already a huge problem, especially among college students, who are going through a major life transition. It can be easy to feel isolated, or to worry that you're the only one struggling. Social support can be a critical factor in improving mental health, but what are we supposed to do when all our social apps seem to be making things worse? Luckily, this is where Newroots comes in!

## What it does
With Newroots, your support network is only a tap away. Unlike other social media apps which are about maintaining public appearance and racking up the likes and followers, Newroots is about giving and receiving the support you and your friends need when your life isn't Instagram perfect. Newroots isn't about getting the highest follower count - it's about connecting with the people who matter most to you, and who will be there through rain and shine to help you grow.  Newroots makes it easy to connect and interact with your support network. You can post your thoughts and mood for the network to see, and set daily targets (e.g. remember to get 8 hours of sleep) so your network can make sure you're achieving your goals. Newroots aims to overcome the stigma associated with asking for help by creating a fun, friendly environment which is reminiscent of other social media apps. 

## How we built it
1. Prototype is built in Codepen using Pug (HTML), SCSS, and jQuery then tested with friends. (See the main prototype here https://codepen.io/zephyo/pen/dagQeM and the onboarding prototype here https://codepen.io/zephyo/pen/rPQRzZ)
2. Actual app (at https://zephyo.github.io/Newroots/) is made using HTML/SCSS for the front-end, React.js/Babel/jQuery as the middle man, Photoshop for the design assets, and Firebase (Authentication, Firestore, Storage) for the database functionality.


## Challenges we ran into
We had some challenges presenting the information in an intuitive way, especially for the checkin question setup. 
We also had some challenges structuring the database in a way which balanced speed and storage space optimization. 

## Accomplishments that we're proud of
We are very proud of the fun, friendly UI. Reaching out for support can be very difficult, especially if you're already in a bad place, but we think we created a very warm, friendly environment that can make this process a little easier. 

Technically speaking, we're proud of the functionality accomplished - there's a wide variety of functions that update in realtime, including friend requests, checkin customization, user data customization, feed, and comments. The whole thing is rudimentarily functional bar some (okay, many) bugs.

## What we learned
We learned a great many technical details about how to use firestore and firebase authentication. We also learned about encapsulation and object orientation. We got some experience with event based programming and asynchronous functions. We learned to think about data structure, and the best way to format data depending on how database queries work (we started with firebase realtime database and then switched to firestore part way through, so we had to apply a different storage strategy). We also learned a bit more about self care through our research (:

## What's next for Newroots
There are still a lot of features we want to implement: 
1. We want to create a feature where users can send each other care messages (e.g. "Angela is thinking about you") easily by just tapping a heart icon.
2. We want to integrate natural language processing into the app so that it can detect the onset of depression through conversation/app activity and alert user/network
3. We want to make it easier to find your friends on Newroots (currently you have to search their email). 
