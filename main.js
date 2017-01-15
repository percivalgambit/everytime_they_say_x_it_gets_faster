if (typeof(String.prototype.trim) === "undefined") {
	String.prototype.trim = function() {
		return String(this).replace(/^\s+|\s+$/g, '');
	};
}

function readText() {
	let text = document.getElementById("input_area").value;

	let wordCounts = {};
	const words = text.split(/\b/).filter(function(word) {
		return !/^[^a-zA-Z]+$/.test(word);
	}).map(function(word) {
		return word.toLowerCase();
	});

	for (let i = 0; i < words.length; i++) {
		wordCounts["_" + words[i]] = (wordCounts["_" + words[i]] || 0) + 1;
	}
	console.log(wordCounts);
	const mostCommonWord = Object.keys(wordCounts).map(function(word) {
		return word.substring(1);
	}).filter(function(word) {
		const tooCommonWords = ["the", "be", "to", "of", "and", "a",
			"in", "that", "have", "i", "it", "for", "not", "on",
			"with", "as", "you", "do", "at", "but", "by", "this"
		];

		return !tooCommonWords.includes(word) && word.length > 3;
	}).reduce(function(a, b) {
		return wordCounts["_" + a] > wordCounts["_" + b] ? a : b;
	});
	console.log("mostCommonWord: " + mostCommonWord);
	responsiveVoice.speak("The most common word is " + mostCommonWord, "UK English Male");
	let rate = 1;
	const sentences = text.split(".").map(function(str) {
		return str.trim();
	});
	for (let i = 0; i < sentences.length; i++) {
		if (sentences[i]) {
			console.log(sentences[i]);
			console.log("rate: " + rate);
			responsiveVoice.speak(sentences[i], "UK English Male", {
				rate: rate
			});
			const occurences = (sentences[i].match(new RegExp(mostCommonWord, "g")) || []).length
			for (let i = 0; i < occurences; i++) {
				rate *= 1.05;
			}
		}
	}
}
