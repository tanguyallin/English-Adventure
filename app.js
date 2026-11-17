function speak(word){

   const speech = new SpeechSynthesisUtterance(word);

   speech.lang = "en-US";

   speech.rate = 0.9;

   speechSynthesis.speak(speech);
}
