const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then(response => response.json())
    .then(json => {
        displayLessons(json.data);
        // console.log(json);
    })
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active")
        displayLevelWord(data.data);

    })
}

// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }

const loadWordDetail = async (id) => {
    const url= `https://openapi.programming-hero.com/api/word/${id}`;
    const response = await fetch(url);
    const details = await response.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
                            <div class="bg-[#EDF7FF40] border-3 border-[#EDF7FF] p-6 rounded-3xl">
        <h2 class="text-4xl font-semibold mb-7">${word.word} (<i class="fa-solid fa-microphone-lines"></i>: <span class="font-bangla">${word.pronunciation}</span>)</h2>
        <p class="text-2xl font-semibold mb-2.5">Meaning</p>
        <p class="font-bangla text-2xl font-medium mb-8">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
        <h2 class="text-2xl font-semibold mb-2">Example</h2>
        <p class="text-2xl font-normal text-gray-800 mb-8">${word.sentence}</p>
        <p class="font-bangla text-2xl font-medium mb-2">সমার্থক শব্দ গুলো</p>
          <span class="btn bg-[#EDF7FF] text-xl font-normal mr-3 px-5 py-1.5 rounded-lg mb-5">${word.synonyms[0] ? word.synonyms[0] : "সমার্থক শব্দ পাওয়া যায়নি"}</span>
          <span class="btn bg-[#EDF7FF] text-xl font-normal mr-3 px-5 py-1.5 rounded-lg mb-5">${word.synonyms[1] ? word.synonyms[1] : "সমার্থক শব্দ পাওয়া যায়নি"}</span>
          <span class="btn bg-[#EDF7FF] text-xl font-normal px-5 py-1.5 rounded-lg mb-5">${word.synonyms[2] ? word.synonyms[2] : "সমার্থক শব্দ পাওয়া যায়নি"}</span>
      </div>
    
    `;
    document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    const levelMessage = document.getElementById("lesson-message");

    levelMessage.style.display = "none";
    wordContainer.classList.remove("hidden");
    wordContainer.style.display = "grid";
    wordContainer.innerHTML = "";

    if(words.length === 0) {
        wordContainer.innerHTML = `
                        <div class="col-span-full py-6 text-center">
                        <img class="mx-auto mb-3.5" src="./assets/alert-error.png" alt="alert">
                        <p class="font-bangla text-[14px] font-normal text-gray-500 mb-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                        <h4 class="font-bangla text-[34px] text-[#292524] font-semibold">নেক্সট Lesson এ যান</h4>
       </div>
        `;
        return;
    }

    words.forEach((word) => {
        // console.log(word);

        const card = document.createElement("div");
        card.innerHTML = `
                        <div class="bg-white text-center rounded-xl shadow-sm p-14">
            <h2 class="text-3xl font-bold mb-2">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="text-xl font-medium mb-4">Meaning / Pronunciation</p>
            <h2 class="font-bangla text-3xl font-semibold text-gray-600 mb-14">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</h2>
            <div class="flex justify-between items-center">
              <button  onclick="loadWordDetail(${word.id})" class="btn border-none bg-[#1A91FF1A] hover:bg-[#1A91FF59] rounded-sm"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn border-none bg-[#1A91FF19] hover:bg-[#1A91FF59]  rounded-sm"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
        `
        wordContainer.append(card);
    })
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    const levelMessage = document.getElementById("lesson-message");

    levelContainer.innerHTML = '';
    levelMessage.style.display = "block";

    for(let lesson of lessons) {
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                    <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary text-sm font-semibold lesson-btn">
                    <i class="fa-solid fa-book-open"></i>
                    Lesson-${lesson.level_no}</button>
        `

        levelContainer.append(btnDiv);
    }
}
loadLessons();