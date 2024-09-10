function calc_total_time(time) {
    // format
    let start_time = time.slice(0, 5);
    let end_time = time.slice(8);
    
    // convert to min
    let start_time_min = Number(start_time.slice(0, 2) * 60) + Number(start_time.slice(3));
    let end_time_min = Number(end_time.slice(0, 2) * 60) + Number(end_time.slice(3));
    
    let total_time_formatted = "";
    
    if (end_time_min > start_time_min) { // Si dans la mm journée
        // Calc total_time
        end_time_min = (end_time_min == 0) ? 24 * 60 : end_time_min = end_time_min;
        let total_time_h = (end_time_min - start_time_min) / 60; // --> 19.25

        // format
        if (String(total_time_h).includes(".")) {
            total_time_formatted = ((String(total_time_h)[2] == ".") ? 
                ` (${String(total_time_h).slice(0, 2)}h${Number(String(total_time_h).slice(2)) * 60})` :
                ` (${String(total_time_h).slice(0, 1)}h${Number(String(total_time_h).slice(1)) * 60})`);
        } else {
            total_time_formatted = ` (${String(total_time_h)}h)`;
        }
    } else { // Si déborde sur la ou les journées suivantes
        // A voir

    }

    return total_time_formatted;
}

console.log("(Extension) Connexion");

function showEventDuration() {
    for (let i of document.querySelectorAll(".gVNoLb")) {
        const new_task_time = calc_total_time(i.textContent);
        i.textContent = i.textContent + new_task_time;
    }
}

// Use MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    updateContent();
});

// Configure the observer to watch for changes in the entire document body
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Optional: run initially to handle the existing content
updateContent();


// window.onload = function() {
//     setTimeout(() => {
//         for (let i of document.querySelectorAll(".gVNoLb")) {
//             let new_task_time = calc_total_time(i.textContent);
//             i.textContent = i.textContent + new_task_time;
//         };
//     }, 500);
// }