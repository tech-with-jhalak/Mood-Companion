# **🌸Mood Companion🌸**

## **📖Introduction~**
Mood Companion is a simple yet engaging frontend project designed to support emotional check-ins in a friendly and visually appealing way. The app guides users through a step-by-step flow where they first enter their name, share how they are feeling, and then choose the kind of support they want at that moment. The support can come in the form of a lighthearted joke, an inspirational quote, or a music option that opens Spotify for a quick mood boost.

What makes the project more meaningful is the feedback and analytics section. After receiving support, users can record whether they feel Good, Better, or Worst. These responses are then stored and visualized inside an interactive pie chart, allowing users to see patterns in their emotional progress over time. The application also keeps a detailed mood log with timestamps and shows useful insights such as total check-ins, the most common mood entered, and the overall positive rate.

The project is built completely without frameworks, making it a great example of how much can be achieved using only core web technologies. It demonstrates DOM manipulation, event handling, state updates, local storage integration, chart rendering, responsive design, and interactive UI styling. Because of its simple structure and approachable codebase, it is especially suitable for beginners who want to learn how HTML, CSS, and JavaScript work together in a real-world mini project.

Mood Companion can be used as a portfolio project, a learning project, or a starting point for a more advanced wellness or journaling application. It is lightweight, easy to run, and simple to customize with more moods, more content options, improved analytics, or backend support in the future.



## **🧠Key Features~**

### 1. Personalized Welcome Experience✨ 
As shown in the first screen, the app begins by asking the user for their name. This creates a more personal and friendly interaction instead of showing a generic interface. Once the user enters their name, the app uses it in the next screen to greet them directly.

### 2. Mood Selection with Preset and Custom Input😊 
In the second screen, users can quickly select from a set of mood chips such as Happy, Sad, Stressed, Calm, Anxious, Excited, Meh, and Angry. They can also type their own mood in the input field if none of the preset options matches how they feel. This makes the mood check-in more flexible and user-friendly.

### 3. Guided Multi-Step Flow🎯 
The images show that the app is divided into clear steps, represented by progress dots at the top of each screen. This guided flow helps users move smoothly from entering their name, to selecting their mood, to choosing a support option, and finally to tracking how they feel afterward.

### 4. Support Options Based on User Mood💬 
In the third screen, the app offers three different support choices:
- Joke
- Quote
- Music
  
This gives users control over the kind of comfort or motivation they want. Some may prefer humor, some may prefer inspiration, and others may want music for emotional support.

### 5. Dynamic Content Display😂 
The fourth screen shows how the app presents the selected content inside a styled result card. In the screenshot, a joke is displayed in a visually highlighted box. Users can either ask for another piece of content or continue to the next step to record how they feel after receiving support.

### 6. Regenerate Content Option🔁 
The “Another one” button shown in the fourth image allows users to generate a different joke or quote without restarting the whole flow. This improves usability by letting users explore more uplifting content instantly.

### 7. Emotional Feedback Tracking📊 
In the fifth screen, users can choose how they feel after using the app by selecting:
- Good
- Better
- Worst
  
This feature helps track whether the app content had a positive or negative emotional effect. It makes the project more than just an entertainment app by adding a reflection and feedback layer.

### 8. Doughnut / Pie Chart Analytics🥧 
The analytics chart shown in the final screenshot visually represents how many times users selected Good, Better, or Worst. This makes emotional patterns easy to understand at a glance and adds a meaningful data visualization feature to the app.

### 9. Mood Journey Insights📝 
Below the chart, the app provides useful summary insights such as:
- Total check-ins
- Most common mood
- Positive rate
  
These insights help users understand their emotional trends over time and make the app feel more interactive and informative.

### 10. Saved Progress with Local Storage💾 
The app stores user feedback and mood history in the browser using localStorage. This means the data remains available even after refreshing the page, making the tracking experience persistent without needing a backend.

### 11. Modern Neon User Interface🌈 
All the screenshots show a glowing neon-style interface with gradient buttons, soft light effects, and a dark starry background. This visual design makes the app feel calm, modern, and engaging, which matches the emotional wellness purpose of the project.

### 12. Responsive Design📱 
The layout is designed to work well across different screen sizes. Even though the screenshots are desktop-based, the CSS structure supports responsive behavior so the app can also be viewed comfortably on smaller screens.




## **🛠️Tech Details~**

### HTML
HTML is used to build the structure of the Mood Companion app. It defines the different screens, input fields, buttons, chart container, feedback section, and mood log table. It acts as the foundation of the application and organizes all the content users interact with.

### CSS
CSS is used to style the entire application and create the neon-themed visual design shown in the project. It handles layout, colors, glowing buttons, responsive design, spacing, animations, and overall user interface appearance. CSS is what gives the app its attractive and modern mood-tracking look.

### JavaScript
JavaScript powers the functionality and interactivity of the app. It controls screen navigation, mood selection, random jokes and quotes, feedback tracking, localStorage saving, chart updates, notification handling, and dynamic rendering of the mood log and analytics. It is the main logic layer that makes the app interactive and responsive to user actions.

### DEMO LINK- 
http://127.0.0.1:3000/index.html?vscode-livepreview=true

## **🎦DEMO to uplift your mood~**

### 1. Welcome Screen
Users begin by entering their name to start a personalized mood check-in journey.

<img width="1908" height="954" alt="Demo 1" src="https://github.com/user-attachments/assets/22e04dac-c6fc-44bc-9c51-7c4677bc74df" />


### 2. Mood Selection
Users can choose from predefined mood chips like Happy, Sad, Stressed, Calm, Anxious, Excited, Meh, and Angry, or type their own mood manually.

<img width="1908" height="954" alt="Demo 2" src="https://github.com/user-attachments/assets/8a4b7fd2-13bb-414e-94cc-fd4de9808cb3" />


### 3. Support Choice
After selecting a mood, the app asks what kind of support the user wants. They can choose from a joke, an inspiring quote, or music.

<img width="1901" height="950" alt="Demo 3" src="https://github.com/user-attachments/assets/8e263c67-97a1-4d56-b0dd-dbf8ca11f6cb" />


### 4. Result Screen
The app displays uplifting content based on the user’s selection. Users can generate another response or continue to record how they feel afterward.

<img width="1907" height="1022" alt="Demo 4" src="https://github.com/user-attachments/assets/0ae08448-a278-45aa-aaf5-5e7d2259cd6b" />


### 5. Feedback and Analytics
Users can submit emotional feedback using Good, Better, or Worst. The app then updates a doughnut chart, stores the log, and shows mood insights.

<img width="1873" height="1017" alt="Demo 5" src="https://github.com/user-attachments/assets/b692b0f7-f17a-4f05-904c-b63039218a35" />


## **Project Structure**
