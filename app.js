function speak(word){

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(word);

    speech.lang = "en-US";

    speech.rate = 0.85;

    speech.pitch = 1;

    speech.volume = 1;

    speechSynthesis.speak(speech);
}
