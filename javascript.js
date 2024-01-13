  function updateTimeAndDate() {
    const currentTime = new Date();
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = currentTime.toLocaleDateString('en-US', options);
    const timeString = currentTime.toLocaleTimeString();

    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
  }

  function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      return;
    }

    const taskContainer = document.getElementById('tasks-container');
    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    const taskTextElement = document.createElement('div');
    taskTextElement.textContent = taskText;

    const taskActionsElement = document.createElement('div');
    taskActionsElement.className = 'task-actions';

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', function () {
      taskTextElement.classList.toggle('completed');
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function () {
      taskElement.remove();
      updateUpcomingTasks();
    });

    taskActionsElement.appendChild(completeButton);
    taskActionsElement.appendChild(deleteButton);

    taskElement.appendChild(taskTextElement);
    taskElement.appendChild(taskActionsElement);

    taskContainer.appendChild(taskElement);

    taskInput.value = '';

    updateUpcomingTasks();
  }

  function updateUpcomingTasks() {
    const upcomingTasksContainer = document.getElementById('upcoming-tasks-container');
    const tasks = document.querySelectorAll('.task');

    upcomingTasksContainer.innerHTML = '';

    tasks.forEach(task => {
      if (!task.querySelector('.completed')) {
        const upcomingTask = task.cloneNode(true);
        upcomingTask.classList.remove('task');
        upcomingTask.classList.add('upcoming-task');
        upcomingTask.querySelector('.delete-btn').remove();
        upcomingTasksContainer.appendChild(upcomingTask);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateTimeAndDate();
    setInterval(updateTimeAndDate, 1000);

    const signinContainer = document.getElementById('signin-container');
    const mainContainer = document.getElementById('main-container');
    const upcomingTasksContainer = document.getElementById('upcoming-tasks');
    const signupContainer = document.getElementById('signup-container');
    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
    const welcomeMessage = document.getElementById('welcome-message');

    signupBtn.addEventListener('click', function () {
      signupContainer.style.display = 'none';
      signinContainer.style.display = 'block';
      welcomeMessage.style.display = 'none';
    });

    signinBtn.addEventListener('click', function () {
      // Perform user authentication here
      const username = document.getElementById('username-input').value.trim();
      const password = document.getElementById('password-input').value.trim();

      if (username === 'admin' && password === 'admin') {
        signupContainer.style.display = 'none';
        signinContainer.style.display = 'none';
        mainContainer.style.display = 'block';
        upcomingTasksContainer.style.display = 'block';
        welcomeMessage.style.display = 'block';
        welcomeMessage.textContent = `Welcome, ${username}!`;

        const addTaskButton = document.getElementById('add-task-btn');
        addTaskButton.addEventListener('click', addTask);
      } else {
        // Display error message
        document.getElementById('error-message').style.display = 'block';
      }
    });
  });
