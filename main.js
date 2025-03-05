let cycleInterval;
let isCycleActive = false;

function toggleLight(color) {
    const lights = document.querySelectorAll('.light');
    lights.forEach(light => {
        light.classList.remove('active');
    });

    const activeLight = document.getElementById(`${color}Light`);
    activeLight.classList.add('active');

    const reflectionContainer = document.getElementById('reflectionContainer');
    reflectionContainer.classList.add('active');
    const reflections = reflectionContainer.children;

    for (let i = 0; i < reflections.length; i++) {
        reflections[i].style.display = 'none'; // Hide all reflections
    }

    switch (color) {
        case 'red':
            document.getElementById('redReflection').style.display = 'block';
            break;
        case 'yellow':
            document.getElementById('yellowReflection').style.display = 'block';
            break;
        case 'green':
            document.getElementById('greenReflection').style.display = 'block';
            break;
    }
}

function toggleAutoCycle() {
    const startButton = document.getElementById('startButton');

    if (!isCycleActive) {
        isCycleActive = true;
        startButton.textContent = 'Stop Cycle';
        startTrafficCycle();
    } else {
        isCycleActive = false;
        clearInterval(cycleInterval);
        startButton.textContent = 'Start Cycle';
        const lights = document.querySelectorAll('.light');
        lights.forEach(light => {
            light.classList.remove('active');
        });
        document.getElementById('reflectionContainer').classList.remove('active');
    }
}

function startTrafficCycle() {
    let currentLight = 0; // 0: red, 1: yellow, 2: green
    const cycleDuration = 13000; // Total cycle time in milliseconds
    const lightDurations = [4000, 5000, 4000]; // Each light duration in milliseconds

    toggleLight('red'); // Start with red light

    cycleInterval = setInterval(() => {
        currentLight = (currentLight + 1) % 3; // Cycle through 0, 1, 2

        if (currentLight === 0) {
            toggleLight('red');
        } else if (currentLight === 1) {
            toggleLight('yellow');
        } else {
            toggleLight('green');
        }
    }, lightDurations[currentLight]);
}