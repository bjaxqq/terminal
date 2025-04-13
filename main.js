function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

const pdfViewer = document.getElementById('pdfViewer');
const terminalWindow = document.getElementById('window1');
const terminalInput = document.getElementById('commandInput');
const output = document.getElementById('output');
const terminal = document.getElementById('terminal');

let commandHistory = [];
let historyIndex = -1;
let tempCommand = '';

const rainbowAscii = `
<span class="ansi-red"> ________  ________  ________  ________  ___  __    ________  ________  ________</span>      
<span class="ansi-green">|\\   __  \\|\\   __  \\|\\   __  \\|\\   __  \\|\\  \\|\\  \\ |\\   ____\\|\\   __  \\|\\   ____\\</span>     
<span class="ansi-yellow">\\ \\  \\|\\ /\\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\/  /|\\ \\  \\___|\\ \\  \\|\\  \\ \\  \\___|_</span>    
<span class="ansi-blue"> \\ \\   __  \\ \\   _  _\\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\   ___  \\ \\_____  \\ \\  \\\\\\  \\ \\_____  \\</span>   
<span class="ansi-magenta">  \\ \\  \\|\\  \\ \\  \\\\  \\\\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\  \\\\ \\  \\|____|\\  \\ \\  \\\\\\  \\|____|\\  \\</span>  
<span class="ansi-cyan">   \\ \\_______\\ \\__\\\\ _\\\\ \\_______\\ \\_______\\ \\__\\\\ \\__\\____\\_\\  \\ \\_______\\____\\_\\  \\</span> 
<span class="ansi-white">    \\|_______|\\|__|\\|__|\\|_______|\\|_______|\\|__| \\|__|\\_________\\|_______|\\_________|</span>
<span class="ansi-green">                                                      \\|_________|        \\|_________|</span>
`;

function displayWelcome() {
  output.innerHTML = '';
  
  const asciiDiv = document.createElement('div');
  asciiDiv.className = 'command-output ascii-art';
  asciiDiv.innerHTML = rainbowAscii;
  output.appendChild(asciiDiv);
  
  const welcomeDiv = document.createElement('div');
  welcomeDiv.className = 'command-output welcome-message';
  welcomeDiv.innerHTML = `Welcome to Brooks' interactive terminal!`;
  output.appendChild(welcomeDiv);
  
  const helpDiv = document.createElement('div');
  helpDiv.className = 'command-output help-message';
  helpDiv.innerHTML = `Type <span class="ansi-green">'help'</span> to begin exploring.`;
  helpDiv.style.marginBottom = '12px';
  output.appendChild(helpDiv);
  
  terminal.scrollTop = terminal.scrollHeight;
}

displayWelcome();

pdfViewer.addEventListener('mouseenter', () => {
  pdfViewer.classList.add('highlighted');
  terminalWindow.classList.remove('highlighted');
  terminalInput.blur();
});

terminalWindow.addEventListener('mouseenter', () => {
  terminalWindow.classList.add('highlighted');
  pdfViewer.classList.remove('highlighted');
  terminalInput.focus();
});

terminalWindow.addEventListener('mouseleave', () => {
  terminalWindow.classList.remove('highlighted');
});

const commands = {
  ascii: () => rainbowAscii,

  classes: () => `<span class="ansi-cyan">AR271</span> - AI and Art
<span class="ansi-cyan">CSC105</span> - Computing: Multidisciplinary Approach
<span class="ansi-cyan">CSC109</span> - Introduction to Version Control
<span class="ansi-cyan">CSC110</span> - Programming and Problem Solving
<span class="ansi-cyan">CSC111</span> - Data Structure and Abstraction
<span class="ansi-cyan">CSC205</span> - Introduction to Discrete Math
<span class="ansi-cyan">CSC210</span> - Computer Architecture and Design
<span class="ansi-cyan">CSC215</span> - Algorithm Design and Analysis
<span class="ansi-cyan">CSC340</span> - Network and Distributed Processing
<span class="ansi-cyan">CSC375</span> - Advanced Algorithm Design
<span class="ansi-cyan">GDD110</span> - Introduction to Visual Design for Games
<span class="ansi-cyan">GDD140</span> - Creativity and Computation
<span class="ansi-cyan">GDD200</span> - Introduction to Game Development
<span class="ansi-cyan">GDD316</span> - Advanced Game Development Topics
<span class="ansi-cyan">PL255</span> - Ethics and AI
<span class="ansi-cyan">SER120</span> - Object-Oriented Design
<span class="ansi-cyan">SER210</span> - Software Engineering Design/Development
<span class="ansi-cyan">SER225</span> - Introduction to Software Development
<span class="ansi-cyan">SER375</span> - Foundations of Web Development`,

  clear: () => {
    output.innerHTML = '';
    return '';
  },

  date: () => new Date().toString(),

  email: () => `Email - <a href="mailto:brooksjackson@proton.me">brooksjackson@proton.me</a>`,

  experience: () => `<span class="ansi-yellow">Computer Science Student</span> - Quinnipiac University (Sep 2022 - Present)
<span class="ansi-yellow">IT Intern</span> - Medicus Healthcare Solutions (May 2024 - Aug 2024, May 2025 - Aug 2025)
<span class="ansi-yellow">App Development Intern</span> - Picabuu (Jun 2023 - Dec 2023)
<span class="ansi-yellow">Project Management Intern</span> - Picabuu (Jan 2023 - Jun 2023)
<span class="ansi-yellow">Marketing Vice President</span> - Quinnipiac Computing Club (Sep 2023 - Nov 2023)`,

  hobbies: () => `Mountain Biking
Hiking
Reading
Playing Guitar
Photography`,

  help: () => `<span class="ansi-blue">ascii</span>     - Display ASCII art
<span class="ansi-blue">classes</span>    - University classes I've taken
<span class="ansi-blue">clear</span>      - Clear the terminal
<span class="ansi-blue">date</span>       - Show current date and time
<span class="ansi-blue">email</span>      - My email for business purposes
<span class="ansi-blue">experience</span> - My professional experience
<span class="ansi-blue">hobbies</span>    - My favorite hobbies
<span class="ansi-blue">help</span>       - Show this help message
<span class="ansi-blue">music</span>      - What I'm currently listening to
<span class="ansi-blue">projects</span>   - Every project I've worked on
<span class="ansi-blue">skills</span>     - My technical skills
<span class="ansi-blue">socials</span>    - My social media/network pages`,

  music: async () => {
    try {
      return `(Spotify integration would go here)
Last played: Unknown track`;
    } catch (error) {
      return `<span class="ansi-red">Error fetching music data:</span> ${error.message}`;
    }
  },

  projects: () => `Collaborative Coding Website - <a href="https://github.com/bjaxqq/SER375/tree/main/codealong" target="_blank">[bjaxqq/codealong]</a>
Quinnipiac Tracker - <a href="https://github.com/bajackson1/Quinnipiac tracker" target="_blank">[bajackson1/QuinnipiacTracker]</a>
Quinnipiac: A Campus Quest - <a href="https://a-r-t.github.io/SER225-Project-Website/semesters/fall2023/teams/art" target="_blank">[fall2023/teams/art]</a>
Stoic Quote Generator Website - <a href="https://github.com/bjaxqq/quotes" target="_blank">[bjaxqq/quotes]</a>
TCP/UDP Trivia Game - <a href="https://github.com/bajackson1/trivia-game" target="_blank">[bajackson1/trivia]</a>
This Website - <a href="https://github.com/bjaxqq/terminal" target="_blank">[bjaxqq/terminal]</a>
Weaver's Wrath - <a href="https://a-r-t.github.io/SER225-Project-Website/semesters/fall2024/teams/arachnerds-inc" target="_blank">[fall2024/teams/arachnerds]</a>`,

  skills: () => `<span class="ansi-cyan">Developer Tools:</span> Android Studio, Eclipse, Git, GitHub, IntelliJ, Neovim, Visual Studio, VSCode
<span class="ansi-cyan">Frameworks:</span> Node.js, React.js
<span class="ansi-cyan">Languages:</span> C#, CSS, HTML, Java, JavaScript, Kotlin, LaTeX, Markdown, Python
<span class="ansi-cyan">Libraries:</span> BeautifulSoup, Matplotlib, NumPy, Pandas, Requests, Selenium, TensorFlow
<span class="ansi-cyan">Systems:</span> Linux, MacOS, Windows 10, Windows 11`,

  socials: () => `Discord - <a href="https://discord.com/users/bjaxqqq" target="_blank">discord/bjaxqqq</a>
GitHub - <a href="https://github.com/bjaxqq" target="_blank">github/bjaxqq</a>
LinkedIn - <a href="https://linkedin.com/in/brooks-jackson" target="_blank">linkedin/brooks-jackson</a>`,
};

function executeCommand(command) {
  // Add command to history unless it's empty or same as previous
  if (command && command !== commandHistory[commandHistory.length - 1]) {
    commandHistory.push(command);
    historyIndex = commandHistory.length;
  }
  
  const [cmd, ...args] = command.split(' ');
  if (commands[cmd]) {
    const result = commands[cmd](args);
    return result instanceof Promise ? result : Promise.resolve(result);
  } else {
    return Promise.resolve(`<span class="ansi-red">Command not found:</span> ${cmd}\nType <span class="ansi-green">'help'</span> for available commands.`);
  }
}

function addCommandToOutput(command) {
  const commandLine = document.createElement('div');
  commandLine.className = 'command-line';
  commandLine.innerHTML = `<span class="prompt-user">user</span> <span class="prompt-symbol">❯</span> ${command}`;
  output.appendChild(commandLine);
  terminal.scrollTop = terminal.scrollHeight;
}

function addOutputToTerminal(text) {
  if (text) {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-output';
    outputDiv.innerHTML = text;
    output.appendChild(outputDiv);
    terminal.scrollTop = terminal.scrollHeight;
  }
}

terminalInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const command = terminalInput.value.trim();
    if (command) {
      addCommandToOutput(command);
      const result = executeCommand(command);
      result.then(outputText => {
        addOutputToTerminal(outputText);
      });
      terminalInput.value = '';
      historyIndex = commandHistory.length;
    }
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (commandHistory.length > 0) {
      if (historyIndex <= 0) {
        historyIndex = 0;
      } else {
        if (historyIndex === commandHistory.length) {
          tempCommand = terminalInput.value;
        }
        historyIndex--;
      }
      terminalInput.value = commandHistory[historyIndex];
      setTimeout(() => {
        terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
      }, 0);
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (commandHistory.length > 0) {
      if (historyIndex >= commandHistory.length - 1) {
        historyIndex = commandHistory.length;
        terminalInput.value = tempCommand || '';
      } else {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      }
      setTimeout(() => {
        terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
      }, 0);
    }
  } else if (event.key === 'Tab') {
    event.preventDefault();
  }
});

terminal.addEventListener('click', () => {
  terminalInput.focus();
});

terminalInput.focus();