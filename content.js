function calcDuration(time) {
    // format
    let start_time = time.slice(0, 5);
    let end_time = time.slice(8);
    
    // convert to min
    let start_time_min = Number(start_time.slice(0, 2) * 60) + Number(start_time.slice(3));
    let end_time_min = Number(end_time.slice(0, 2) * 60) + Number(end_time.slice(3));
    
    let duration_formatted = "";
    
    if (end_time_min > start_time_min) { // Si dans la mm journée
        // Calc duration
        // end_time_min = (end_time_min == 0) ? 1440 : end_time_min;
        let duration_h = (end_time_min - start_time_min) / 60;

        // format
        if (String(duration_h).includes(".")) {
            duration_formatted = ((String(duration_h)[2] == ".") ? 
                ` (${String(duration_h).slice(0, 2)}h${Number(String(duration_h).slice(2)) * 60})` :
                ` (${String(duration_h).slice(0, 1)}h${Number(String(duration_h).slice(1)) * 60})`);
        } else {
            duration_formatted = ` (${String(duration_h)}h)`;
        }
    } else { // Si déborde sur la journée suivante Eg : 21h30 21h15 = 1290 1275. 24h = 1440    => 1440 - 1290 + 1275
        let duration_h = (1440 - start_time_min + end_time_min) / 60; // 1440min = 24h

        // format
        if (String(duration_h).includes(".")) {
            duration_formatted = ((String(duration_h)[2] == ".") ? 
                ` (${String(duration_h).slice(0, 2)}h${Number(String(duration_h).slice(2)) * 60})` :
                ` (${String(duration_h).slice(0, 1)}h${Number(String(duration_h).slice(1)) * 60})`);
        } else {
            duration_formatted = ` (${String(duration_h)}h)`;
        }
    }

    return duration_formatted;
}

function addEventDuration(keydown) {
    document.querySelectorAll(".gVNoLb").forEach((i) => {
        let task_time_plus_duration = calcDuration(i.textContent);
        if (keydown) {task_time_plus_duration = ""};
        i.textContent = i.textContent + task_time_plus_duration;
    })
}

function removeEventDuration() {
    document.querySelectorAll(".gVNoLb").forEach((i) => {
        let task_time_minus_duration = i.textContent.slice(0, 13);
        i.textContent = task_time_minus_duration;
    })
}



console.log("(Extension) Connexion");

keydown = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'b' || event.key === 'B') {
        addEventDuration(keydown);
        keydown = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'b' || event.key === 'B') {
        removeEventDuration();
        keydown = false;
    }
});


// Use MutationObserver to watch for changes in the DOM
// let observer = new MutationObserver((mutations) => {
//     updateContent();
// });

// // Configure the observer to watch for changes in the entire document body
// observer.observe(document.body, {
//     childList: true,
//     subtree: true
// });

// // Optional: run initially to handle the existing content
// updateContent();


// window.onload = function() {
//     setTimeout(() => {
//         for (let i of document.querySelectorAll(".gVNoLb")) {
//             let new_task_time = calcDuration(i.textContent);
//             i.textContent = i.textContent + new_task_time;
//         };
//     }, 500);
// }