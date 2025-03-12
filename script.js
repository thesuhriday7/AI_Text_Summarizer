const RAPIDAPI_KEY = "f32bcf4c1emsh27eccb20b47b83dp126be2jsnbca3603a49c1";
const RAPIDAPI_HOST = "article-extractor-and-summarizer.p.rapidapi.com";

async function summarizeText(event) {

    event.preventDefault(); // Prevent form submission

    const url = document.querySelector("[data-searchInput]").value; // Get the input value
    if (!url) {
        alert("Please enter a valid URL.");
        return;
    }
    document.getElementById("summary").innerHTML = "";
    const content1 = document.querySelector(".content1"); // Ensure content1 is selected
    content1.classList.add("active");

    try {
        const response = await fetch(
            `https://${RAPIDAPI_HOST}/summarize?url=${encodeURIComponent(url)}&lang=en&engine=2`,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": RAPIDAPI_KEY,
                    "X-RapidAPI-Host": RAPIDAPI_HOST
                }
            }
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (data.summary) {
            document.getElementById("summary").innerHTML = `<div class="here4"><div class="here2">Article Summary:</div> <br> <p class="here3">${data.summary}</p></div>`;
        } else {
            throw new Error("No summary available.");
        }
    } catch (error) {
        console.error("❌ Error:", error);
        document.getElementById("summary").innerHTML = "❌ Error fetching summary. Try again later.";
    } finally {
        content1.classList.remove("active"); // Ensures loading animation is removed even if an error occurs
    }
}

// Attach function to the form submission instead of button click
document.querySelector(".formContainer").addEventListener("submit", summarizeText);

