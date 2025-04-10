const API_KEY = "AIzaSyBHQK6_BUnsVqPaH6YfRBRwAW5coDsJlKc"; // Replace with your Gemini API key

async function getResponse(news) {
  try {
    document.getElementById("loader").style.display = "block"; 
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${news} give only boolean value true or false` }] }],
      }),
    });

    const data = await response.json();
    console.log( data.candidates[0].content.parts[0].text);
    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("Error:", error);
  }finally{
    document.getElementById("loader").style.display = "none"; 
  }
}

const falsePrint = () => {
    console.log("Camed to false");
    
    document.getElementById("result").innerText = "🚨 Fake News Detected!";
    document.getElementById("result").style.color = "red";

}

const truePrint = () => {
    console.log("Camed to true");
    
    document.getElementById("result").innerText = "✅ This news appears to be real!";
        document.getElementById("result").style.color = "green";
}


document.getElementById("checkNews").addEventListener("click",function() {
    let newsText = document.getElementById("newsInput").value.trim();
    
    if (newsText === "") {
        document.getElementById("result").innerHTML = "Please enter some text!";
        document.getElementById("result").style.color = "yellow";
        return;
    }

    
    


    getResponse(newsText).then((res) => {

        let result = res.trim().toLowerCase();
        
        result === "false" ? falsePrint():truePrint() ;
        
    }).catch();
    
});
