"use strict";
const Alexa = require("ask-sdk-core");

const lovefmDirective = {
	type: "AudioPlayer.Play",
	playBehavior: "REPLACE_ALL",
	audioItem: {
		stream: {
			url: "https://ice07.fluidstream.net/lovefm.mp3",
			token: "0",
			expectedPreviousToken: null,
			offsetInMilliseconds: 0,
		},
		metadata: {
			title: "Love FM Emit",
			subtitle: "LOVE FM: Ogni canzone, un'emozione",
			art: {
				sources: [
					{
						url: "https://www.lovefm.it/themes/default/assets/img_c/logo-love-new.png",
					},
				],
			},
			backgroundImage: {
				sources: [
					{
						url: "https://scontent.faep8-2.fna.fbcdn.net/v/t1.0-9/79020610_2509734679074070_4989850372647419904_n.jpg?_nc_cat=109&_nc_sid=dd9801&_nc_ohc=RZmrQCBg_BAAX9YJcWs&_nc_ht=scontent.faep8-2.fna&oh=42761bcafc8de1ed5e0f41a946a9bf72&oe=5F3E5133",
					},
				],
			},
		},
	},
};

// Play Love FM
const PlayIntentHandler = {
	canHandle(handlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === "IntentRequest" &&
			handlerInput.requestEnvelope.request.intent.name === "PlayIntent"
		);
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak('Playing Love FM')
			.addDirective(lovefmDirective).getResponse();
	},
};

// Stop Love FM
const CancelIntentHandler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest' && (request.intent.name === 'AMAZON.StopIntent' || request.intent.name === 'AMAZON.CancelIntent' || 'AMAZON.PauseIntent')
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
		.speak('Stopping Love FM')
		.addDirective({ type: "AudioPlayer.Stop" })
		.withShouldEndSession(true)
		.getResponse();
	}
};

exports.handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		PlayIntentHandler,
		CancelIntentHandler
	)
	.lambda();